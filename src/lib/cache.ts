import { redis } from './redis'

type CacheOptions = {
  ttl?: number
}

export async function getOrSetCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options?: CacheOptions
): Promise<{ data: T; cache: 'HIT' | 'MISS' }> {

  const cached = await redis.get(key)

  if (cached) {
    return {
      data: JSON.parse(cached),
      cache: 'HIT'
    }
  }

  const data = await fetchFn()

  if (!data) {
    throw new Error('Invalid data - not caching')
  }

  await redis.set(key, JSON.stringify(data), "EX", options?.ttl ?? 60 * 5);

  return {
    data,
    cache: 'MISS'
  }
}