const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./routers/userRouter');
const locationRouter = require('./routers/locationRouter');
const packageRouter = require('./routers/packageRouter');
const utilRouter = require('./routers/util');
const cors = require('cors');
const { PORT } = require('./config');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);
app.use(express.json());
// app.use(express.urlencoded({extended : true}));
app.use('/user', userRouter);
app.use('/location', locationRouter);
app.use('/package', packageRouter);
app.use('/util', utilRouter);

app.get('/', (req, res) => {
  console.log('Request at index');
  res.status(299).send('Working Perfectly!!');
});

app.listen(PORT, () => console.log(`Express server has started at ${PORT}`));
