const express = require("express");
const mongoose = require("mongoose");
const { UserRouter } = require("./Routes/user.routes");
const cors = require('cors');
const { auth } = require("./Middleware/Auth.middleware");
require("dotenv").config

const app = express();

app.use(express.json()); 
app.use(cors())

app.use(auth)
app.use("/user", UserRouter);


mongoose.connect(process.env.MONGO_URL1)
.then(() => console.log(`Db is connect`))
.catch((err) => console.log(err))

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "I am in home route" });
  } catch (error) {
    res.status(500).json({ msg: "Error in home route" });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Backend is running on port`)
});
