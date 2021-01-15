const mongoose = require('mongoose');
const app = require('./app.js');

const config = require('config')
const PORT = config.get('port')
const MONGO = config.get('mongoUri')

mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', () => console.log('MongoDB connection error:')).once(
    'open',
    () => {
        console.log('Successfully connect to DB');
        app.listen(PORT, () =>
            console.log(`App is running on http://localhost:${PORT}`)
        );
    }
);
