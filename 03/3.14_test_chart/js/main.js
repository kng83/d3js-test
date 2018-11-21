
let margin = { left: 100, right: 10, top: 10, bottom: 100 };

//liczymy nowa wysokosc i szerokosc

let width = 800 - margin.left - margin.right;
let height = 900 - margin.top - margin.bottom;


let svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right) //bylo 400
    .attr("height", height + margin.bottom + margin.top); //bylo 400

let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let parseTime = d3.timeParse("%d-%b-%y");

let x = d3.scaleTime()
    .rangeRound([0, width]);

let y = d3.scaleLinear()
    .rangeRound([height, 0]);

let line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.close))
    .interpolate("linear");



d3.tsv('data/area.tsv').then(data => {
    let newData = data.slice(0, 50);
    x.domain(d3.extent(newData, function (d) {
        d.date = parseTime(d.date);
        console.log(d.date);
        return d.date;
    }));
    y.domain(d3.extent(newData, function (d) {
        d.close = + d.close;
        return d.close;
    }));

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("fill", "red")
        .attr("transform", "rotate(0)")
        .attr("x", width)
        .attr("y", -6)
        .attr("dx", "0.71em")
        .style("text-anchor", "end")
        .text("Time");

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "red")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .style("text-anchor", "end")
        .text("Price ($)");

    g.append("path")
        .datum(newData)
        .attr("class", "line")
        .attr("d", line)
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");


}).catch(e => console.log(e));