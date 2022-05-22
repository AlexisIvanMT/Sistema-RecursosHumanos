//Dependencies
const morgan = require('morgan')
const express = require('express');
const app = express();
//Routers
const employee = require('./routes/employee');
const user = require('./routes/user');
//middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const welcom = require('./middleware/welcom');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", welcom);
app.use("/user", user);
app.use(auth);
//La peticiones se dirigen al archivo employee
app.use("/employee", employee);
app.use(notFound);


app.listen(process.env.PORT || 3000,() =>{
    console.log("Server is running...")
});