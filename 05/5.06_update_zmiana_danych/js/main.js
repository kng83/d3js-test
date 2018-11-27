/*
*    main.js
*    Mastering Data Visualization with D3.js
*    5.2 - Looping with intervals
*/

let margin = {left: 80, right: 20, top: 50, bottom: 100};

let width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//robimy flage by zmieniac zrodlo danych
let flag = true;


let g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

let xAxisGroup = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

let yAxisGroup = g.append("g")
    .attr("class", "y axis");

// X Scale
let x = d3.scaleBand().range([0, width]).padding(0.2);

// Y Scale
let y = d3.scaleLinear().range([height, 0]);


// X Label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month");

// Y Label
let yLabel = g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");

d3.json("data/revenues.json").then(function (data) {
    //Clean data -bierzemy 2 dane bo bedziemy je wyswietlac naprzemiennie
    data.forEach(d => {
        d.revenue = +d.revenue;
        d.profit = +d.profit;
    });

    d3.interval(() => {
        updata(data);
        flag = !flag;
    }, 1000);

    updata(data);
});

function updata(data) {
    //tu czytamy flage
    let value = flag ? "revenue" : "profit";

    // tu dajemy domeny deklarowane wczesniej
    x.domain(data.map(d => d.month));
    y.domain([0, d3.max(data, d => d[value])]);

    // X Axis
    let xAxisCall = d3.axisBottom(x);
    xAxisGroup.call(xAxisCall);

    // Y Axis
    let yAxisCall = d3.axisLeft(y).tickFormat(d => "$" + d);
    yAxisGroup.call(yAxisCall);


    // Join new data with old elements
    let rects = g.selectAll("rect")
        .data(data);

    // Exit old elements not present in new data set
    rects.exit().remove();

    // UPDATE old elements present in new data (nie dajemy juz to enter) tu niema append
    rects
        .attr("y", d => y(d[value]))
        .attr("x", d => x(d.month))
        .attr("height", d => height - y(d[value]))
        .attr("width", x.bandwidth);

    // ENTER new elements present in new data
    rects.enter()
        .append("rect")
        .attr("y", d => y(d[value]))
        .attr("x", d => x(d.month))
        .attr("height", d => height - y(d[value]))
        .attr("width", x.bandwidth)
        .attr("fill", "blue");

    let label = flag ? "Revenue" : "Profit";
        yLabel.text(label);
}







