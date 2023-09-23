class Passenger {
    constructor(departureTime) {
        this.departureTime = departureTime;
        this.numberOfRequests = 0;
    }

    askTimeToDeparture() {
        this.numberOfRequests++;
        return this.departureTime;
    }
}

exports.prioritizeAndFilterPassengers = (req, res) => {
    const testData = req.body;
    const results = [];

    testData.forEach((data) => {
        const { id, departureTimes, cutOffTime } = data;

        let totalNumberOfRequests = 0;
        const passengers = departureTimes.map((time) => new Passenger(time));

        // Sorting the passengers by departure time
        passengers.sort((a, b) => {
            return a.askTimeToDeparture() - b.askTimeToDeparture();
        });

        // Removing passengers who are too late
        const filteredPassengers = passengers.filter((p) => {
            const time = p.askTimeToDeparture();
            return time >= cutOffTime;
        });

        // Summing up the total number of requests
        totalNumberOfRequests = passengers.reduce(
            (acc, p) => acc + p.numberOfRequests,
            0
        );

        results.push({
            id,
            sortedDepartureTimes: filteredPassengers.map(
                (p) => p.departureTime
            ),
            numberOfRequests: totalNumberOfRequests,
        });
    });

    res.json(results);
};
