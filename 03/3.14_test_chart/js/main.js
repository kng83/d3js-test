let margin = {left: 100, right: 10, top: 10, bottom: 100};

//liczymy nowa wysokosc i szerokosc

let width = 600 - margin.left - margin.right;
let height = 600 - margin.top - margin.bottom;


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


let interpolateTypes = [d3.curveLinear, d3.curveStepBefore,
    d3.curveStepAfter, d3.curveBasis, d3.curveBasisOpen, d3.curveBasisClosed, d3.curveBundle,
    d3.curveCardinal, d3.curveCardinal, d3.curveCardinalOpen, d3.curveCardinalClosed, d3.curveNatural];
let line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.close))
    .curve(interpolateTypes[3])
// .interpolate("linear");
//http://bl.ocks.org/emmasaunders/c25a147970def2b02d8c7c2719dc7502


d3.tsv('data/area.tsv').then(data => {
    let newData = data.slice(0, 50);
    x.domain(d3.extent(newData, function (d) {
        d.date = parseTime(d.date);
        console.log(d.date);
        return d.date;
    }));
    y.domain(d3.extent(newData, function (d) {
        d.close = +d.close;
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
        .attr("stroke-width", 5)
        .attr("fill", "none");


}).catch(e => console.log(e));
