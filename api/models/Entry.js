const db = require("../db/connect")

class Entry {
    constructor(data){
        this.entry_id = data.entry_id
        this.date = data.date
        this.time = data.time
        this.content = data.content
    }

    static async getAll(){
        const response = await db.query("SELECT * FROM diary;");
        if(response.rows.length === 0){
            throw new Error("No entries available");
        }
        return response.rows.map(e => new Entry(e));
    }
}

module.exports = Entry;