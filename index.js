const express = require("express");
const morganBody = require("morgan-body");
const routes = require("./routes");
const PORT = process.env.PORT || 5000;

const app = express().use(express.json({ limit: "5mb" }));
morganBody(app, { noColors: process.env.NODE_ENV === "production" });

// Use routes
app.use("/", routes);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
