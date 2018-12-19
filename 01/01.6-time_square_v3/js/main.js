//to jest ostatni przyklad
//https://gist.github.com/bjorngi/00be6a13e1bede83cbef


let n = 20,
    duration = 1000,
    now = new Date(Date.now() - 2* duration),
    // now = new Date(Date.now()),
    state = 0,
    data = d3.range(n).map(() => 0),
    xDomain = (dateNow, numberOfTicks, duration) => [dateNow - (numberOfTicks - 2) * duration, dateNow - duration]

let margin = { top: 6, right: 0, bottom: 20, left: 40 },
    width = 400 - margin.right,
    height = 180 - margin.top - margin.bottom;

let x = d3
    .scaleTime()
    .domain(xDomain(now, n, duration))
    .range([0, width]);

let y = d3.scaleLinear().range([height, 0]);

let line = d3
    .line()
    .x((d, i) => x(now - (n - 1 - i) * duration))
    .y((d, i) => y(d))
    .curve(d3.curveStep);

let svg = d3
    .select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg
    .append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

let xAxis = d3.axisBottom(x);
let yAxis = d3.axisLeft(y);

svg
    .append("g")
    .attr("class", "x--axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis.ticks(5));

svg
    .append("g")
    .attr("class", "y--axis")
    .call(yAxis.ticks(1));

svg
    .append("g")
    .attr("clip-path", "url(#clip)")
    .attr("class", "path-el")
    .append("path")
    .datum(data)
    .attr("class", "line-path");


setInterval(() => {
    if (Math.round(Math.random()) == 1) {
        state = 1;
    } else state = 0;
    move();
}, 1000)


function move() {
    return d3.transition()
        .each(() => {
            now = new Date();
            data.push(state);
            // update the domains
            x.domain(xDomain(now, n, duration));
            y.domain([0, d3.max(data)]);

            // redraw the line and slide the line left
            d3.select(".line-path")
                
                //   .attr("transform", `translate(${x(now - (n - 1) * duration)},${0})`)
              //  .transition()
                .attr("d", line)
         //       .attr("transform", null)
                .attr("transform", `translate(${x(now - (n -1) * duration)},${0})`)
                .transition()
                .duration(duration)
                .ease(d3.easeLinear)


             
                // pop the old data point off the front
                data.shift();


            //    slide the x-axis left
            d3.select(".x--axis")
                .transition()
                .duration(duration)
                .ease(d3.easeLinear)
                .call(d3.axisBottom(x).ticks(7));

            d3.select(".tick").remove();

            // push the accumulated state onto the back, and reset the state
        })

}





