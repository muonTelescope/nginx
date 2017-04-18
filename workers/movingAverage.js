onmessage = function(message) {
    var data = JSON.parse(message.data);
    convertToMovingAverage(data.chartData, data.period);
};

function convertToMovingAverage(data, period) {
    for (item in data) {
        data[item].y = simpleSMA(data[item].y, period);
        data[item].x.splice(0, period);
        data[item].y.splice(0, period);
    }
    postMessage(JSON.stringify(data));
}

function simpleSMA(array, N) {
    return array.map(
        function (el, index, _arr) {
            return _arr.filter(
                function (x2, i2) {
                    return i2 <= index && i2 > index - N;
                })
                .reduce(
                function (current, last, index, arr) {
                    return (current + last);
                }) / N;
        });
}