import * as d3 from "d3";
import React from "react";
import PropTypes from "prop-types";
import "./LineChart.css"

export default function LineChart({sessions}) {
  var weekDays = ["L", "M", "Me", "J", "V", "S", "D"];

  var newData = sessions.map((s, index) => {
    return {
      "day": s.day,
      "sessionLength": s.sessionLength,
    }
  })
  console.log(newData)

  var margin = {top: 10, right: 30, bottom: 30, left: 60};  
  var width = 300;
  var height = 300;

  // setup svg wrapper
  var chart = d3.select(".line-chart")

  // Clean duplicate chart
  chart.selectAll(".svg").remove();

  // add group container
  var svg = chart.append("svg")
  .attr("class", "svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // add scales
  svg.append("text")
  .attr("text-anchor", "left")
  .style("font-size", "14px")
  .attr("dy", "20px")
  .text("Durée moyenne des sessions");


  // add scales
  var x = d3.scaleBand().range([0, width - margin.left - margin.right])
  var y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

  // set Axis
  var xAxis = d3.axisBottom(x)
  .tickSize(0)

  var yAxis = d3.axisLeft(y)
  .ticks(2)
  .tickSize(0)

  x.domain(newData.map(d=> d.day));
  y.domain([0, d3.max(newData, d => d.sessionLength)]);


  // add X Axis
  svg.append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0, "+( height - margin.top - margin.bottom) + ")")
  .call(xAxis)

  // add Y Axis
  svg.append("g")
  .attr("class", "y-axis")
  .attr("transform", "translate(0, 0 )")
  .call(yAxis)

  // add line
  var line = d3.line()
  .x(d => x(d.day))
  .y(d => y(d.sessionLength))
  .curve(d3.curveMonotoneX);

  svg.append("path")
  .datum(newData)
  .attr("class", "line")
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 2)
  .attr("d", line);

  return (
    <section className="line">
      <div className="line-chart"></div>
    </section>
  );
}

LineChart.prototype = {
  sessions: PropTypes.arrayOf(PropTypes.object),
}