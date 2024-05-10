const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const database = require('./database');
const bcrypt = require('bcrypt');
const { Client } = require('pg');
const notifier = require('node-notifier');

const app = express();

app.use(bodyParser.json());

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mydatabase',
  password: 'password',
  port: 3000
});

client.connect();

async function loginUser(username, password) {
  try {
    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username]
    };

    const result = await client.query(query);
    if (result.rows.length === 0) {
      notifier.notify({
        title: 'Login Failed',
        message: 'Username atau Password yang anda masukkan salah',
        sound: true,
        wait: true
      });
      return { success: false, message: 'Username atau Password yang anda masukkan salah' };
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      notifier.notify({
        title: 'Login Failed',
        message: 'Username atau Password yang anda masukkan salah',
        sound: true,
        wait: true
      });
      return { success: false, message: 'Username atau Password yang anda masukkan salah' };
    }

    notifier.notify({
      title: 'Login Successful',
      message: 'Selamat Datang ' + username,
      sound: true,
      wait: true
    });

    return { success: true, message: 'Login successful!' };
  } catch (error) {
    console.error('Terjadi Error:', error);
    notifier.notify({
      title: 'Login Error',
      message: 'Error dalam login',
      sound: true,
      wait: true
    });
    return { success: false, message: 'Error dalam login' };
  }
}

//contoh user untuk async promise 
(async () => {
  const loginResult = await loginUser('admin', 'password123');
  console.log(loginResult);
})();

