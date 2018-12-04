
let margin = {left: 80, right: 20, top: 50, bottom: 100};

let width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

let data = [[10, 100], [50, 100],[50,50], [100, 50], [150, 50],[150,100],[200, 100], [200, 50], [250, 50], [250, 100],[300,100]];

let svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


let xAxisGroup = svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

let yAxisGroup = svg.append("g")
    .attr("class", "y axis");

// X Scale
let x = d3.scaleBand().domain(data.map(value => value[0])).range([0, width]);

// Y Scale
let y = d3.scaleBand().domain([0,1]).range([height, 0]);


// X Axis
let xAxisCall = d3.axisBottom(x);
xAxisGroup.call(xAxisCall);

// Y Axis
let yAxisCall = d3.axisLeft(y);
yAxisGroup.call(yAxisCall);






let index = 0;
setInterval(()=>{
    let point = data[index];
    let nextPoint = data[index+1];

    drawLine(point,nextPoint);
    if(index + 2 < data.length){
        index ++;
    }

    if(index >7){
        svg.select('line:first-child').remove();
    }

},1000);
// robienie lini z tranzycja

function drawLine(point, nextPoint){

    svg.append('line')
        .attr('x1',point[0])
        .attr('y1',point[1])
        .attr('x2',point[0])
        .attr('y2',point[1])
        .attr("stroke", "red")
        .attr("stroke-width", '2px')
        .attr("opacity",'0.2')
        .transition()
        .duration(800)
        .attr('x2',nextPoint[0])
        .attr('y2',nextPoint[1])
        .attr("stroke", "blue")
        .attr("stroke-width", '2.5px')
        .attr("opacity",'0.5')

}





