const express = require("express");
const app = express();

app.get('/', (req, res) => {

    res.send('Hola, Mundo! Esto es el Backend API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Started. Port: ${PORT}`);
});