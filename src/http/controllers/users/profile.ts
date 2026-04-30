import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase();
  const { user, status, cache } = await getUserProfile.execute({
    userId: request.user.sub
  })

  return reply
    .header('x-cache', cache)
    .status(200)
    .send({
      status,
      user
    })
}
