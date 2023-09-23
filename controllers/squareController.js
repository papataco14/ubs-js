exports.calculateSquare = (req, res) => {
    const input = parseInt(req.body.input);
    if (isNaN(input)) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    const output = input ** 2;
    res.json({ output });
  };
  