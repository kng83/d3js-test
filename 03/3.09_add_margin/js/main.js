/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.6 - Band scales
* Band scales pozwalaja nam okreslenie odleglosci miedzy elementami sekcja 3 wyklad 12
* padding outer , padding inner ,step
* padding inner and outer = <od 0 do 1> gdy 0 nie ma przestrzeni miedzy prostokatami
*/
// dodajemy marigin


let margin = {left: 100, right: 10, top: 10, bottom: 100};

//liczymy nowa wysokosc i szerokosc

let width = 600 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;

let svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right) //bylo 400
    .attr("height", height + margin.bottom + margin.top); //bylo 400

//dodajemy transycje grupowa (albo grupe)
// to bedzie przesuniece
//let g = svg.append('g').attr("transform","translate(" + margin.left + "," + margin.top + ")");
//to moja wersja czytelniejsza
let g = svg.append('g').attr("transform", `translate(${margin.left},${margin.top})`);


d3.json("data/buildings.json").then(function (data) {
    console.log(data);

    data.forEach(function (d) {
        d.height = +d.height;
    });

    console.log(d3.max(data, (d) => d.height)); //828
    let x = d3.scaleBand()
        .domain(data.map(d => d.name))//dajemy mapa by tablica byla za nas generowana
        .range([0, width]) // tu dajemy szerokosc
        .paddingInner(0.2)
        .paddingOuter(0.3);

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.height)]) //dajemy zamiast 828 wartosc maksymalna z danych
        .range([0, height]); // tu dajemy wysokosc

    let rects = g.selectAll("rect") //tu dajemy nasze g zeby bylo w srodku
        .data(data)
        .enter()
        .append("rect")
        .attr("id", (d, i) => {
            return "kot";
        })
        .attr("y", 0)
        .attr("x", (d) => x(d.name))
        .attr("width", x.bandwidth) // tutaj jest szerokosc pola ktora jest wyliczana na postwie ilosci elementow
        .attr("height", d => y(d.height))
        .attr("fill", (d) => {
            if (d.height > 600) {
                return "grey"
            }
            return "red";
        });

});