const db = require("../db/connect")

class Entry {
    constructor(data){
        this.entry_id = data.entry_id
        this.date = data.date
        this.time = data.time
        this.content = data.content
    }

    static async getAll(){
        const response = await db.query("SELECT * FROM diary ORDER BY entry_id ASC;");
        if(response.rows.length === 0){
            throw new Error("No entries available");
        }
        return response.rows.map(e => new Entry(e));
    }

    static async getOneById(entry_id) {
    const response = await db.query("SELECT * FROM diary WHERE entry_id = $1;", [entry_id]);
    console.log('getOneById response:', response.rows[0]);
    
    if (response.rows.length != 1) {
        return new Entry({entry_id:999,date:'',time:'',content:''})
        }
        return new Entry(response.rows[0]);
    }

    static async create(data) {
        const { date, time, content } = data
        const response = await db.query(`INSERT INTO diary(date, time, content) VALUES ($1, $2, $3) RETURNING *`,[date, time, content])
        return new Entry(response.rows[0])
    }

    async update(data) {
        const response = await db.query("UPDATE diary SET content = $1 WHERE entry_id = $2 RETURNING *", 
        [data.content, this.entry_id])

        if (response.rows.length != 1) {
            throw new Error('Unable to update entry content')
        }
        return new Entry(response.rows[0])
    }

    async destroy() {
        const response = await db.query('DELETE FROM diary WHERE entry_id = $1 RETURNING *;', [this.entry_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete entry.")
        }
        return new Entry(response.rows[0]);
    }

    static async searchByYear(keyword) {
        const response = await db.query("SELECT * FROM diary WHERE SUBSTRING(date, 7, 2) LIKE $1;", [`%${keyword}%`]);
    
        if (response.rows.length === 0) {
            throw new Error("No entries found for that year.")
        }
    
        const entries = response.rows.map(row => new Entry(row));
        return entries;
    }
    
    static async searchByMonth(keyword) {
        const response = await db.query("SELECT * FROM diary WHERE SUBSTRING(date, 4, 2) LIKE $1;", [`%${keyword}%`]);
    
        if (response.rows.length === 0) {
            throw new Error("No entries found for that month.")
        }
    
        const entries = response.rows.map(row => new Entry(row));
        return entries;
    }
    
    static async searchByDay(keyword) {
        const response = await db.query("SELECT * FROM diary WHERE SUBSTRING(date, 1, 2) LIKE $1;", [`%${keyword}%`]);
    
        if (response.rows.length === 0) {
            throw new Error("No entries found for that day.")
        }
    
        const entries = response.rows.map(row => new Entry(row));
        return entries;
    }

    static async searchByContent(keyword) {
        const response = await db.query("SELECT * FROM diary WHERE content LIKE $1;", [`%${keyword}%`]);
    
        if (response.rows.length === 0) {
            throw new Error("No entries found with that content")
        }
    
        const entries = response.rows.map(row => new Entry(row));
        return entries;
    }
}

module.exports = Entry;
