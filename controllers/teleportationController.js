// Validate that the input arrays are not empty and contain valid coordinates
function isValidInput(k, p, q) {
    if (!Array.isArray(p) || !Array.isArray(q) || typeof k !== "number") {
        return false;
    }
    for (const point of [...p, ...q]) {
        if (
            !Array.isArray(point) ||
            point.length !== 2 ||
            !point.every(Number.isFinite)
        ) {
            return false;
        }
    }
    return true;
}

function euclideanDistance([x1, y1], [x2, y2]) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function findMinimumDistance(k, p, q) {
    let totalDistance = 0;

    for (const deliveryPoint of q) {
        let minDistance = Infinity;

        for (const teleportPoint of p) {
            const distance = euclideanDistance(deliveryPoint, teleportPoint);
            minDistance = Math.min(minDistance, distance);
        }

        totalDistance += minDistance;
    }

    return totalDistance.toFixed(2);
}

exports.calculateTeleportation = (req, res) => {
    const { k, p, q } = req.body;

    if (!isValidInput(k, p, q)) {
        res.status(400).send("Invalid input");
        return;
    }

    const result = findMinimumDistance(k, p, q);
    res.set("Content-Type", "text/plain");
    res.send(result);
};
