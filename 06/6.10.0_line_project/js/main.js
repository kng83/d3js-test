/*
*    main.js
*    Mastering Data Visualization with D3.js
*    CoinStats
*/

let margin = { left:80, right:100, top:50, bottom:100 },
    height = 500 - margin.top - margin.bottom, 
    width = 800 - margin.left - margin.right;

let svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

let g = svg.append("g")
    .attr("transform", "translate(" + margin.left + 
        ", " + margin.top + ")");

// Time parser for x-scale
let parseTime = d3.timeParse("%d/%m/%Y");
var formatTime = d3.timeFormat("%d/%m/%Y");
var bisectDate = d3.bisector(function(d) { return d.date; }).left;

// Scales
let x = d3.scaleTime().range([0, width]);
let y = d3.scaleLinear().range([height, 0]);

// Axis generators
let xAxisCall = d3.axisBottom()
let yAxisCall = d3.axisLeft()
    .ticks(6)
    .tickFormat(function(d) { return parseInt(d / 1000) + "k"; });

// Axis groups
let xAxis = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");
let yAxis = g.append("g")
    .attr("class", "y axis")
    
// Y-Axis label
yAxis.append("text")
    .attr("class", "axis-title")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .attr("fill", "#5D6971")
    .text("Population)");

// Line path generator
let line = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.value); });


// Add jQuery UI slider
$("#date-slider").slider({
    range: true,
    max: parseTime("31/10/2017").getTime(),
    min: parseTime("12/5/2013").getTime(),
    step: 86400000, // One day
    values: [parseTime("12/5/2013").getTime(), parseTime("31/10/2017").getTime()],
    slide: function(event, ui){
        $("#dateLabel1").text(formatTime(new Date(ui.values[0])));
        $("#dateLabel2").text(formatTime(new Date(ui.values[1])));
        update();
    }
});

d3.json("data/coins.json").then(function(data) {
    // Data cleaning
    let bitCoinData = data['bitcoin'];

    bitCoinData.forEach(function(d) {
        d.year = parseTime(d.date);
        console.log(d.year);
        d.value = +d.price_usd;
    });

    // Set scale domains
    x.domain(d3.extent(bitCoinData, function(d) { return d.year; }));
    y.domain([d3.min(bitCoinData, function(d) { return d.value; }) / 1.005,
        d3.max(bitCoinData, function(d) { return d.value; }) * 1.005]);

    // Generate axes once scales have been set
    xAxis.call(xAxisCall.scale(x))
    yAxis.call(yAxisCall.scale(y))

    // Add line to chart
    g.append("path")
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "grey")
        .attr("stroke-with", "3px")
        .attr("d", line(bitCoinData));

    /******************************** Tooltip Code ********************************/

    let focus = g.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    focus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", 0)
        .attr("x2", width);

    focus.append("circle")
        .attr("r", 7.5);

    focus.append("text")
        .attr("x", 15)
        .attr("dy", ".31em");

    g.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
        let x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(bitCoinData, x0, 1),
            d0 = bitCoinData[i - 1],
            d1 = bitCoinData[i],
            d = x0 - d0.year > d1.year - x0 ? d1 : d0;
        focus.attr("transform", "translate(" + x(d.year) + "," + y(d.value) + ")");
        focus.select("text").text(d.value);
        focus.select(".x-hover-line").attr("y2", height - y(d.value));
        focus.select(".y-hover-line").attr("x2", -x(d.year));
    }


    /******************************** Tooltip Code ********************************/

});

