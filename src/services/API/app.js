import express from 'express';
import bodyParser from 'body-parser';
const app = express();


app.use(bodyParser.json());

let sensorData = [];

app.post('/api/sensordata', (req, res) => {
    const { longitude, latitude, accelX, accelY, accelZ, phsensor, temperature, turbidity } = req.body;
    if (!longitude || !latitude || !accelX || !accelY || !accelZ || !phsensor || !temperature || !turbidity) {
        return res.status(400).json({ error: 'Incomplete data' });
    }
    const data = {
        longitude,
        latitude,
        accelX,
        accelY,
        accelZ,
        phsensor,
        temperature,
        turbidity,
        timestamp: new Date()
    };
    sensorData.push(data);


    res.json({ message: 'Data received and saved successfully' });
});


app.get('/api/sensordata', (req, res) => {
    res.json(sensorData);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
