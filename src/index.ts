import express from "express";
import { issuesRouter } from "./routes/issues";

const app = express();
const PORT = 3000;

 

app.use(express.json());
app.use("/issues",issuesRouter);

app.get("/health",
  (req,res) => {

  res.status(200);
  res.json( {status: "ok"});
});

app.listen(PORT, 
  () => 

    {
      console.log(`Messaged received on ${PORT}`);

    }
  )