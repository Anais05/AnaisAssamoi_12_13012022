import * as d3 from "d3";
import React from "react";
import PropTypes from "prop-types";
import "./ScoreChart.css"

export default function ScoreChart({score}) {
  // set chart parameters
  var scorePercent = score * 100;
  var total = 100;
  var progress = 0;
  var width = 250;
  var height = 300;
  var endAngle = Math.PI * -2;

  // setup svg wrapper
  var chart = d3.select(".score-chart")

  // clean duplicate chart
  chart.selectAll(".svg").remove();

  // setup svg
  var svg = chart.append("svg")
  .attr("class", "svg")
  .attr("width", width)
  .attr("height", height)

  // define the circle
  var circle = d3.arc()
  .startAngle(0)
  .innerRadius(90)
  .outerRadius(105)
  .cornerRadius(20);

  // add group container
  var g = svg.append("g")
  .attr("transform","translate(" + width / 2 + "," + height / 2 + ")");

  // setup track
  var track = g.append("g");
  track.append("path")
  .attr("fill", "white")
  .attr("stroke-width", 3 + "px")
  .attr("d", circle.endAngle(endAngle));

  // add colour fill
  var value = track.append("path")
  .attr("class", "radial-path")
  .attr("fill", "red")
  .attr("stroke-width", 3 + "px"); 

  // add text 
  track.append("text")
  .attr("text-anchor", "middle")
  .attr("class", "percent-complete")
  .text(scorePercent + "%")
  .style("fill","#282D30")
  .style("font-size", "26px")
  .style("font-weight", "bold");

  track.append("text")
  .attr("text-anchor", "middle")
  .attr("class", "objectif-text")
  .attr("dy", "25px")
  .text("de votre")
  .style("fill","#74798c")
  .style("font-size", "16px")
  .style("font-weight", "bold");

  track.append("text")
  .attr("text-anchor", "middle")
  .attr("class", "objectif-text")
  .attr("dy", "50px")
  .text("objectif")
  .style("fill","#74798c")
  .style("font-size", "16px")
  .style("font-weight", "bold");

  // add chart title
  svg.append("text")
  .attr("x", 40)             
  .attr("y", 40)
  .attr("text-anchor", "middle")
  .style("fill", "black")
  .style("font-weight", "500")
  .style("font-size", "18px")
  .text("Score");

  // action
  var i = d3.interpolate( progress, scorePercent / total);

  d3.transition().duration(1000).tween("progress", function() {
    return function(t) {
      progress = i(t);
      value.attr("d", circle.endAngle(endAngle * progress))
    };
  });

  return (
    <section className="score">
      <div className="score-chart"></div>
    </section>
  );
}

ScoreChart.prototype = {
  score: PropTypes.number,
}