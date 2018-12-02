let data = [[10, 20], [40, 50], [100, 320], [20, 40],[200,2]];

// moj na wyszukanie min i max
yMax = data.reduce((acc, current) => current[1] > acc[1] ? current : acc)[1];
yMin = data.reduce((acc, current) => current[1] < acc[1] ? current : acc)[1];
console.log(yMax, 'max', yMin, 'min');

let svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", 500)
    .attr("height", 400);


let index = 0;
setInterval(()=>{
    let point = data[index];
    let nextPoint = data[index+1];

    drawLine(point,nextPoint);
    if(index + 2 < data.length){
        index ++;
    }

    if(index >2){
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
        .attr("stroke", "purple")
        .attr("stroke-width", '2px')
        .attr("opacity",'0.5')


}






