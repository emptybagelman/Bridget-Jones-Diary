const { Router } = require("express");
const diaryController = require("../controllers/diary");

const diaryRouter = Router();

// Basic routes
diaryRouter.get("/",diaryController.index);
diaryRouter.get("/:id", diaryController.show);
diaryRouter.post("/", diaryController.create);
diaryRouter.patch("/:id", diaryController.update);
diaryRouter.delete("/:id", diaryController.destroy);

// Search routes
diaryRouter.get("/search/year/:keyword",diaryController.searchDate);
diaryRouter.get("/search/month/:keyword",diaryController.searchDate);
diaryRouter.get("/search/day/:keyword",diaryController.searchDate);
diaryRouter.get("/search/content/:keyword",diaryController.searchContent);


module.exports = diaryRouter;