const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const passport = require('./config/passport');

const app = express();

app.use(bodyParser.json()); // Using body-parser middleware
app.use(passport.initialize()); // Initializing Passport middleware

mongoose.connect('mongodb+srv://georgianCollege:fc7IRCbSFcNrpr1W@favouritebookscluster.dnhbwiy.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Book routes
app.use('/api/books', bookRoutes);

// Auth routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
