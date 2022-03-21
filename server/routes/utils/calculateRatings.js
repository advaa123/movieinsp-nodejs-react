const calculateRatings = (rateObj) => {
  let total = 0;
  let sum = 0;
  for (const [key, value] of Object.entries(rateObj)) {
    total += value;
    sum += value * parseInt(key);
  }

  return total === 0 ? 0 : (sum / total).toFixed(2);
};

module.exports = calculateRatings;