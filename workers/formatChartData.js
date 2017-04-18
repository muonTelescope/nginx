onmessage = function (message) {
    data = JSON.parse(message.data);
    formatChartData(data);
};

function formatChartData(data) {
    var chartData = [];
    for (item in data[0]) {
        if (item != "createdAt") {
            var entryData = {};
            entryData.x = [];
            entryData.y = [];
            entryData.type = "scatter";
            entryData.name = item;
            for (entry in data) {
                entryData.x.push(data[entry].createdAt);
                entryData.y.push(data[entry][item]);
            }
            chartData.push(entryData);
        }
    }
    postMessage(JSON.stringify(chartData));
}
