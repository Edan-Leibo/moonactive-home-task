const ocrSpaceApi = require("ocr-space-api-alt2");
const logger = require("../utils/logger");

const options = {
  apikey: "8fea0d483688957",
  filetype: "jpg",
  OCREngine: 2,
  scale: true,
};

// Makes a request to the OCR API 
// to process the image and fetch the text inside 
const getText = async (imagePath) => {
  try {
    const val = await ocrSpaceApi(imagePath, options);
    logger(`Text read before cleanup: ${val}`);
    const beginsWithNumAlphanumeric = (c, index) => {
      //First char is not digit
      if (index === 0 && !/^\d$/.test(c)) {
        return false;
      }

      //check if char is alphanumeric
      return /^[a-z0-9]$/i.test(c);
    };

    //Predicate to check if val contains a digit
    const hasDigit = (val) => /\d/.test(val);

    const editedVal = val
      .split("\n")
      .filter(hasDigit)[0]
      .split("")
      .filter(beginsWithNumAlphanumeric)
      .join("");
    return editedVal;
  } catch (error) {
    logger("Invalid plate", "error");
    return null;
  }
};

module.exports = getText;
