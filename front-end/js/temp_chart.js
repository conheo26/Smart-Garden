
var b;

var dataTemp = [];
var label = [];
setTimeout(() => {
    $.getJSON("https://io.adafruit.com/api/v2/Jackson25092002/feeds/bbc-temp/data", function (data) {
        console.log(data);
        for (var i = 0; i < 6; i++) {
            dataTemp.push(+data[i].value);
            var q = new Date(data[i].created_at);
            label.push(((q.getHours() < 10) ? "0" : "") + q.getHours() + ":" + ((q.getMinutes() < 10) ? "0" : "") + q.getMinutes());
        }
        dataTemp.reverse();
        label.reverse();
    });
    
    console.log(dataTemp);
    console.log(label);
    b.update();
},1);
document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('myChartTemp').getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 225);
    gradient.addColorStop(0, 'rgba(255, 177, 103, 0.9)');
    gradient.addColorStop(1, 'rgba(215, 227, 244, 0.7)');
    // Line chart
    b = new Chart(document.getElementById('myChartTemp'), {
        type: 'line',
        data: {
            labels: label,
            datasets: [
                {
                    label: 'Temp (℃)',
                    fill: true,
                    backgroundColor: gradient,
                    borderColor: '#F4A460',
                    tension: 0.4,
                    data: dataTemp,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            tooltips: {
                intersect: false,
            },
            hover: {
                intersect: true,
            },
            plugins: {
                filler: {
                    propagate: false,
                },
            },
            layout:{
                padding: {
                    left: 10,
                    bottom: 20,
                },
            },
            scales: {
                xAxes: [
                    {
                        reverse: false,
                        gridLines: {
                            color: 'rgba(0,0,0,0.0)',
                        },

                        grid: {
                            color: 'white',
                            borderColor: 'white',
                            tickColor: 'white',
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            stepSize: 2,
                        },
                        borderDash: [3, 3],
                        gridLines: {
                            color: 'rgba(0,0,0,0.0)',
                        },
                        grid: {
                            color: 'white',
                            borderColor: 'white',
                            tickColor: 'white',
                        },
                    },
                ],
            },
        },
    });
});

// var currentTime = new Date();
// function randomInt(){
//     return Math.floor(Math.random() * 20 + 15);
// }

setInterval(() => {    
    currentTime = new Date();
    // console.log(currentTime.getMinutes());
    // console.log(currentTime.getMinutes() % 5);
    if ((currentTime.getMinutes() % 2 == 0 && (((currentTime.getHours() < 10) ? "0" : "") + currentTime.getHours() + ":" + ((currentTime.getMinutes() < 10) ? "0" : "") + currentTime.getMinutes()) != label[5])
        || !(currentTime.getHours() == label[5].substring(0, 2) && currentTime.getMinutes() - label[5].substring(3) <= 5)) {
        label.shift();
        label.push(((currentTime.getHours() < 10) ? "0" : "") + currentTime.getHours() + ":" + ((currentTime.getMinutes() < 10) ? "0" : "") + currentTime.getMinutes());
    }
    
    $.getJSON("https://io.adafruit.com/api/v2/Jackson25092002/feeds/bbc-temp/data", function (data) {
        dataTemp[5] = data.last_value;
        if (data.last_value >= 50) alert("RUN");
    });
    // $.ajax({
    //     url: "https://io.adafruit.com/api/v2/hjilklong/feeds/bbc-temp/data",
    //     dataType: "json",
    //     type: "post",
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Content-Type': 'application/json',
    //         'X-AIO-Key': 'aio_ZbXm45LILMmxcpivwARIInsM1MzZ'
    //     },
    //     data: JSON.stringify({ "value": randomInt() }),
    //     processData: false,
    //     success: function (data, textStatus, jQxhr) {
    //         //alert('ONN');
    //     },
    //     error: function (jQxhr, textStatus, errorThrown) {
    //         console.log(errorThrown);
    //     },
    // });
    b.update();
}, 1000);
// var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// var d = new Date().getDay();
// console.log(d);
// // console.log(a.data.dataTempets[0].data);
// setTimeout(function () {
//     if (day[d] != b.data.labels[6]) {
//         for (var i = 1; i <= d; i++) {
//             b.data.labels.shift();
//             b.data.labels.push(day[i]);
//         }
//     }
// },1)
// setInterval(() => {
//     $.getJSON("https://io.adafruit.com/api/v2/hjilklong/feeds/bbc-temp", function (data) {
//         // b.data.dataTempets[0].data[b.data.labels.indexOf(day[d])] = data.last_value;
//         b.data.dataTempets[0].data[b.data.labels.indexOf(day[d])] = Math.floor(Math.random() * 50);
//     });
//     console.log(b.data.dataTempets[0].data[b.data.labels.indexOf(day[d])]);
//     // console.log(a.data.dataTempets[0].data[a.data.labels.indexOf('Fri')]);
//     console.log(b.data.labels);
//     b.update();
// }, 5000);


    /* $.getJSON("https://io.adafruit.com/Jackson25092002/feeds/bbc-humidity", function (data) {
        console.log("Humidity Data:", data);
        const humidity = parseFloat(data.last_value);
        const time = new Date().toLocaleTimeString();
        humidityData.push(humidity);
        humidityLabels.push(time);
        if (humidityData.length > 10) {
            humidityData.shift();
            humidityLabels.shift();
        }
        humidityChart.update();
    }).fail(function(jqxhr, textStatus, error) {
        console.error("Humidity API request failed: " + textStatus + ", " + error);
    }); */