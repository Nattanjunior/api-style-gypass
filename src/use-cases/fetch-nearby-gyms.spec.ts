import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { FeatchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository
let sut: FeatchNearbyGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FeatchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: 'NEARBY GYM',
      description: null,
      phone: null,
      latitude: -9.9109418,
      longitude: -36.3555163
    })

    await gymsRepository.create({
      title: 'FAR GYM',
      description: null,
      phone: null,
      latitude: -9.8878531,
      longitude: -36.3678169

    })

    const { gyms } = await sut.execute({
      userLatitude: -9.9109418,
      userLongitude: -36.3555163,
    })

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'NEARBY GYM' })]);
  });
})