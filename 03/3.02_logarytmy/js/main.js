/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.2 - Linear scales
*/

//wkres logarytmiczny populacji bierzemy tylko pierwszy rok z pliku json i z niego bierzemy populacje

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", "400")
    .attr("height", "400");

d3.json("data/data.json").then(function (data) {

    // skalowanie osi y (nazwa moze byc inna)
    // naszym inputem sa wartosci dla y z przedzialu 0-828 skalujemy je do obszaru 0-400
    // zmienna y bedzie referencja do funkcji skalujacej
    let scaleY = d3.scaleLog()
        .domain([1, 1000000000])
        .range([0, 400])
        .base(10);

    console.log(scaleY(1));
    console.log(scaleY(414)); //200

  //  console.log(scaleY.invert(48.3)); //np jak chcemy budynyk ktory ma 48.3 pixele to jaka wartosc powninna byc na input
  //  console.log(scaleY.invert(200)); //414


    let height=0;
    const rects = svg.selectAll("rect")
        .data(data[0].countries)
        .enter()
        .append("rect")
        .attr("y", (d)=>{
            return 10;
        })
        .attr("x", function (d, i) {
            return (i * 2);
        })
        .attr("width", 2)
        .attr("height", (d) => {
            if(d.population >0){
                console.log(d);
                return scaleY(d.population);
            }

        })
        .attr("fill", (d) => {
            return "grey";
        });
});



