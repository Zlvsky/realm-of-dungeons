require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import { loginUser } from "./controllers/account/login";
import { createUser } from "./controllers/account/register";

const uri = process.env.MONGO_CONNECTION_URL;
if(!uri) throw new Error(".env file is not created")

mongoose.set("strictQuery", false);
mongoose.connect(uri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
mongoose.connection.on("connected", function () {
  console.log("connected to mongo");
});

const app = express();
app.use(express.json());


app.get("/", (req: any, res: any) => {
  res.send("Hello, world!");
});

app.post("/register", createUser);
app.post("/login", loginUser);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
