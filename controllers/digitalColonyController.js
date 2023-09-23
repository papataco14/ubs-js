function calculateWeight(colony, generations) {
  for (let i = 0; i < generations; i++) {
    let newColony = [];
    let weight = Array.from(colony).reduce((acc, digit) => acc + parseInt(digit), 0);

    for (let j = 0; j < colony.length - 1; j++) {
      let firstDigit = parseInt(colony[j]);
      let secondDigit = parseInt(colony[j + 1]);
      let signature = firstDigit >= secondDigit ? firstDigit - secondDigit : 10 - (secondDigit - firstDigit);
      let newDigit = (weight + signature) % 10;
      newColony.push(firstDigit, newDigit);
    }

    newColony.push(parseInt(colony[colony.length - 1]));
    colony = newColony.join('');
  }

  return Array.from(colony).reduce((acc, digit) => acc + parseInt(digit), 0).toString();
}

exports.calculateDigitalColony = (req, res) => {
  const inputData = req.body;
  const outputData = inputData.map(({ generations, colony }) => calculateWeight(colony, generations));
  res.json(outputData);
};
