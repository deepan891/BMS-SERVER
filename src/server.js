import express from "express";
import cors from "cors";
import commonRouter from "./routes/common.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    // methods: "
  })
);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename).split("src");

app.use(`/uploads`, express.static("uploads"));

app.use("/dashboard", commonRouter);

app.get("/download/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname[0], "uploads", filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error("Error during download:", err);
      res.status(404).send("File not found.");
    }
  });
});

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
