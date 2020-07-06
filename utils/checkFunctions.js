const checkPublicTransportation = (plate) => {
  return /(25|26)$/.test(plate);
};

const checkMilitaryLawEnforcement = (plate) => {
  return /[a-zA-Z]/.test(plate);
};

const checkSevenDigitsSpecificEnd = (plate) => {
  return /^\d{5}(85|86|87|88|89|00)$/.test(plate);
};

const checkGasVehicle = (plate) => {
  const sevenOrEightDigits = /^\d{7,8}$/;
  if (sevenOrEightDigits.test(plate)) {
    const sumOfDigits = plate
      .split("")
      .map(Number)
      .reduce((total, num) => total + num);
    return sumOfDigits % 7 === 0;
  }
  return false;
};

const checkType = (plate) => {
  if (checkPublicTransportation(plate)) {
    return "public transportation";
  } else if (checkMilitaryLawEnforcement(plate)) {
    return "military or law enforcement";
  } else if (checkSevenDigitsSpecificEnd(plate)) {
    return "7 digits that ends with 85|86|87|88|89|00";
  } else if (checkGasVehicle(plate)) {
    return "7 or 8 digits that their sum is divided by 7";
  }
  return "regular";
};

module.exports = checkType;
