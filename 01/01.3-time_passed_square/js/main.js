let n = 10,
    random = () => Math.round(Math.random()),
    data = d3.range(n).map(random);

let svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 20, left: 40},
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
    .x((d, i) =>{
        return x(i);
    })
    .y((d, i)=> {
        return y(d);
    }).curve(d3.curveStep);

g.append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(d3.axisBottom(x).ticks(5));

g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(1));

g.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .datum(data)
    .attr("id","cline")
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
        .attr("transform", null);
    // Slide it to the left.

   // console.log(document.getElementById('cline'))

    d3.active(this)
        .attr("transform", "translate(" + x(0) + ",0)")
        .transition()
        .on("start", tick);
    // Pop the old data point off the front.
    data.shift();
}
