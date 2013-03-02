define(["backbone", "d3"], function(Backbone, d3) {

    return Backbone.View.extend({
        id: 'vis',
        initialize: function () {
            this.vis = d3.select(this.el);
            $('#vis-cont').append(this.el);
        },
        getModulePositionX: function(d) {
            return d.get("id") * 100;
        },
        getModulePositionY: function(d) {
            return d.get("id") * 100;
        },
        getName: function(d) {
            return d.get("name")
        },
        render: function() {

            var self = this;
            var w = 960,
                h = 500,
                fill = d3.scale.category10(),
                nodes = self.collection.models;

            var vis = d3.select("body").append("svg:svg")
                .attr("width", w)
                .attr("height", h);

            var force = d3.layout.force()
                .nodes(nodes)
                .links([])

                .gravity(.05)
                .distance(300)
                .charge(-300)
                .size([w, h])
                .start();



            var module = vis.selectAll(".node")
                .data(nodes)
                .enter().append("g")
                .attr("class", "node")
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .attr("r", 150)
                .call(force.drag);


            var test = vis.selectAll(".test")
                .data(nodes)
                .enter().append("svg:circle")
                .attr("class", "node")
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .attr("r", 50)
                .call(force.drag);


            module
                .append("svg:circle")
                .attr("class", "node")
                .attr("r", 50)
                .style("fill", function(d, i) { return fill(i & 3); })
                .style("stroke", function(d, i) { return d3.rgb(fill(i & 3)).darker(2); })
                .style("stroke-width", 1.5);

            module
                .append("text")
                .text(function(d) {return d.get("name");})


            module
                .on("mouseover", function(e) {
                    vis.selectAll("circle")
                        .select(function(d) {
                            return d.index === e.index ? this : null;
                        })
                        .transition()
                        .duration(200)
                        .style("stroke-width", 3);;


                })
                .on("mouseout", function(e) {
                    vis.selectAll("circle")
                        .select(function(d) {
                            return d.index === e.index ? this : null;
                        })
                        .transition()
                        .duration(200)
                        .style("stroke-width", 1.5);
                });

            vis.style("opacity", 1e-6)
                .transition()
                .duration(1000)
                .style("opacity", 1);

            force.on("tick", function(e) {

                module.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

                test.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
//                // Push different nodes in different directions for clustering.
//                var k = 6 * e.alpha;
//                nodes.forEach(function(o, i) {
//                    o.y += i & 1 ? k : -k;
//                    o.x += i & 2 ? k : -k;
//                });
//
//                module.attr("cx", function(d) { return d.x; })
//                    .attr("cy", function(d) { return d.y; });
            });

            d3.select("body").on("click", function() {
                nodes.forEach(function(o, i) {
                    o.x += (Math.random() - .5) * 40;
                    o.y += (Math.random() - .5) * 40;
                });
                force.resume();
            });

        }
    });

});