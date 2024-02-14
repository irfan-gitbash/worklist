const express = require("express") 
const cors = require("cors")
const port = 4000
const db = require("./database")
const app = express()
app.use(cors())
app.use(express.urlencoded())

app.get("/work", (_, res) => {
    db.query("SELECT * FROM `worklist`ORDER BY created_at DESC", (_, r) =>{
        let html = ""
        r.map(data =>
            html += `<li>${data.title}</li>`
            )
            res.send(html)
    })
})

app.post("/work", (req,res) => {
    const title = req.body.title
    db.query(`INSERT INTO worklist (title) values('${title}')`, (err, _) => {
        if(err) return res.send("gagal menambahkan worklist ")
        res.send("worklist berhasil ditambahkan")
    })
})

app.listen(port, () => {
    console.log("server running" + port)
})