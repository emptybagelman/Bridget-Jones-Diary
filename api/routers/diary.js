const { Router } = require("express");
const diaryController = require("../controllers/diary");

const diaryRouter = Router();

diaryRouter.get("/",diaryController.index);
diaryRouter.get("/:id", diaryController.show);


module.exports = diaryRouter;