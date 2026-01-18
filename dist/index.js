import express from "express";
const app = express(); // This creates our Express application
const PORT = 3000; // This is the port our server will listen on
// This defines a GET route for the root URL ('/')
app.get("/", (req, res) => {
    // req (the request) contains information about the incoming request (URL, query params, etc.)
    // res (the response) is used to send data back to the client
    res.json({ message: "Hello world!" }); // This sends a JSON response to the client
});
// This starts the server and listens for incoming requests
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map