import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { getMailClient } from '../lib/email'
import { dayjs } from '../lib/dayjs'
import { ClientError } from '../errors/client-error'
import { env } from '../env'

export async function createTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/trips',
        {
            schema: {
                body: z.object({
                    destination: z.string().min(4),
                    starts_at: z.coerce.date(),
                    ends_at: z.coerce.date(),
                    owner_name: z.string(),
                    owner_email: z.string().email(),
                    emails_to_invite: z.array(z.string().email()),
                }),
            },
        },
        async (request) => {
            const {
                destination,
                starts_at,
                ends_at,
                owner_name,
                owner_email,
                emails_to_invite,
            } = request.body

            if (dayjs(starts_at).isBefore(new Date())) {
                throw new ClientError('The Trip must be in the Future.')
            }

            if (dayjs(ends_at).isBefore(starts_at)) {
                throw new ClientError('Invalid Trip End Date.')
            }

            const trip = await prisma.trip.create({
                data: {
                    destination,
                    starts_at,
                    ends_at,
                    participants: {
                        createMany: {
                            data: [
                                {
                                    name: owner_name,
                                    email: owner_email,
                                    owner: true,
                                    confirmed: true,
                                },
                                ...emails_to_invite.map((email) => {
                                    return { email }
                                }),
                            ],
                        },
                    },
                },
            })

            const formattedStartDate = dayjs(starts_at).format('LL')
            const formattedEndDate = dayjs(ends_at).format('LL')

            const confirmationLink = `${env.API_BASE_URL}/trips/${trip.id}/confirm`

            const mail = await getMailClient()

            const message = await mail.sendMail({
                from: {
                    name: 'Odyssea Tab',
                    address: 'go@odysseatab.com',
                },
                to: {
                    name: owner_name,
                    address: owner_email,
                },
                subject: 'Trip Created',
                html:
                    `<div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
                    <h1>Olá, ${owner_name}!</h1>
                    <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
                    <p></p>
                    <p>Para confirmar sua viagem, clique no link abaixo:</p>
                    <p></p>
                    <p>
                        <a href="${confirmationLink}">Confirmar Viagem</a>
                    </p>
                    <p></p>
                    <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
                    </div>
                `.trim(),
            })

            console.log(nodemailer.getTestMessageUrl(message))

            return { tripId: trip.id }
        },
    )
}