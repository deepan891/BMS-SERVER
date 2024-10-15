import express from "express";
import cors from "cors";
import commonRouter from "./routes/common.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { actionContainer, activeCases, addResidents, contractors, dashboardCount, dynamicSearch, getReport, storePDF } from "./controller/commonController.js";
import { upload } from "./helper/multer.js";
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

app.use("/uploads", express.static("uploads"));

app.use("/dashboard", commonRouter);

app.get("/", (req, res) => {
  res.send("Working");
});
//  To get Count route
app.get("/count", dashboardCount);

app.post("/add", addResidents);

// Search Route
app.post("/search", dynamicSearch);

app.post("/contractors", contractors);

app.post("/activeCases", activeCases);

// Action Container
app.get("/action", actionContainer);

app.get("/documents", getReport);

// To upload pdf
app.post("/upload", upload.single("pdf"), storePDF);

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