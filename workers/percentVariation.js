onmessage = function (message) {
    data = JSON.parse(message.data);
    convertToPercentVariation(data);
};

function convertToPercentVariation(data) {
    for (item in data) {
        // Calculate average
        var average = 0;
        var counter = 0;
        for (entry in data[item].y) {
            average += data[item].y[entry];
            counter++;
        }
        average = average / counter;
        // Change values to percent variation
        for (entry in data[item].y) {
            data[item].y[entry] = (data[item].y[entry] - average) / (average);
        }
    }
    postMessage(JSON.stringify(data));
}
