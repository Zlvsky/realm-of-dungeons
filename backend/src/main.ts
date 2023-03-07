import express from "express";

const app = express();

app.get("/", (req: any, res: any) => {
  res.send("Hello, world!");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
