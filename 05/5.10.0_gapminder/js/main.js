/*
*    main.js
*    Mastering Data Visualization with D3.js
*    5.2 - Looping with intervals
*/

let margin = {left: 80, right: 20, top: 50, bottom: 100};

let width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

let currentDate = 0;
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
let x = d3.scaleLog().range([0, width]);

// Y Scale
let y = d3.scaleLinear().range([height, 0]);


// X Label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("GDP");

// Y Label
let yLabel = g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Years of live");

let year = g.append("text")
    .attr("y", height + 50)
    .attr("id", "year")
    .attr("x", width)
    .attr("font-size", "20px")
    .attr("text-anchor", "end")
    .attr("class", "year-look")
    .text("Year");

d3.json("data/data.json").then(data => {

    d3.interval(() => {
        let actuallDate = currentDate + (+data[0].year);
        updata(data[currentDate].countries)
        g.select("#year").text(actuallDate)
        currentDate = currentDate + 1;
    }, 100);
    updata(data);
});

function updata(data) {

    x.domain([300, 150000]).base(10);
    y.domain([0, 90]);

    // X Axis
    let xAxisCall = d3.axisBottom(x).tickSize(3).tickSize(2)
        .tickValues([400, 4000, 40000]) //tu wybieramy co na osi jest
        .tickFormat((d) => d);
    xAxisGroup.call(xAxisCall);

    // Y Axis
    let yAxisCall = d3.axisLeft(y).tickFormat(d => d);
    yAxisGroup.transition(t).call(yAxisCall);

    // Join new data with old elements
    let circles = g.selectAll("circle").data(data, (d) => d);

    // Exit old elements not present in new data set
    circles.exit()
    // .attr("fill", "red")
        .transition(t)
        .remove();

    // Zamieniamy prostokaty na kolka
    // i cy. Usuwamy wysokosc i dajemy polowe pasma tak by kropki byly nad miesiacami
    circles.enter()
        .append("circle")
        .attr("fill", "blue")
        .attr("cy", y(0))
        .attr("cx", d => x(d.income || 3))
        .attr("r", 2)
        //UPDATE
        .merge(circles)
        .transition(t)
        .attr("cx", d => x(d.income || 3))
        .attr("cy", d => y(d.life_exp) || 3)

}



