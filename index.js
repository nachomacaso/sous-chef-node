const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_RECIPES_QUERY = 'SELECT * FROM recipes';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sous-chef'
});

connection.connect(err => {
  if(err) {
    return err;
  }
});

console.log(connection);

app.use(cors());

app.get('/', (req, res) => {
  const html = `
    <div>
      <h1>Welcome to the Sous Chef Backend Server</h1>
      <h3>For recipes go to '/recipes'</h3>
    </div>
  `;
  res.send(html);
});

app.get('/recipes', (req, res) => {
  connection.query(SELECT_ALL_RECIPES_QUERY, (err, results) => {
    if(err){
      return res.send(err);
    }
    else {
      return res.json({
        data: results
      });
    }
  });
});

app.listen(4000, () => {
  console.log('Backend listening on port 4000')
});