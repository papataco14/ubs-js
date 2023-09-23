function maxFruitValue(w, v, fruits) {
    const dp = Array.from({ length: w + 1 }, () => Array(v + 1).fill(0));

    for (let i = 1; i <= fruits.length; i++) {
        const [fruitWeight, fruitVolume, fruitValue] = fruits[i - 1];
        for (let weight = w; weight >= fruitWeight; weight--) {
            for (let volume = v; volume >= fruitVolume; volume--) {
                dp[weight][volume] = Math.max(
                    dp[weight][volume],
                    dp[weight - fruitWeight][volume - fruitVolume] + fruitValue
                );
            }
        }
    }

    return dp[w][v];
}

exports.calculateGreedyMonkey = (req, res) => {
    try {
        const jsonData = req.body;
        const { w, v, f } = jsonData;

        if (w === undefined || v === undefined || f === undefined) {
            return res
                .status(400)
                .set("Content-Type", "text/plain")
                .send("Missing parameters");
        }

        const result = maxFruitValue(w, v, f);
        res.status(200)
            .set("Content-Type", "text/plain")
            .send(result.toString());
    } catch (e) {
        console.log(e);
        return res
            .status(400)
            .set("Content-Type", "text/plain")
            .send("Invalid JSON");
    }
};
