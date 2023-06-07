const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 8000;

// Konfigurasi koneksi MySQL
const connection = mysql.createConnection({
  host: 'endpoint',
  user: 'admin',
  password: 'adminadmin',
  database: 'user-demo'
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Menghubungkan ke MySQL
connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});


app.get('/', (req, res) => {
  const query = 'SELECT * FROM user';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error saat mengambil data: ', err);
      res.status(500).send('Terjadi kesalahan');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});