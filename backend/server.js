const express = require('express');
const colorts = require('colors');
const dotenv = require('dotenv').config;
const port = process.env.PORT || 8080;
const {errorHandler} = require('./middleware/errorMiddleware');
const {connectDB} = require('./config/db');
const cors = require("cors")





connectDB(); 
const app = express();

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/api/surveys', require('./routes/surveyRoutes'));
app.use('/api/surveys/two', require('./routes/surveyRoutes'));
app.use('/api/surveys/three', require('./routes/surveyRoutes'));
app.use('/api/surveys/four', require('./routes/surveyRoutes'));
app.use('/api/surveys/getall', require('./routes/surveyRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler); 



app.listen(port, ()=> console.log(`server started on port ${port}`));