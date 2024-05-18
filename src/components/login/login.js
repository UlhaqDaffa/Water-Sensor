import express from 'express';
import bodyParser from 'body-parser';
import fileURLToPath from 'path';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));

const users = [
  { id: 1, username: 'user1', password: 'password1', email: 'user1@example.com' },
  { id: 2, username: 'user2', password: 'password2', email: 'user2@example.com' }
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
      res.json({ message: 'Login successful', user });
  } else {
      res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (user) {
      res.json(user);
  } else {
      res.status(404).json({ error: 'User not found' });
  }
});

app.post('/api/user', (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
      return res.status(400).json({ error: 'Incomplete data' });
  }
  const newUser = { id: users.length + 1, username, password, email };
  users.push(newUser);

  res.status(201).json({ message: 'User created successfully', user: newUser });
});

app.listen(port, () => 
  console.log(`Server running on port ${port}`)
);
