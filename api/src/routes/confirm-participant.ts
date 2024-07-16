import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/client-error'
import { env } from '../env'

export async function confirmParticipants(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/participants/:participantId/confirm',
        {
            schema: {
                params: z.object({
                    participantId: z.string().uuid(),
                }),
            },
        },
        async (request, reply) => {
            const { participantId } = request.params

            const participant = await prisma.participant.findUnique({
                where: {
                    id: participantId,
                }
            })

            if (!participant) {
                throw new ClientError('Participant not found.')
            }

            if (participant.confirmed) {
                return reply.redirect(`${env.WEB_BASE_URL}/trips/${participant.tripId}`)
            }

            await prisma.participant.update({
                where: { id: participantId },
                data: { confirmed: true }
            })

            return reply.redirect(`${env.WEB_BASE_URL}/trips/${participant.tripId}`)
        },
    )
}