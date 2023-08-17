const Diary = require("../models/Entry")

async function index(req,res) {
    try {
        const entries = await Diary.getAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
}

async function show (req, res) {
    try {
        const entry_id = parseInt(req.params.id);
        const entry = await Diary.getOneById(entry_id);
        res.status(200).json(entry);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

module.exports = { index, show };