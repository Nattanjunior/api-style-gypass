import { beforeEach, describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let UsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase;

describe("Register User Case", () => {
    beforeEach(() => {
        UsersRepository = new InMemoryUsersRepository();
        sut = new RegisterUseCase(UsersRepository);
    })


    it("should be able to register", async () => {
        const { user } = await sut.execute({
            name: "John Doe",
            email: "john.doe@example.com",
            password: "12345678",
        });

        expect(user.id).toEqual(expect.any(String));

    });


    it("should hash password upon registration", async () => {
        const { user } = await sut.execute({
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
        const email = "john.doe@example.com"

        await sut.execute({
            name: "John Doe",
            email,
            password: "12345678",
        });

        await expect(() =>
            sut.execute({
                name: "John Doe",
                email,
                password: "12345678",
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });


});