import Redis from 'ioredis'

export const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
})


redis.on('connect', () => {
  console.error('🚀 Redis connected successfully.')
})


redis.on('error', (err) => {
  console.error('Redis error:', err)
})
