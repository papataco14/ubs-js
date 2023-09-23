// Helper function to choose the best parking alternative for a bus slot
function bestAlternativeForBusSlot(parkingCharges, buses, cars, bikes) {
    const alternatives = [
        { value: parkingCharges.Bus, require: { buses: 1, cars: 0, bikes: 0 } },
        {
            value: 2 * parkingCharges.Car + 2 * parkingCharges.Bike,
            require: { buses: 0, cars: 2, bikes: 2 },
        },
        {
            value: 2 * parkingCharges.Car,
            require: { buses: 0, cars: 2, bikes: 0 },
        },
        {
            value: parkingCharges.Car + 7 * parkingCharges.Bike,
            require: { buses: 0, cars: 1, bikes: 7 },
        },
        {
            value: 12 * parkingCharges.Bike,
            require: { buses: 0, cars: 0, bikes: 12 },
        },
    ];

    return alternatives.reduce(
        (max, curr) => {
            if (
                curr.value > max.value &&
                curr.require.buses <= buses &&
                curr.require.cars <= cars &&
                curr.require.bikes <= bikes
            ) {
                return curr;
            }
            return max;
        },
        { value: 0 }
    );
}

// Main function
function assignParkingSlots(
    busSlots,
    carSlots,
    parkingCharges,
    buses,
    cars,
    bikes
) {
    let profit = 0;

    // Initialize rejections, reset negative values to zero
    let busRejections = buses < 0 ? 0 : buses;
    let carRejections = cars < 0 ? 0 : cars;
    let bikeRejections = bikes < 0 ? 0 : bikes;

    buses = Math.max(0, buses);
    cars = Math.max(0, cars);
    bikes = Math.max(0, bikes);

    busSlots = Math.max(0, busSlots);
    carSlots = Math.max(0, carSlots);

    // Bus slots
    if (busSlots > 0) {
        while (busSlots > 0) {
            const bestAlternative = bestAlternativeForBusSlot(
                parkingCharges,
                buses,
                cars,
                bikes
            );
            if (bestAlternative.value > 0) {
                profit += bestAlternative.value;
                buses -= bestAlternative.require.buses;
                cars -= bestAlternative.require.cars;
                bikes -= bestAlternative.require.bikes;
                busSlots--;
            } else {
                break;
            }
        }
    }

    // Cars in car slots
    if (carSlots > 0 && cars <= carSlots) {
        profit += cars * parkingCharges.Car;
        carSlots -= cars;
        cars = 0;
    } else if (carSlots > 0) {
        profit += carSlots * parkingCharges.Car;
        cars -= carSlots;
        carSlots = 0;
    }

    // Bikes in car slots
    if (carSlots > 0) {
        const bikeRoom = carSlots * 5;
        if (bikes <= bikeRoom) {
            profit += bikes * parkingCharges.Bike;
            bikes = 0;
        } else {
            profit += bikeRoom * parkingCharges.Bike;
            bikes -= bikeRoom;
        }
    }

    // Update Rejections
    busRejections = buses;
    carRejections = cars;
    bikeRejections = bikes;

    return {
        Profit: profit,
        BusRejections: busRejections,
        CarRejections: carRejections,
        BikeRejections: bikeRejections,
    };
}

// Express part
exports.calculateParking = (req, res) => {
    const data = req.body;
    const result = assignParkingSlots(
        data.BusParkingSlots,
        data.CarParkingSlots,
        data.ParkingCharges,
        data.Buses,
        data.Cars,
        data.Bikes
    );
    res.json({ Answer: result });
};
