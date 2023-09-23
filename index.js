const express = require("express");
const morganBody = require("morgan-body");
const routes = require("./routes");
const fs = require("fs");

const PORT = process.env.PORT || 5000;

// Clear the log file when the application starts
fs.writeFileSync("request-response-log.txt", "");

const app = express().use(express.json());

// Middleware to log request body and corresponding response
app.use((req, res, next) => {
    let oldWrite = res.write,
        oldEnd = res.end;

    let chunks = [];

    res.write = function (chunk) {
        chunks.push(chunk);
        oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
        if (chunk) chunks.push(chunk);
        let body = Buffer.concat(chunks).toString("utf8");

        // Log request and response
        fs.appendFileSync(
            "request-response-log.txt",
            `Request Body:\n${JSON.stringify(
                req.body
            )}\nResponse Body:\n${body}\n---\n`
        );

        oldEnd.apply(res, arguments);
    };

    next(); // Proceed to the next middleware
});

// Use routes
app.use("/", routes);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
