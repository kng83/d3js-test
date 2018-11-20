

//Robimy tu wykres bundynkow pokolei jak sa wczytywane i pokazujemy je nawykresie prostokatow

//tu rozwiazany jest json
d3.json("data/buildings.json").then((data) => {
    //   console.log(data);
    data.forEach(d => d.height = + d.height) //trick zamieniamy an sume

    let svg = d3.select("#chart-area").append("svg")
        .attr("width", 400)
        .attr("height", 400);

    let rects = svg.selectAll("rect")
        .data(data);

    // warto zaznaczyc ze za pomoca callbac mamy zawsze dostep do naszych danych
    // enter dziala troche jak foreach . Ponizesze istrukcje sa wykonywane dla kazdego append
    rects.enter()
        .append("rect") //dolacz prostokat
        .attr("x", (d, i) => {
            console.log(d);
            return (i * 50) + 20 // to 50 to przesuniecie miedzy kolejnymi elementami nie powinna byc miniejsze od width
        })
        .attr("y", 20)
        .attr("width",40)
        .attr("height", (d) => d.height)
        .attr("fill", (d)=>{
                return "#902044"
            })
        })
        .catch(e =>console.log(e));


