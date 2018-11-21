/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.6 - Band scales
* Band scales pozwalaja nam okreslenie odleglosci miedzy elementami sekcja 3 wyklad 12
* padding outer , padding inner ,step
* padding inner and outer = <od 0 do 1> gdy 0 nie ma przestrzeni miedzy prostokatami
*/


var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", "400")
    .attr("height", "400");

d3.json("data/buildings.json").then(function(data){
    console.log(data);

    data.forEach(function(d) {
        d.height = +d.height;
    });

    var x = d3.scaleBand()
        .domain(["Burj Khalifa", "Shanghai Tower", 
            "Abraj Al-Bait Clock Tower", "Ping An Finance Centre", 
            "Lotte World Tower", "One World Trade Center","One","Two",
            "Guangzhou CTF Finance Center"]) //pusty element Guagzu  jest tez liczony tylko nie pokazany bo go niema bez niego wyres jest rowny
        .range([0, 400])
        .paddingInner(0.02)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, 828])
        .range([0, 400]);

    var rects = svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("id",(d,i)=>{
            return "kot";
        })
            .attr("y", 0)
            .attr("x", function(d){
                return x(d.name);
            })
            .attr("width", x.bandwidth) // tutaj jest szerokosc pola ktora jest wyliczana na postwie ilosci elementow
            .attr("height", function(d){
                return y(d.height);
            })
            .attr("fill", function(d) {
                if(d.height>600){
                   return "grey"
                }
                return "red";
            });

})