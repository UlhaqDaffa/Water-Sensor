// import mysql from 'mysql2/promise';


// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT
// });

// export default pool;

// export const saveAccelerationData = async (data) => {
//   try {
//     const { timestamp, acceleration_x, acceleration_y, acceleration_z } = data;
//     await pool.query(
//       'INSERT INTO acceleration (timestamp, acceleration_x, acceleration_y, acceleration_z) VALUES (?, ?, ?, ?)',
//       [timestamp, acceleration_x, acceleration_y, acceleration_z]
//     );
//   } catch (error) {
//     console.error('Gagal menyimpan data acceleration:', error);
//     throw new Error('Gagal menyimpan data acceleration');
//   }
// };

// export const saveSensorPHData = async (data) => {
//   try {
//     const { timestamp, ph_value } = data;
//     await pool.query(
//       'INSERT INTO ph_sensor (timestamp, ph_value) VALUES (?, ?)',
//       [timestamp, ph_value]
//     );
//   } catch (error) {
//     console.error('Gagal menyimpan data sensor_PH:', error);
//     throw new Error('Gagal menyimpan data sensor_PH');
//   }
// };

// export const saveTurbidityData = async (data) => {
//   try {
//     const { timestamp, turbidity_value } = data;
//     await pool.query(
//       'INSERT INTO turbidity (timestamp, turbidity_value) VALUES (?, ?)',
//       [timestamp, turbidity_value]
//     );
//   } catch (error) {
//     console.error('Gagal menyimpan data turbidity:', error);
//     throw new Error('Gagal menyimpan data turbidity');
//   }
// };

// export const saveTemperatureData = async (data) => {
//   try {
//     const { timestamp, temperature_value } = data;
//     await pool.query(
//       'INSERT INTO temperature (timestamp, temperature_value) VALUES (?, ?)',
//       [timestamp, temperature_value]
//     );
//   } catch (error) {
//     console.error('Gagal menyimpan data temperature:', error);
//     throw new Error('Gagal menyimpan data temperature');
//   }
// };

// export const loginController = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const [rows] = await pool.query('SELECT * FROM login WHERE username = ?', [username]);
//     if (rows.length === 0) {
//       return res.status(401).json({ message: 'Username atau password salah' });
//     }
//     const hashedPassword = rows[0].password;
//     const match = await bcrypt.compare(password, hashedPassword);
//     if (!match) {
//       return res.status(401).json({ message: 'Username atau password salah' });
//     }
//     res.status(200).json({ message: 'Login Berhasil' });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
