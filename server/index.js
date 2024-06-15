import express from "express";

const app = express();

app.use(express.static('./public'))


app.listen(4000, () => {
    console.log("server started at port no : 4000");
    app.get("/", (req, res)=>{
        return  res.sendFile("./public/index.html");
    })
})