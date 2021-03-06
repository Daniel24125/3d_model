const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 9000;

app.use(express.static(path.join(__dirname, "build")));


app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, "build/index.html"))     
  });

 app.listen(port, () => {
    console.log("App is listenning o port " + port);
});