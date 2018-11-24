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
let x = d3.scaleLog().range([0, width]).domain([140, 150000]).base(10);

// Y Scale
let y = d3.scaleLinear().range([height, 0]).domain([0, 90]);

let area = d3.scaleLinear()
    .range([25 * Math.PI, 1500 * Math.PI])
    .domain([2000, 1400000000]);

let continentColor = d3.scaleOrdinal(d3.schemePastel1);


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
    .text("1800");

d3.json("data/data.json").then(data => {
     d3.interval(() => {
        let actuallDate = currentDate + (+data[0].year);
        currentDate = currentDate >= data.length-1 ? 0 : currentDate + 1;
        updata(data[currentDate].countries)
        g.select("#year").text(actuallDate)
    }, 100);

    updata(data[0].countries);
});

function updata(data) {
    let t = d3.transition().duration(100);

    // X Axis
    let xAxisCall = d3.axisBottom(x).tickSize(3).tickSize(2)
        .tickValues([400, 4000, 40000]) //tu wybieramy co na osi jest
        .tickFormat((d) => d);
    xAxisGroup.call(xAxisCall);

    // Y Axis
    let yAxisCall = d3.axisLeft(y).tickFormat(d => d);
    yAxisGroup.transition(t).call(yAxisCall);

    // Join new data with old elements
    let circles = g.selectAll("circle").data(data, (d) => d.country); // tu jest wazne zeby bylo country

    // Exit old elements not present in new data set
    circles.exit()
        .attr("class", "exit")
        .remove();

    // Zamieniamy prostokaty na kolka
    // i cy. Usuwamy wysokosc i dajemy polowe pasma tak by kropki byly nad miesiacami
    circles.enter()
        .append("circle")
        .attr("class", "enter")
        .attr("fill", d => continentColor(d.continent))
        //UPDATE
        .merge(circles)
        .transition(t)
        .attr("cx", d => x(+d.income || 3))
        .attr("cy", d => y(+d.life_exp) || 3)
        .attr("r", d => Math.sqrt(area(d.population) / Math.PI) || 0)

}



