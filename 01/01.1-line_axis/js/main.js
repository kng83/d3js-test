let margin = {left: 20, right: 20, top: 50, bottom: 50};

let width = 600 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

let data = [[10, 1], [50, 1],
    [50, 0], [100, 0],
    [150, 0], [150, 1],
    [200, 1], [200, 0],
    [250, 0], [250, 1],
    [300, 1]];

function dataGenerator() {
    let newDate = new Date();
    return [
        Math.round(Math.random()),
        {hour: newDate.getHours(), minute: newDate.getMinutes(), second: newDate.getSeconds()}
    ]
}

let svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


// X Scale
let maxData = data.map(value => value[0]).reduce((acc, current) => current > acc ? current : acc);

let x = d3.scaleLinear().domain([0, maxData]).range([0, width]);
let xAxisCall = d3.axisBottom(x);

// Y Scale
let y = d3.scaleLinear().domain([0, 1, 2]).range([height, 0]);
let yAxisCall = d3.axisLeft(y).ticks(2)


let xAxisGroup = svg.append("g")
    .attr("class", "x axis grid")
    .attr("transform", `translate(${0},${height})`)
    .call(xAxisCall);

let yAxisGroup = svg.append("g")
    .attr("class", "y axis grid")
    .call(yAxisCall);


let index = 0;
setInterval(() => {

    let pointX = data[index][0];
    let pointY = data[index][1];

    let nextPointX = data[index + 1][0];
    let nextPointY = data[index + 1][1];

    let point = [x(pointX), y(pointY)];
    let nextPoint = [x(nextPointX), y(nextPointY)]

    drawLine(point, nextPoint);
    if (index + 2 < data.length) {
        index++;
    }

    if (index > 5) {
        svg.select('.my-line').remove();
    }

}, 1000);

// robienie lini z tranzycja

function drawLine(point, nextPoint) {

    svg.append('line')
        .attr('class', 'my-line')
        .attr('x1', point[0])
        .attr('y1', point[1])
        .attr('x2', point[0])
        .attr('y2', point[1])
        .attr("stroke", "purple")
        .attr("stroke-width", '2px')
        .attr("opacity", '0.2')
        .transition()
        .duration(800)
        .attr('x2', nextPoint[0])
        .attr('y2', nextPoint[1])
        .attr("stroke", "#002881")
        .attr("stroke-width", '2.5px')
        .attr("opacity", '0.5')

    svg.selectAll('circle.fly-circle').remove();
    svg.append('circle')
        .attr('class', 'fly-circle')
        .attr('cx', point[0])
        .attr('cy', point[1])
        .attr('r', '5px')
        .attr("fill", "purple")
        .attr("opacity", '0.2')
        .transition()
        .duration(800)
        .attr('cx', nextPoint[0])
        .attr('cy', nextPoint[1])
        .attr('r', '5px')
        .attr("fill", "#002881")
        .attr("opacity", '0.5')

}





