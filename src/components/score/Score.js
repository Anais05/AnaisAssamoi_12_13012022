import * as d3 from 'd3';
import React from "react";
import PropTypes from "prop-types";

export default function Score({score}) {
  var scorePercent = score * 100;
  var total = 100;
  var progress = 0;
  var width = 400;
  var height = 400;
  var endAngle = Math.PI * -2;
  var formatPercent = d3.format(".0%");

  //setup SVG wrapper
  var svg = d3.select(".score-chart").append("svg")
    .attr("width", width)
    .attr("height", height)

  svg.selectAll(".score-chart").remove()
  
  //Define the circle
  var circle = d3.arc()
  .startAngle(0)
  .innerRadius(90)
  .outerRadius(105)
  .cornerRadius(20);

  // Add Group container
  var g = svg.append("g")
    .attr('transform','translate(' + width / 2 + "," + height / 2 + ')');

  // //Setup track
  var track = g.append('g');
  track.append('path')
    .attr('fill', 'white')
    .attr('stroke-width', 3 + 'px')
    .attr('d', circle.endAngle(endAngle));

  //Add colour fill
  var value = track.append('path')
  .attr('class', 'radial-path')
  .attr('fill', 'red')
  .attr('stroke-width', 3 + 'px'); 

  // // Add text 
  track.append("text")
    .attr("text-anchor", "middle")
    .attr("class", "percent-complete")
    .text(scorePercent)
    .style({
        fill: d3.rgb('#282D30'),
        'font-size': '26px',
        'font-weight': 'bold'
     });

  track.append("text2")
    .attr("text-anchor", "middle")
    .attr("class", "objectif-text")
    .attr("dy", "25px")
    .text('de votre objectif')
    .style({
        fill: d3.rgb('#74798c'),
        'font-size': '16px',
        'font-weight': 'bold',
        'margin-top': '15px'
     });

  //Action
  var i = d3.interpolate( progress, scorePercent / total);

  d3.transition().duration(1000).tween("progress", function() {
    return function(t) {
      progress = i(t);
      value.attr("d", circle.endAngle(endAngle * progress))
    };
  });

  return (
    <section className="score">
      <p className="score-title">Score</p>
      <div className="score-chart"></div>
    </section>
  );
}

Score.prototype = {
  score: PropTypes.number,
}