import { describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";


describe("Register User Case", () => {
    it("should be able to register", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

        const { user } = await registerUseCase.execute({
            name: "John Doe",
            email: "john.doe@example.com",
            password: "12345678",
        });

        expect(user.id).toEqual(expect.any(String));

    });


    it("should hash password upon registration", async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

        const { user } = await registerUseCase.execute({
            name: "John Doe",
            email: "john.doe@example.com",
            password: "12345678",
        });

        const isPasswordCorrectlyHashed = await compare(
            "12345678",
            user.password_hash
        );

        expect(isPasswordCorrectlyHashed).toBe(true);
    });


    it("should not be able to register with an existing email", async () => {

        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

        const email = "john.doe@example.com"

        await registerUseCase.execute({
            name: "John Doe",
            email,
            password: "12345678",
        });

        await expect(() =>
            registerUseCase.execute({
                name: "John Doe",
                email,
                password: "12345678",
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });


});