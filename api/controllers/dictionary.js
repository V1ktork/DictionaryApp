const mongoose = require('mongoose');
const Words = require('../models/dictionary');

exports.getAllWords = (req, res, next) => {
  const creator = req.userData.id;
  Words.find({ creator })
    .select('-__v')
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
          empty: true,
          message:
            'Ваш словарь пустует и скучает. Добавьте несколько слов для начала работы!'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err,
        message: err.message
      });
    });
};

exports.getPartOfSpeech = (req, res, next) => {
  const creator = req.userData.id;
  const partOfSpeech = req.params.partOfSpeech;

  Words.find({ creator, partOfSpeech })
    .select('-__v')
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
          message:
            'Часть речи указана неверно, либо не найдено соответствующих ей слов.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err,
        message: err.message
      });
    });
};

exports.getOneWord = (req, res, next) => {
  const creator = req.userData.id;
  const { partOfSpeech, name } = req.params;

  Words.findOne({ creator, partOfSpeech, name })
    .select('-__v')
    .exec()
    .then(data => {
      if (data) {
        res.status(200).json({
          data: [data]
        });
      } else {
        res.status(404).json({
          message: 'Запрашиваемое слово ещё не добавлено.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err,
        message: err.message
      });
    });
};

exports.postWord = (req, res, next) => {
  const creator = req.userData.id;
  const name = req.body.name;

  Words.findOne({ creator, name })
    .exec()
    .then(word => {
      if (word) {
        throw new Error(
          'Это слово уже добавлено. Вы можете обновить его перевод, если хотите.'
        );
      }

      const { name, translation, partOfSpeech } = req.body;

      if (!name || !translation || !partOfSpeech) {
        throw new Error('Для добавления слова необходимо заполнить все поля.');
      }

      const newWord = new Words({
        name,
        translation,
        partOfSpeech,
        creator: req.userData.id
      });

      return newWord.save();
    })
    .then(data => {
      res.status(201).json({
        success: true,
        data
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err,
        message: err.message
      });
    });
};

exports.updateWord = (req, res, next) => {
  const creator = req.userData.id;
  const name = req.params.name;
  const props = req.body;

  function isEmpty(obj) {
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) return false;
    }
    return true;
  }

  if (isEmpty(props)) {
    throw new Error('Заполните хотя бы одно поле для изменения слова.');
  }

  Words.updateOne({ creator, name }, { $set: props })
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        message: `Вы успешно изменили слово ${name}!`
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err,
        message: err.message
      });
    });
};

exports.deleteWord = (req, res, next) => {
  const creator = req.userData.id;
  const name = req.params.name;

  Words.deleteOne({ creator, name })
    .exec()
    .then(data => {
      res.status(200).json({
        success: true,
        message: `Слово ${name} успешно удалено!`
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err,
        message: err.message
      });
    });
};
