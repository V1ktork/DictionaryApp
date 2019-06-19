const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const DictionaryController = require("../controllers/dictionary");

router.get("/", checkAuth, DictionaryController.getAllWords);

router.post("/", DictionaryController.postWord);

router.get("/:partOfSpeech", DictionaryController.getPartOfSpeech);

router.get("/:partOfSpeech/:name", DictionaryController.getOneWord);

router.patch("/:partOfSpeech/:name", DictionaryController.updateWord);

router.delete("/:partOfSpeech/:name", DictionaryController.deleteWord);

module.exports = router;
