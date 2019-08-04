const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const DictionaryController = require('../controllers/dictionary');

router.get('/', checkAuth, DictionaryController.getAllWords);

router.get('/:partOfSpeech', checkAuth, DictionaryController.getPartOfSpeech);

router.get('/:partOfSpeech/:name', checkAuth, DictionaryController.getOneWord);

router.post('/', checkAuth, DictionaryController.postWord);

router.patch(
  '/:partOfSpeech/:name',
  checkAuth,
  DictionaryController.updateWord
);

router.delete(
  '/:partOfSpeech/:name',
  checkAuth,
  DictionaryController.deleteWord
);

module.exports = router;
