const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const searchRoutes = require('./routes/searchRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'db',
  user: 'agent',
  password: 'agentpass',
  database: 'Obelien AI'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

app.use('/api', searchRoutes);
app.use('/api', restaurantRoutes);
app.use('/api', reviewRoutes);
app.use('/api', bookmarkRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
