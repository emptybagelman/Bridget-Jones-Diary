const express = require("express");
const cors = require("cors");
const diaryRouter = require("./routers/diary");
const logger = require("morgan");

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.get("/",(req,res) => {
    res.json({
        name:"Bridget Jones Diary",
        description:"Time to Hackathon!"
    });
});

app.use("/entries",diaryRouter);

module.exports = app;