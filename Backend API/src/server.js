const express = require("express");
const { urlencoded } = require("express");

const { adminRouter, usersRouter } = require("./Controllers");
const { globalErrorHandlingFilter } = require("./Core/Filters");

const app = express();
app.set('port', process.env.PORT || 3000);

//#region Middleware

app.use(express.json());
app.use(urlencoded({ extended: true }));

//#endregion

app.get('/', (req, res) => {
    res.send('Hola, Mundo! Esto es el Backend API');
});

app.use('/api/admin', adminRouter);
app.use('/api/users', usersRouter);

//#region middleware

app.use(globalErrorHandlingFilter);

//#endregion

app.listen(app.get('port'), () => {
    console.log(`Server Started. Port: ${app.get('port')}`);
});