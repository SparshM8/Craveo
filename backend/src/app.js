// create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const catalogRoutes = require('./routes/catalog.routes');
const cors = require('cors');

const app = express();
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({
    origin: clientOrigin,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        name: 'Craveo API',
        status: 'ok',
        message: 'Discover your next favorite bite.'
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);
app.use('/api/catalog', catalogRoutes);

module.exports = app;