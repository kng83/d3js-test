let margin = {left: 20, right: 20, top: 50, bottom: 50};

let width = 600 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;
let padding = 100;

let timeMemory = [];


console.log(d3.select("#chart-area"));
function futureTime(index) {
    //Make ten future time stamps
    let formatTime = d3.timeFormat("%H:%M:%S");

    for (let i = 1; i < index; i++) {
        let newDate = new Date();
        newDate.setSeconds(newDate.getSeconds() < 60 - i ? newDate.getSeconds() + i : i - 1); //
        newDate.setMinutes(newDate.getSeconds() === i - 1 ? newDate.getMinutes() + 1 : newDate.getMinutes())
        timeMemory.push([newDate,0]);
    }
    return timeMemory;
}

console.log(futureTime(7));



function dataGenerator() {
    let formatTime = d3.timeFormat("%H:%M:%S");
    return [
        formatTime(new Date()),
        Math.round(Math.random())

    ]
}

function parseTime(value) {
    return d3.timeParse("%H:%M:%S")(value);
}

function timeLine() {

    return function (arr) {
        timeMemory.push(arr);
        if (timeMemory.length <= 1) {
            timeMemory.push(arr);
        }
        let point = [timeMemory[timeMemory.length - 2][0], timeMemory[timeMemory.length - 2][1]];
        let nextPoint = [timeMemory[timeMemory.length - 1][0], timeMemory[timeMemory.length - 1][1]];
        return {point, nextPoint};
    }
}

let svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// setInterval(()=>{
//     let help =d3.extent(timeMemory.map(d => d3.timeParse("%H:%M:%S")(d[0])));
//     console.log(help);
// },1000)

// X Scale
let x = d3.scaleTime().domain(d3.extent(timeMemory.map(d => parseTime(d[0])))).range([0, width]);
let xAxisCall = d3.axisBottom(x);

// Y Scale
let y = d3.scaleLinear().domain([0, 1]).range([height, 0]);
let yAxisCall = d3.axisLeft(y).ticks(1);


let xAxisGroup = svg.append("g")
    .attr("class", "x axis grid")
    .attr("transform", `translate(${0},${height})`)
    .call(xAxisCall);

let yAxisGroup = svg.append("g")
    .attr("class", "y axis grid")
    .call(yAxisCall);


let pointInMemory = timeLine();
setInterval(() => {

    let randObj = dataGenerator();
    let fullPoint = pointInMemory(randObj);
    drawLine(fullPoint.point, fullPoint.nextPoint);

}, 1000);


function drawLine(point, nextPoint) {
    x = d3.scaleTime().domain(d3.extent(timeMemory.map(d => parseTime(d[0])))).range([0, width]);
    xAxisCall = d3.axisBottom(x);
    xAxisGroup.call(xAxisCall);

    if (timeMemory.length > 8) {
        timeMemory.shift();
        svg.select('line.my-line').remove();
    }

    console.log(x(parseTime(nextPoint[0])) - x(parseTime(point[0])));
    svg.selectAll('line.my-line').attr("transform",
        `translate(${x(parseTime(nextPoint[0])) - x(parseTime(point[0]))},${0})`);

    svg.append('line')
        .attr('class', 'my-line')
        .attr('x1', x(parseTime(point[0])))
        .attr('y1', y(point[1]))
        .attr('x2', x(parseTime(point[0])))
        .attr('y2', y(point[1]))
        .attr("stroke", "purple")
        .attr("stroke-width", '2px')
        .attr("opacity", '0.2')
        .transition()
        .duration(800)
        .attr('x2', x(parseTime(nextPoint[0])))
        .attr('y2', y(nextPoint[1]))
        .attr("stroke", "#002881")
        .attr("stroke-width", '2.5px')
        .attr("opacity", '0.5');


    // svg.selectAll('circle.fly-circle').remove();
    // svg.append('circle')
    //     .attr('class', 'fly-circle')
    //     .attr('cx', x(parseTime(point[0])))
    //     .attr('cy', point[1])
    //     .attr('r', '5px')
    //     .attr("fill", "purple")
    //     .attr("opacity", '0.2')
    //     .transition()
    //     .duration(800)
    //     .attr('cx', x(parseTime(nextPoint[0])))
    //     .attr('cy', nextPoint[1])
    //     .attr('r', '5px')
    //     .attr("fill", "#002881")
    //     .attr("opacity", '0.5')

}





