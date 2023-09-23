function euclideanDistance(point1, point2) {
    return Math.sqrt(
        Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2)
    );
}

function findMinimumDistance(input) {
    const { k, p, q } = input;
    let totalDistance = 0;
    let distances = [];

    for (const deliveryLocation of q) {
        let minDistance = Infinity;

        for (const hub of p) {
            const distance = euclideanDistance(deliveryLocation, hub);
            minDistance = Math.min(minDistance, distance);
        }

        distances.push(minDistance);
    }

    // Sort the distances to use teleportation orbs for the k largest delivery locations
    distances.sort((a, b) => b - a);

    for (let i = k; i < distances.length; i++) {
        totalDistance += distances[i];
    }

    return totalDistance.toFixed(2);
}

exports.calculateTeleportation = (req, res) => {
    const inputData = req.body;
    const outputData = findMinimumDistance(inputData);
    res.setHeader("Content-Type", "text/plain");
    res.send(outputData);
};
