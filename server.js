require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const movieRoutes = require('./routes/movies');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '32kb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/movies', movieRoutes);

app.get('/api/health', (req, res) => res.json({ status: mongoose.connection.readyState === 1 ? 'ok' : 'database disconnected' }));

app.use((error, req, res, next) => {
  console.error(error);
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: 'Something went wrong. Please try again.' });
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movieclub')
  .then(() => {
    console.log('Connected to MongoDB');
    startServer(Number(port));
  })
  .catch((error) => {
    console.error('Could not connect to MongoDB:', error.message);
    process.exit(1);
  });

function startServer(candidatePort) {
  const server = app.listen(candidatePort, () => {
    console.log(`Movie Club is running at http://localhost:${candidatePort}`);
  });
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE' && candidatePort < Number(port) + 20) {
      console.warn(`Port ${candidatePort} is busy; trying ${candidatePort + 1}...`);
      startServer(candidatePort + 1);
      return;
    }
    console.error(`Could not start the web server: ${error.message}`);
    process.exitCode = 1;
  });
}
