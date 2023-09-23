class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

function calculateWeight(colony, generations) {
    // Convert the colony string to a linked list for efficient insertions
    let head = new Node(parseInt(colony[0], 10));
    let current = head;
    let weight = head.value; // Initialize weight with the value of the head node

    for (let i = 1; i < colony.length; i++) {
        current.next = new Node(parseInt(colony[i], 10));
        current = current.next;
        weight += current.value; // Update the running total
    }

    // Main loop for each generation
    for (let gen = 0; gen < generations; gen++) {
        // Insert new nodes
        current = head;
        while (current && current.next) {
            let signature =
                current.value >= current.next.value
                    ? current.value - current.next.value
                    : 10 - (current.next.value - current.value);
            let newDigit = (weight + signature) % 10;

            let newNode = new Node(newDigit);
            newNode.next = current.next;
            current.next = newNode;

            weight += newDigit; // Update the running total

            current = newNode.next;
        }
    }

    return weight.toString(); // The running total is the final weight
}

exports.calculateDigitalColony = (req, res) => {
    const inputData = req.body;
    const outputData = inputData.map(({ generations, colony }) =>
        calculateWeight(colony, generations)
    );
    res.json(outputData);
};
