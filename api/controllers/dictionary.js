const mongoose = require("mongoose");
const Words = require("../models/dictionary");

exports.getAllWords = (req, res, next) => {
  Words.find()
    .select("-__v")
    .exec()
    .then(data => {
      const response = {
        count: data.length,
        data
      };

      if (response.count > 0) {
        res.status(200).json(response);
      } else {
        res.status(200).json({
          message:
            "Ваш словарь пустует и скучает. Добавьте несколько слов для начала работы!"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err
      });
    });
};

exports.getPartOfSpeech = (req, res, next) => {
  const partOfSpeech = req.params.partOfSpeech;

  Words.find({ partOfSpeech })
    .select("-__v")
    .exec()
    .then(data => {
      const response = {
        count: data.length,
        data
      };

      if (response.count > 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "Часть речи указана неверно, либо такой не существует."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err
      });
    });
};

exports.getOneWord = (req, res, next) => {
  const { partOfSpeech, name } = req.params;

  Words.findOne({ partOfSpeech, name })
    .select("-__v")
    .exec()
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "Запрашиваемое слово ещё не добавлено."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err
      });
    });
};

exports.postWord = (req, res, next) => {
  const word = new Words({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    translation: req.body.translation,
    partOfSpeech: req.body.partOfSpeech
  });

  word
    .save()
    .then(data => {
      res.status(201).json({
        success: true,
        data
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err
      });
    });
};

exports.updateWord = (req, res, next) => {
  const name = req.params.name;

  res.status(200).json({
    message: "It works!",
    partOfSpeech,
    name
  });
};

exports.deleteWord = (req, res, next) => {
  const name = req.params.name;

  Words.deleteOne({ name })
    .select("-__v")
    .exec()
    .then(data => {
      res.status(200).json({
        success: true,
        data
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err
      });
    });
};
