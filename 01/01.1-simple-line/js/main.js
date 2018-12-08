let data = [[10, 20], [40, 50], [100, 320], [20, 40]];

// moj na wyszukanie min i max
yMax = data.reduce((acc, current) => current[1] > acc[1] ? current : acc)[1];
yMin = data.reduce((acc, current) => current[1] < acc[1] ? current : acc)[1];
console.log(yMax, 'max', yMin, 'min');

let svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", 500)
    .attr("height", 400);

let svgLine = svg.append('path');

let line = d3.line().x((d) => d[0]).y(d => d[1]);


svg.select('path')
    .attr('class', 'xxx')
    .attr('d', line(data))
    .attr("stroke", "red")
    .attr("stroke-width", '2px')
    .attr('fill','none')

// robienie lini z tranzycja
svg.append('line')
    .attr('x1',20)
    .attr('y1',20)
    .attr('x2',20)
    .attr('y2',20)
    .attr("stroke", "red")
    .attr("stroke-width", '2px')
    .attr("opacity",'0.2')
    .transition()
    .duration(2000)
    .attr('x2',120)
    .attr('y2',120)
    .attr("stroke", "purple")
    .attr("stroke-width", '4px')
    .attr("opacity",'0.7')





