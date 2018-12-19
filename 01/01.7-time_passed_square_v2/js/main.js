//to jest ostatni przyklad
//https://gist.github.com/bjorngi/00be6a13e1bede83cbef

let n = 20,
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

    
function dataPusher(time) {
    setInterval(() => {
        if (Math.round(Math.random()) == 1) {
            data.push(1)
        } else {
            data.push(0)
        }
        clip
        .transition()
            .duration(time)
            .ease(d3.easeLinear)
            .on("start", tick);    
            data.shift()
    }, time)
}

function dataPusher2(time,value) {

        if ( value == 1) {
            data.push(1)
        } else {
            data.push(0)
        }
        d3.select(".clip-line")
        .transition()
            .duration(time)
            .ease(d3.easeLinear)
            .on("start", tick);    
            data.shift()
   
}

setInterval(()=>{
    dataPusher2(1000,Math.round(Math.random()));
},4000)


function tick() {

    let selection = d3.select(".clip-line")
        .attr("d", line)
        .attr("transform", null)

    d3.active(selection.node())
        .attr("transform", `translate(${x(0)},${0})`)
        .transition()
        .on("start",tick)

}
