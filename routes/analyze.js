const Joi = require('joi');
const _ = require('lodash');
const express = require('express');
const validator = require('../middleware/validate');

const router = express.Router();

/**
 * Validate the request body
 * @param {Object} product
 */
function validatePayload(payload) {
  const schema = {
    text: Joi.string()
      .allow(null, '')
      .required(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Analyze occurances of each character
 * in a array of ordered string
 * @param {Array} string
 * @returns Array of object
 */
function analyzeString(string) {
  let result = [];
  if (string.length > 0) {
    const countCharObject = _.countBy(string);
    result = _.map(countCharObject, (value, index) => { // eslint-disable-line arrow-body-style
      return { [index]: value };
    });
  }
  return result;
}

router.post('/', [validator(validatePayload)], async (req, res) => {
  const textValue = req.body.text;
  const withSpaceLen = textValue.length;
  const textWithOutSpace = textValue.replace(/\s+/g, '');
  const onlyCharactersAndSorted = textValue.toLowerCase().replace(/[^a-z]+/g, "").split('').sort();

  const response = {
    textLength: {
      withSpaces: withSpaceLen,
      withoutSpaces: textWithOutSpace.length,
    },
    wordCount: (textWithOutSpace.length > 0) ? textValue.split(' ')
      .filter((n) => n !== '')
      .length : 0,
    characterCount: analyzeString(onlyCharactersAndSorted),
  };

  return res.status(200).send(response);
});

module.exports = router;
