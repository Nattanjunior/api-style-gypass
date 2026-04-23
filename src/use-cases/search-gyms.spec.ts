import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: 'TS GYM',
      description: null,
      phone: null,
      latitude: -9.9500000,
      longitude: -36.4000000
    })

    await gymsRepository.create({
      title: 'JAVA GYM',
      description: null,
      phone: null,
      latitude: -9.9500000,
      longitude: -36.4000000
    })

    const { gyms } = await sut.execute({
      query: 'TS',
      page: 1
    })

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'TS GYM' })]);
  });


  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JAVA GYM ${i}`,
        description: null,
        phone: null,
        latitude: -9.9500000,
        longitude: -36.4000000
      })
    }

    const { gyms } = await sut.execute({
      query: 'JAVA',
      page: 2
    })

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JAVA GYM 21' }),
      expect.objectContaining({ title: 'JAVA GYM 22' }),
    ]);
  });

})