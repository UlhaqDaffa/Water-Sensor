import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
