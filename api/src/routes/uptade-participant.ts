import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/client-error'

export async function updateParticipant(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put(
        '/participants/:participantId',
        {
            schema: {
                params: z.object({
                    participantId: z.string().uuid(),
                }),
                body: z.object({
                    name: z.string().min(3),
                    email: z.string().email(),
                    confirmed: z.coerce.boolean(),
                }),
            },
        },
        async (request, reply) => {
            const { participantId } = request.params
            const { name, email, confirmed } = request.body

            const participant = await prisma.participant.findUnique({
                where: { id: participantId }
            })

            if (!participant) {
                throw new ClientError('Participant not found')
            }

            await prisma.participant.update({
                where: { id: participantId },
                data: {
                    name,
                    email,
                    confirmed,
                },
            })

            return { id: participantId }
        },
    )
}
