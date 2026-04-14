import {app} from './app.js';

app.listen({
    host: '0.0.0.0',
    port: 3334 
}).then(() => {
    console.log('🚀Server is running on port 3334');
}).catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
});