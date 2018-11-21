/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.6 - Band scales
* Band scales pozwalaja nam okreslenie odleglosci miedzy elementami sekcja 3 wyklad 12
* padding outer , padding inner ,step
* padding inner and outer = <od 0 do 1> gdy 0 nie ma przestrzeni miedzy prostokatami
*/
// dodajemy min i max dzieki temu mozemy ustawiac po kolei

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", "400")
    .attr("height", "400");

d3.json("data/buildings.json").then(function(data){
    console.log(data);

    data.forEach(function(d) {
        d.height = +d.height;
    });

    console.log(d3.max(data,(d)=> d.height)); //828
    var x = d3.scaleBand()
        .domain(data.map(d => d.name))//dajemy mapa by tablica byla za nas generowana
        .range([0, 400])
        .paddingInner(0.02)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data,(d)=>d.height)]) //dajemy zamiast 828 wartosc maksymalna z danych
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