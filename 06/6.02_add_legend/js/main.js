/*
*    main.js
*    Mastering Data Visualization with D3.js
*    6.2 - Adding a legend
*/

let margin = {left: 80, right: 20, top: 50, bottom: 100};
let height = 500 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right;

let g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left +
        ", " + margin.top + ")");

let time = 0;

// Scales
let x = d3.scaleLog()
    .base(10)
    .range([0, width])
    .domain([142, 150000]);
let y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 90]);
let area = d3.scaleLinear()
    .range([25 * Math.PI, 1500 * Math.PI])
    .domain([2000, 1400000000]);
let continentColor = d3.scaleOrdinal(d3.schemePastel1);

// Labels
let xLabel = g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("GDP Per Capita ($)");
let yLabel = g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", -170)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Life Expectancy (Years)")
let timeLabel = g.append("text")
    .attr("y", height - 10)
    .attr("x", width - 40)
    .attr("font-size", "40px")
    .attr("opacity", "0.4")
    .attr("text-anchor", "middle")
    .text("1800");

// X Axis
let xAxisCall = d3.axisBottom(x)
    .tickValues([400, 4000, 40000])
    .tickFormat(d3.format("$"));
g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisCall);

// Y Axis
let yAxisCall = d3.axisLeft(y)
    .tickFormat(function (d) {
        return +d;
    });
g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall);

// tu sa kontynenty
let continents = ["europe", "asia", "americas", "africa"];

//LEGEND
let legend = g.append("g")
    .attr("transform", `translate(${width - 10},${height - 125})`);

continents.forEach((continent, i) => {
    let legendRow = legend.append("g")
        .attr("transform", `translate(${0},${i * 20})`); //tak aby legenda byla jedna pod druga

    legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", continentColor(continent)); //tu pobierany jest color do odpowiedniego kontynentu

    legendRow.append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .style("text-transform", "capitalize")
        .text(continent);
});

d3.json("data/data.json").then(data => {
    const formattedData = data
        .map(year => year["countries"].filter(country => country.income && country.life_exp))
        .map(country => {
            country.income = +country.income;
            country.life_exp = +country.life_exp;
            return country;
        });

    // Run the code every 0.1 second
    d3.interval(() => {
        // At the end of our data, loop back
        time = (time < 214) ? time + 1 : 0
        update(formattedData[time]);
    }, 100);

    // First run of the visualization
    update(formattedData[0]);

})

function update(data) {
    // Standard transition time for the visualization
    let t = d3.transition()
        .duration(100);

    // JOIN new data with old elements.
    let circles = g.selectAll("circle").data(data, (d) => {
        return d.country;
    });

    // EXIT old elements not present in new data.
    circles.exit()
        .attr("class", "exit")
        .remove();

    // ENTER new elements present in new data.
    circles.enter()
        .append("circle")
        .attr("class", "enter")
        .attr("fill", d => {
            return continentColor(d.continent);
        })
        .merge(circles)
        .transition(t)
        .attr("cy", (d) => {
            return y(d.life_exp);
        })
        .attr("cx", (d) => {
            return x(d.income)
        })
        .attr("r", (d) => {
            return Math.sqrt(area(d.population) / Math.PI)
        });

    // Update the time label
    timeLabel.text(+(time + 1800))
}