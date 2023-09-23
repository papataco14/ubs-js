// controllers/teleportationController.js

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
    const result = findMinimumDistance(k, p, q);
    res.set("Content-Type", "text/plain");
    res.send(result);
};
