const express = require("express");
const { urlencoded } = require("express");

const UsersRouter = require("./Controllers/Users/users.route");
const { errorHandlerFilter } = require("./Core/Filters");

const app = express();
app.set('port', process.env.PORT || 3000);

//#region Middleware

app.use(express.json());
app.use(urlencoded({ extended: true }));

//#endregion

app.get('/', (req, res) => {
    res.send('Hola, Mundo! Esto es el Backend API');
});

app.use('/api/users', UsersRouter);

//#region middleware

app.use(errorHandlerFilter);

//#endregion

app.listen(app.get('port'), () => {
    console.log(`Server Started. Port: ${app.get('port')}`);
});