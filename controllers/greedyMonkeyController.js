function maxFruitValue(w, v, fruits) {
    const dp = Array.from({ length: w + 1 }, () => Array(v + 1).fill(0));

    for (let i = 1; i <= fruits.length; i++) {
        const newDp = JSON.parse(JSON.stringify(dp));
        for (let weight = 0; weight <= w; weight++) {
            for (let volume = 0; volume <= v; volume++) {
                newDp[weight][volume] = dp[weight][volume];
                const [fruitWeight, fruitVolume, fruitValue] = fruits[i - 1];
                if (fruitWeight <= weight && fruitVolume <= volume) {
                    newDp[weight][volume] = Math.max(
                        newDp[weight][volume],
                        dp[weight - fruitWeight][volume - fruitVolume] +
                            fruitValue
                    );
                }
            }
        }
        for (let weight = 0; weight <= w; weight++) {
            for (let volume = 0; volume <= v; volume++) {
                dp[weight][volume] = newDp[weight][volume];
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
