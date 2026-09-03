import express from "express";

const app = express();
const PORT = 3000;

app.get("/health",(req,res) => {

  res.status(200).res.json("ok");
});

app.listen(PORT, () => 
{
  console.log(`Messaged received on port 3k`);
})