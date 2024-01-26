// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Set port
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');

// Set static files
app.use(express.static('public'));

// Set body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set database
const comments = JSON.parse(fs.readFileSync('./data/comments.json', 'utf8'));

// Set routes
app.get('/', (req, res) => {
  res.render('index', { comments });
});

app.get('/comments', (req, res) => {
  res.render('comments', { comments });
});

app.post('/comments', (req, res) => {
  const { name, comment } = req.body;
  comments.push({ name, comment });
  fs.writeFileSync('./data/comments.json', JSON.stringify(comments));
  res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments.splice(id, 1);
  fs.writeFileSync('./data/comments.json', JSON.stringify(comments));
  res.redirect('/comments');
});

// Start web server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});