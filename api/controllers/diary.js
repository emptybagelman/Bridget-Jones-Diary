const Diary = require("../models/Entry")

async function index(req,res) {
    try {
        const entries = await Diary.getAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
}

module.exports = { index };