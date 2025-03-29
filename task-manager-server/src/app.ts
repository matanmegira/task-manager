import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import routes from './routes';
import { config } from './config/config';


const app = express();
const PORT = config.port;

app.use(cors({
  origin: 'https://localhost:4200',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/', routes);

const sslOptions = {
  key: fs.readFileSync('ssl.key'),
  cert: fs.readFileSync('ssl.cert')
};

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`HTTPS server running at https://localhost:${PORT}`);
});