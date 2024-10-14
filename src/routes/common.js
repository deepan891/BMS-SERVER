import express from "express";
import {
  actionContainer,
  dashboardCount,
  dynamicSearch,
  getReport,
  storePDF,
  addResidents,
  contractors,
  activeCases
} from "../controller/commonController.js";
import { upload } from "../helper/multer.js";
import path from "path";

const commonRouter = express.Router();

//  To get Count route
commonRouter.get("/", dashboardCount);

commonRouter.post("/add", addResidents);

// Search Route
commonRouter.post("/", dynamicSearch);

commonRouter.post("/contractors",contractors);

commonRouter.post("/activeCases",activeCases);

// Action Container
commonRouter.get("/action", actionContainer);

commonRouter.get("/documents", getReport);

// To upload pdf
commonRouter.post("/upload", upload.single("pdf"), storePDF);

export default commonRouter;
