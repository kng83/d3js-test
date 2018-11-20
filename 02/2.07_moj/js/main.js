/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.6 - Selections and data joins
*/

//csv jest tablica obiektow
// d3.csv("data/ages.csv").then((data) => {
//     //console.log(data);
// });

// tu rozwiazany jest tsv (tab separated values)
// d3.tsv("data/ages.tsv").then((data) => {
//   // console.log(data);
// });

//tu rozwiazany jest json
d3.json("data/ages.json").then((data) => {
 //   console.log(data);
    data.forEach(d => d.age = + d.age) //trick zamieniamy an sume

    let svg = d3.select("#chart-area").append("svg")
        .attr("width", 400)
        .attr("height", 400);


//funckcja data tworzy nam tutaj tyle okregow ile jest elementow tablicy nastepnie
// wywolujac funkcje circles.enter() mamy doostetp do kazdego elemntu tablicy i mozemy napodstawie jego rysowac
//kola (.data(data) dziala jak foreach .
    let circles = svg.selectAll("circle")
        .data(data);

    circles.enter()
        .append("circle")
        .attr("x", (d, i) => {
            console.log(d);
            return (i * 50) + 25
        })
        .attr("y", 100)
        .attr("width", 40)
        .attr("height", (d) => 2*d.age)
        .attr("fill", (d)=>{
            if(d.name ==='Jessica'){
                return "#627332"
            }else{
                return "#902044"
            }
        });
}).catch(e =>console.log(e));


