import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { RegisterUseCase } from "../../use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export async function register(request: FastifyRequest, reply: FastifyReply) {

    const validationUser = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = validationUser.parse(request.body);

    try {
        // Dependency Injection principle
        const usersRepository = new PrismaUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);
        await registerUseCase.execute({
            name,
            email,
            password
        });
    } catch (error) {
        return reply.status(409).send({ error: (error as Error).message });
    }

    return reply.status(201).send();
}
