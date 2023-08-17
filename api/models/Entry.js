const db = require("../db/connect")

class Entry {
    constructor(data){
        this.entry_id = data.entry_id
        this.date = data.date
        this.time = data.time
        this.content = data.content
    }

    static async getAll(){
        const response = await db.query("SELECT * FROM diary ORDER BY date DESC;");
        if(response.rows.length === 0){
            throw new Error("No entries available");
        }
        return response.rows.map(e => new Entry(e));
    }

    static async getOneById(entry_id) {
    const response = await db.query("SELECT * FROM diary WHERE entry_id = $1;", [entry_id]);
    console.log('getOneById response:', response.rows[0]);
    
    if (response.rows.length != 1) {
        throw new Error("Unable to locate entry.")
        }
        return new Entry(response.rows[0]);
    }

    static async create(data) {
        const { date, time, content } = data
        const response = await db.query(`
          INSERT INTO diary(date, time, content)
          VALUES ($1, $2, $3) RETURNING *`,
          [date, time, content]
        )
        return new Entry(response.rows[0])
    }
}

module.exports = Entry;