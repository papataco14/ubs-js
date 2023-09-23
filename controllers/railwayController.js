function countCombinations(input) {
    const [m, n, ...trackPieces] = input.split(", ").map(Number);
    const dp = Array(m + 1).fill(0);
    dp[0] = 1;

    for (const piece of trackPieces) {
        for (let i = piece; i <= m; i++) {
            dp[i] += dp[i - piece];
        }
    }

    return dp[m];
}

exports.calculateRailwayCombinations = (req, res) => {
    const inputData = req.body;
    const outputData = inputData.map(countCombinations);
    res.json(outputData);
};
