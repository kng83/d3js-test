let margin = {left: 20, right: 20, top: 50, bottom: 50};

let width = 600 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

let timeMemory = [];
function dataGenerator() {
    let formatTime = d3.timeFormat("%H:%M:%S");
    return [
        formatTime(new Date()),
        Math.round(Math.random())

    ]
}
function parseTime(value){
    return d3.timeParse("%H:%M:%S")(value);
}

function timeLine() {

    return function (arr) {
        timeMemory.push(arr);
        if(timeMemory.length <=1){
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


// X Scale
//let maxData = data.map(value => value[0]).reduce((acc, current) => current > acc ? current : acc);

// setTimeout(()=>{
//     let help =d3.extent(timeMemory.map(d => d3.timeParse("%H:%M:%S")(d[0])));
//     console.log(help);
// },6000)


let x = d3.scaleTime().domain(timeMemory.map(d => d3.timeParse("%H:%M:%S")(d[0]))).range([0, width]);
let xAxisCall = d3.axisBottom(x);

// Y Scale
let y = d3.scaleLinear().domain([0,1]).range([height, 0]);
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
    x = d3.scaleTime().domain(timeMemory.map(d => d3.timeParse("%H:%M:%S")(d[0]))).range([0, width]);
    xAxisCall = d3.axisBottom(x);
    xAxisGroup.call(xAxisCall);

    let randObj = dataGenerator();
    let fullPoint = pointInMemory(randObj);
//   console.log(fullPoint);
  drawLine(fullPoint.point,fullPoint.nextPoint);

}, 1000);


function drawLine(point, nextPoint) {

    // svg.append('line')
    //     .attr('class', 'my-line')
    //     .attr('x1', parseTime(point[0]))
    //     .attr('y1', point[1])
    //     .attr('x2', parseTime(point[0]))
    //     .attr('y2', point[1])
    //     .attr("stroke", "purple")
    //     .attr("stroke-width", '2px')
    //     .attr("opacity", '0.2')
    //     .transition()
    //     .duration(800)
    //     .attr('x2', parseTime(nextPoint[0]))
    //     .attr('y2', nextPoint[1])
    //     .attr("stroke", "#002881")
    //     .attr("stroke-width", '2.5px')
    //     .attr("opacity", '0.5')
    //
    // svg.selectAll('circle.fly-circle').remove();
    // svg.append('circle')
    //     .attr('class', 'fly-circle')
    //     .attr('cx', parseTime(point[0]))
    //     .attr('cy', point[1])
    //     .attr('r', '5px')
    //     .attr("fill", "purple")
    //     .attr("opacity", '0.2')
    //     .transition()
    //     .duration(800)
    //     .attr('cx', parseTime(nextPoint[0]))
    //     .attr('cy', nextPoint[1])
    //     .attr('r', '5px')
    //     .attr("fill", "#002881")
    //     .attr("opacity", '0.5')

}





