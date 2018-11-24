/*
*    main.js
*    Mastering Data Visualization with D3.js
*    5.2 - Looping with intervals
*/

let margin = {left: 80, right: 20, top: 50, bottom: 100};

let width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//Flag
let flag = true;

//Transition function (powinna byc mniejsza niz nasz update)
let t = d3.transition().duration(750)

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
        // aby pokazac na innych danych jak znikaja
        let newData = flag ? data : data.slice(1)
        newData = data;
        updata(newData);
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
    // tu do grupy dodajemy transition dzieki temu skalujemy os y
    yAxisGroup.transition(t).call(yAxisCall);

    // Join new data with old elements
    let rects = g.selectAll("circle")
        .data(data, (d) => d.month);

    // Exit old elements not present in new data set
    rects.exit()
        .attr("fill", "red")
        .transition(t)
        .remove();

    // Zamieniamy prostokaty na kolka
    // i cy. Usuwamy wysokosc i dajemy polowe pasma tak by kropki byly nad miesiacami
    rects.enter()
        .append("circle")
        .attr("fill", "blue")
        .attr("cy", y(0))
        .attr("cx", d => x(d.month) + x.bandwidth()/2)
        .attr("r", 5)
        //UPDATE
        .merge(rects)
        .transition(t)
        .attr("cx", d => x(d.month) + x.bandwidth()/2)
        .attr("cy", d => y(d[value]))

    let label = flag ? "Revenue" : "Profit";
    yLabel.text(label);
}







