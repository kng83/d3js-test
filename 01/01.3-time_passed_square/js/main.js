//to jest ostatni przyklad
//https://gist.github.com/bjorngi/00be6a13e1bede83cbef

let n = 10,
    random = () => Math.round(Math.random()),
    data = d3.range(n).map(random);

let svg = d3.select("svg"),
    margin = { top: 20, right: 20, bottom: 20, left: 40 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

let x = d3.scaleLinear()
    .domain([1, n - 2])
    .range([0, width]);
let y = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0]);

let line = d3.line()
    .x((d, i) => x(i))
    .y((d, i) => y(d))
    .curve(d3.curveStep);

g.append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(${0},${y(0)})`)
    .call(d3.axisBottom(x).ticks(3));

g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(1));

let clip = g.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .datum(data)
    .attr("id", "cline")
    .attr("class", "clip-line")
    .transition()
    .duration(4000)
    .ease(d3.easeLinear)
    .on("start", tick);


function tick() {
    // Push a new data point onto the back.
    data.push(random());
    // Redraw the line.
    d3.select(".clip-line")
        .attr("d", line)
        .attr("stroke", "red")
        .attr("opacity", '0.5')
        .attr("stroke-width", "2px")
        .attr("transform", null);

    d3.select(".x--axis")
        .attr("transform", null)
        .call(d3.axisBottom(x).ticks(4));

    d3.select(".x--axis")
        .attr("transform", `translate(${x(0)},${0})`)
        .transition()
        .call(d3.axisBottom(x).ticks(14));

    // Slide it to the left.
    d3.active(this)
        .attr("transform", `translate(${x(0)},${0})`)
        .attr("stroke-width", "2px")
        .transition()
        .on("start", tick);


    // Pop the old data point off the front.
    data.shift();
}
