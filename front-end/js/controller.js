// đây là controller sẽ lấy và hiển thị dữ liệu 2 nút nhấn led và water
console.log(12);
setInterval(() => {
    $.getJSON("https://io.adafruit.com/api/v2/Jackson25092002/feeds/bbc-temp", function (data) {
        console.log(data.last_value);
        document.getElementById("temp").innerHTML = data.last_value + "℃";
    });
    $getJSON("https://io.adafruit.com/api/v2/Jackson25092002/feeds/bbc-humi", function (data) {
        console.log(data.last_value);
        document.getElementById("humi").innerHTML = data.last_value + "%";
    });
    $.getJSON("	https://io.adafruit.com/api/v2/Jackson25092002/feeds/bbc-water", function (data) {
        console.log(data.last_value);
        if (data.last_value == "ON")
            document.getElementById("water").checked = true;
        else document.getElementById("water").checked = false;
    });
    $.getJSON("https://io.adafruit.com/api/v2/Jackson25092002/feeds/bbc-led", function (data) {
        console.log(data.last_value);
        if (data.last_value == "ON")
            document.getElementById("led").checked = true;
        else document.getElementById("led").checked = false;
    });
}, 5000);

function Led() {
    if (document.getElementById('led').checked) {
        $.ajax({
            url: "https://io.adafruit.com/api/v2/Jackson25092002/feeds/bbc-led/data",
            dataType: "json",
            type: "post",
            headers: {
                'Content-Type': 'application/json',
                'Content-Type': 'application/json',
                'X-AIO-Key': 'aio_wDlM177B4gi629imDu8FltghVx7W'
            },
            data: JSON.stringify({"value": "ON"}),
            processData: false,
            success: function (data, textStatus, jQxhr) {
                //alert('ONN');
            },
            error: function (jQxhr, textStatus, errorThrown) {
                console.log(errorThrown);
            },
        })
    } else {
        $.ajax({
            url: "https://io.adafruit.com/api/v2/Jackson25092002/feeds/bbc-led/data",
            dataType: "json",
            type: "post",
            headers: {
                'Content-Type': 'application/json',
                'Content-Type': 'application/json',
                'X-AIO-Key': 'aio_wDlM177B4gi629imDu8FltghVx7W'
            },
            data: JSON.stringify({ "value": "OFF" }),
            processData: false,
            success: function (data, textStatus, jQxhr) {
                //alert('ONN');
            },
            error: function (jQxhr, textStatus, errorThrown) {
                console.log(errorThrown);
            },
        })

    }
}

function Water() {
    if (document.getElementById('water').checked) {
        $.ajax({
            url: "https://io.adafruit.com/api/v2/Jackson25092002/feeds/bbc-water/data",
            dataType: "json",
            type: "post",
            headers: {
                'Content-Type': 'application/json',
                'Content-Type': 'application/json',
                'X-AIO-Key': 'aio_wDlM177B4gi629imDu8FltghVx7W'
            },
            data: JSON.stringify({"value": "ON"}),
            processData: false,
            success: function (data, textStatus, jQxhr) {
                //alert('ONN');
            },
            error: function (jQxhr, textStatus, errorThrown) {
                console.log(errorThrown);
            },
        })
    } else {
        $.ajax({
            url: "https://io.adafruit.com/api/v2/Jackson25092002/feeds/bbc-water/data",
            dataType: "json",
            type: "post",
            headers: {
                'Content-Type': 'application/json',
                'Content-Type': 'application/json',
                'X-AIO-Key': 'aio_wDlM177B4gi629imDu8FltghVx7W'
            },
            data: JSON.stringify({ "value": "OFF" }),
            processData: false,
            success: function (data, textStatus, jQxhr) {
                //alert('ONN');
            },
            error: function (jQxhr, textStatus, errorThrown) {
                console.log(errorThrown);
            },
        })

    }
}
