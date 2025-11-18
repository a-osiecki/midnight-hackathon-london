import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth";
import stravaRoutes from "./routes/strava";

const app = express();
app.use(express.json());
app.use(cors())

app.use("/", authRoutes);
app.use("/", stravaRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(8080, () => {
  console.log('Backend listening on http://localhost:8080');
});
