/*
*    main.js
*    Mastering Data Visualization with D3.js
*    5.2 - Looping with intervals
*/

let margin = {left: 80, right: 20, top: 50, bottom: 100};

let width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

let g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

let xAxisGroup = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")

let yAxisGroup = g.append("g")
    .attr("class", "y axis")


// X Scale
let x = d3.scaleBand();

// Y Scale
let y = d3.scaleLinear();


// X Label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month");

// Y Label
g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");

d3.json("data/revenues.json").then(function (data) {
    updata(data); //aby wyswietlilo szybciej a nie po sekundzie
    d3.interval(() => {
        console.log('some');
        updata(data);
    }, 1000);
});

function updata(data) {
    // Clean data
    data.forEach((d) => d.revenue = +d.revenue);

    x.domain(data.map(d => d.month)).range([0, width]).padding(0.2);
    y.domain([0, d3.max(data, d => d.revenue)]).range([height, 0]);

    // X Axis
    let xAxisCall = d3.axisBottom(x);
    xAxisGroup.call(xAxisCall);

    // Y Axis
    let yAxisCall = d3.axisLeft(y).tickFormat(d => "$" + d);
    yAxisGroup.call(yAxisCall);


    // Bars
    let rects = g.selectAll("rect")
        .data(data);

    rects.enter()
        .append("rect")
        .attr("y", d => y(d.revenue))
        .attr("x", d => x(d.month))
        .attr("height", d => height - y(d.revenue))
        .attr("width", x.bandwidth)
        .attr("fill", "blue");
}







