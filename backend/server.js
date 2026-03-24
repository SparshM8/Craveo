require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

const port = Number(process.env.PORT) || 3000;

async function startServer() {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Craveo API is running on port ${port}`);
        });
    } catch (error) {
        console.error('Craveo API could not start:', error.message);
        process.exitCode = 1;
    }
}

startServer();
