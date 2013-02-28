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
        render: function() {

            var self = this;

            var svg = d3.select(this.el).append("svg");

            svg.attr("width", "400px").attr("height", "200px");

            console.log(self.collection);

            svg.selectAll(".module").data(self.collection.models).enter().append("circle")
                .attr("class", "module")
                .attr("cx", self.getModulePositionX)
                .attr("cy", self.getModulePositionY)
                .attr("r", 80);


            svg.selectAll(".title").data(self.collection.models).enter()
                .append("text")
                .attr("class", "text")
                .text(function(d) {d.get("title")})
                .attr("cx", self.getModulePositionX)
                .attr("cy", self.getModulePositionY)





        }
    });

});