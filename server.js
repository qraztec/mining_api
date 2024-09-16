const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const operationRoutes = require('./routes/operationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cors = require('cors')


const app = express();
app.use(cors())
// Middleware
app.use(bodyParser.json());

// MongoDB connection (replace with your MongoDB Atlas connection string)
mongoose.connect('mongodb+srv://gerumghl:s61g9OrTZAMn2g6R@miningcluster.kwv3a.mongodb.net/?retryWrites=true&w=majority&appName=MiningCluster')
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});

// Use Routes
app.use(operationRoutes);
app.use(feedbackRoutes);
app.use(profileRoutes);

const PORT = 6565;

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
