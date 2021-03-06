Template.treemap.rendered = function() {

    d3.select(window).on('resize', createTreemap);
    d3.select(window).on('orientationchange', createTreemap);

    var treemapData = this.data;

    function createTreemap() {

        d3.select(".treemapViz").selectAll("div").remove()

    var width = $(".treemapViz").parent().width(),
        height = (width < 600)? width : width * 0.5,
        x = d3.scale.linear().range([0, width]),
        y = d3.scale.linear().range([0, height]),
        color = d3.scale.category20c(),
        root,
        node;

    var treemap = d3.layout.treemap()
        .round(false)
        .size([width, height])
        .sticky(true)
        .value(function(d) {
            return d.size;
        });

    var svg = d3.select(".treemapViz").append("div")
        .attr("class", "chart")
        .style("width", width + "px")
        .style("height", height + "px")
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .append("svg:g")
        .attr("transform", "translate(.5,.5)");

    node = root = JSON.parse(treemapData.d3Data);

    var nodes = treemap.nodes(root)
        .filter(function(d) {
            return !d.children;
        });

    var cell = svg.selectAll("g")
        .data(nodes)
        .enter().append("svg:g")
        .attr("class", "cell")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .on("click", function(d) {
            return zoom(node == d.parent ? root : d.parent);
        });

    cell.append("svg:rect")
        .attr("width", function(d) {
            return d.dx - 1;
        })
        .attr("height", function(d) {
            return d.dy - 1;
        })
        .style("fill", function(d) {
            return color(d.parent.name);
        });

    cell.append("svg:text")
        .attr("x", function(d) {
            return d.dx / 2;
        })
        .attr("y", function(d) {
            return d.dy / 2;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d.name;
        })
        .style("opacity", function(d) {
            d.w = this.getComputedTextLength();
            return d.dx > d.w ? 1 : 0;
        });

    d3.select(window).on("click", function() {
        zoom(root);
    });

    d3.select("select").on("change", function() {
        treemap.value(this.value == "size" ? size : count).nodes(root);
        zoom(node);
    });

    function size(d) {
        return d.size;
    }

    function count(d) {
        return 1;
    }

    function zoom(d) {
        var kx = width / d.dx,
            ky = height / d.dy;
        x.domain([d.x, d.x + d.dx]);
        y.domain([d.y, d.y + d.dy]);

        var t = svg.selectAll("g.cell").transition()
            .duration(d3.event.altKey ? 7500 : 750)
            .attr("transform", function(d) {
                return "translate(" + x(d.x) + "," + y(d.y) + ")";
            });

        t.select("rect")
            .attr("width", function(d) {
                return kx * d.dx - 1;
            })
            .attr("height", function(d) {
                return ky * d.dy - 1;
            });

        t.select("text")
            .attr("x", function(d) {
                return kx * d.dx / 2;
            })
            .attr("y", function(d) {
                return ky * d.dy / 2;
            })
            .style("opacity", function(d) {
                return kx * d.dx > d.w ? 1 : 0;
            });

        node = d;
        d3.event.stopPropagation();
    }
}
createTreemap();
};