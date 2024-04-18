import express from "express"
import mysql from "mysql"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"admin",
    password:"password",
    database:"test"
})

app.use(express.json())

app.get("/",(req,res)=>{
    res.json("hello from the backend")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });


  app.post("/books", (req,res)=>{
    const q = "INSERT INTO books(`title`, `description`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.description
    ]

        db.query(q,[values], (err,data)=>{
            if(err) return res.json(err)
            return res.json("Book has been created successfully")
        })
  })


app.listen(8800, () =>{
    console.log("connected to backend")

})