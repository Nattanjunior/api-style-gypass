import { ZodError } from 'zod';
import { AppRoutes } from './http/routes';
import fastify from 'fastify'
import { env } from './env';
import fastifyJwt from '@fastify/jwt';

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(AppRoutes);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error.',
            issues: error.format()
        });
    }

    if (env.NODE_ENV !== 'prod') {
        console.error(error);
    } else {
        // TODO: Log the error to an external service like Sentry/ Datadog/ LogRocket/ etc.
    }

    return reply.status(500).send({
        message: 'Internal server error.'
    });
});