Template.chord.rendered = function() {

    var matrix = Papa.parse(this.data.d3Data).data

    d3.select(window).on('resize', createChord); 
    d3.select(window).on('orientationchange', createChord); 

    function createChord() {

    d3.select(".chordViz").selectAll("svg").remove()

    ArrayStringToNumber(matrix, 0, 0);

    var chord = d3.layout.chord()
        .padding(.05)
        .sortSubgroups(d3.descending)
        .matrix(matrix);

    var width = Math.max($(".chordViz").parent().width(), 600),
        height = (width < 600)? width : width * 0.5,
        innerRadius = (width * .41) / 2,
        outerRadius = innerRadius * 1.1;

    var fill = d3.scale.ordinal()
        .domain(d3.range(4))
        .range(["#353433", "#e17000", "#009B74", "#A31A7E"]);

    var svg = d3.select(".chordViz").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + $(".chordViz").parent().width() / 2 + "," + height / 2 + ")");

    svg.append("g").selectAll("path")
        .data(chord.groups)
        .enter().append("path")
        .style("fill", function(d) {
            return fill(d.index);
        })
        .style("stroke", function(d) {
            return fill(d.index);
        })
        .style("fill-opacity", .67)
        .style("stroke", "#000")
        .style("stroke-width", ".5px")
        .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
        .on("mouseover", fade(.1))
        .on("mouseout", fade(1));

    var ticks = svg.append("g").selectAll("g")
        .data(chord.groups)
        .enter().append("g").selectAll("g")
        .data(groupTicks)
        .enter().append("g")
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + outerRadius + ",0)";
        });

    ticks.append("line")
        .attr("x1", 1)
        .attr("y1", 0)
        .attr("x2", 5)
        .attr("y2", 0)
        .style("stroke", "#000");

    ticks.append("text")
        .attr("x", 8)
        .attr("dy", ".35em")
        .attr("transform", function(d) {
            return d.angle > Math.PI ? "rotate(180)translate(-16)" : null;
        })
        .style("text-anchor", function(d) {
            return d.angle > Math.PI ? "end" : null;
        })
        .text(function(d) {
            return d.label;
        });

    svg.append("g")
        .attr("class", "chord")
        .selectAll("path")
        .data(chord.chords)
        .enter().append("path")
        .attr("d", d3.svg.chord().radius(innerRadius))
        .style("fill", function(d) {
            return fill(d.target.index);
        })
        .style("opacity", 1);

    // Returns an array of tick angles and labels, given a group.
    function groupTicks(d) {
        var k = (d.endAngle - d.startAngle) / d.value;
        return d3.range(0, d.value, 1000).map(function(v, i) {
            return {
                angle: v * k + d.startAngle,
                label: i % 5 ? null : v / 1000 + "k"
            };
        });
    }

    // Returns an event handler for fading a given chord group.
    function fade(opacity) {
        return function(g, i) {
            svg.selectAll(".chord path")
                .filter(function(d) {
                    return d.source.index != i && d.target.index != i;
                })
                .transition()
                .style("opacity", opacity);
        };
    }
}
    createChord();

};

function ArrayStringToNumber(arrayVal, startRow, startColumn) {
    for (var i = startRow; i < arrayVal.length; i++) {
        for (var j = startColumn; j < arrayVal[i].length; j++) {
            arrayVal[i][j] = +arrayVal[i][j];
        }
    }
}