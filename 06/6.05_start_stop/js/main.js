/*
*    main.js
*    Mastering Data Visualization with D3.js
*    6.2 - Adding a legend
*/
//Dodanie tooltips do wizualizacji

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
//dodajemy przechowywany interval
let interval;
let formattedData;

//TOOLTIP
let tip = d3.tip().attr('class', 'd3-tip').html(d =>
    `<strong>Country:</strong><span style="color:red">${d.country}</span><br>
     <strong>Continent:</strong><span style="color:red;text-transform:capitalize">${d.continent}</span><br>
     <strong>Life Expectancy:</strong><span style="color:red">${d3.format(".2f")(d.life_exp)}</span><br>
     <strong>GDP Per Capita:</strong><span style="color:red">${d3.format("$,.0f")(d.income)}</span><br>
     <strong>Population:</strong><span style="color:red">${d3.format(",.0f")(d.population)}</span><br>`);
g.call(tip); //zalaczamy nasz kontekst

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
        .attr("transform", `translate(${0},${i * 20})`);

    legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", continentColor(continent));

    legendRow.append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .style("text-transform", "capitalize")
        .text(continent);
});

d3.json("data/data.json").then(data => {
    formattedData = data
        .map(year => year["countries"].filter(country => country.income && country.life_exp))
        .map(country => {
            country.income = +country.income;
            country.life_exp = +country.life_exp;
            return country;
        });
    // First run of the visualization
    update(formattedData[0]);

});

//JQuery play button
$("#play-button").on("click", function () {
    let button = $(this);
    if (button.text() === "Play") {
        button.text("Pause");
        interval = setInterval(step, 100);
    } else {
        button.text("Play");
        clearInterval(interval);
    }
});

$("#reset-button").on("click", function () {
    time = 0;
    update(formattedData[0]);
});

// Po to aby odswiezyc przy pausie dane jak jest wybor
$("#continent-select").on("change",function(){
    update(formattedData[time])
})


//Nowy czas aby byla mozliwa pausa
function step() {
    time = (time < 214) ? time + 1 : 0;
    update(formattedData[time]);
}

function update(data) {
    // Standard transition time for the visualization
    let t = d3.transition()
        .duration(100);

    //***Dodajemy filter do kontynentow aby wybierac ktory kontynent
    let continent = $("#continent-select").val();
    data = data.filter(d => {
        if (continent === "all") {
            return true;
        } else {
            return d.continent == continent;
        }
    });

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
        .attr("fill", d => continentColor(d.continent))
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)// tu sa event listeners by pokazywac nasz tip
        .merge(circles)
        .transition(t)
        .attr("cy", (d) => y(d.life_exp))
        .attr("cx", (d) => x(d.income))
        .attr("r", (d) => Math.sqrt(area(d.population) / Math.PI));

    // Update the time label
    timeLabel.text(+(time + 1800))
}