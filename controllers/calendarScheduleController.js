function scheduleLessons(lessonRequests) {
    // Sort lesson requests by potential earnings in descending order
    lessonRequests.sort((a, b) => b.potentialEarnings - a.potentialEarnings);

    // Initialize the schedule for each day
    const schedule = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
    };

    // Initialize work hours per day and total earnings
    const workHoursPerDay = 12;
    let totalEarnings = 0;

    // Iterate through lesson requests and assign them to available days
    lessonRequests.forEach((request) => {
        const duration = request.duration;
        const availableDays = request.availableDays;

        // Find the best available day for the lesson
        let bestDay = null;

        availableDays.forEach((day) => {
            if (
                !bestDay &&
                schedule[day].length + duration <= workHoursPerDay
            ) {
                bestDay = day;
            }
        });

        // Assign the lesson to the best available day
        if (bestDay !== null) {
            schedule[bestDay].push(request.lessonRequestId);
            totalEarnings += request.potentialEarnings;

            // Check if the work hours for the day are full
            if (schedule[bestDay].length * duration >= workHoursPerDay) {
                // Remove the day from availableDays to prevent further assignments
                availableDays.splice(availableDays.indexOf(bestDay), 1);
            }
        }
    });

    return schedule;
}

exports.calculateCalendarScheduling = (req, res) => {
    const inputData = req.body;
    const output = scheduleLessons(inputData);
    res.json(output);
};
