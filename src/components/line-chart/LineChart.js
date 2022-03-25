import * as d3 from "d3";
import React from "react";
import PropTypes from "prop-types";
import "./LineChart.css"

export default function LineChart({sessions}) {
  var weekDays = ["L", "M", "M", "J", "V", "S", "D"];

  var newData = sessions.map(s => {
    return {
      "day": s.day,
      "sessionLength": s.sessionLength,
    }
  })
  newData.unshift({"day": 0,"sessionLength": 45,});
  newData.push({"day": 8,"sessionLength": 15,});

  var margin = {top: 50, right: 30, bottom: 30, left: 60};  
  var width = 300 - margin.left - margin.right;
  var height = 350 - margin.top - margin.bottom;


  // setup svg wrapper
  var chart = d3.select(".line-chart")

  // Clean duplicate chart
  chart.selectAll(".svg").remove();

  // add group container
  var svg = chart.append("svg")
  .attr("class", "svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g");

  // add red background
  svg.append("rect")
  .attr("y", "0")
  .attr("x", "0")
  .attr("rx", 10)
  .attr("ry", 10)
  .attr("width", 260)
  .attr("height", height + margin.top)
  .attr("fill", "red")

  // add title
  svg.append("text")
  .attr("x", 110)             
  .attr("y", 50)
  .attr("text-anchor", "middle")
  .style("fill", "white")
  .style("font-weight", "500")
  .style("font-size", "18px")
  .text("Durée moyenne des");

  svg.append("text")
  .attr("x", 62)      
  .attr("y", 80)
  .attr("text-anchor", "middle")
  .style("fill", "white")
  .style("font-weight", "600")
  .style("font-size", "18px")
  .text("sessions");


  // add scales
  var x = d3.scaleBand().range([0, width + margin.left + margin.right])
  var y = d3.scaleLinear().range([height - margin.top - margin.left, 0]);

  // set Axis
  var xAxis = d3.axisBottom(x)
  .tickFormat(function(day) {
    if(day === '0' || day === '8') {
      return '';
    }
    return weekDays[day-1]
  })
  .tickSize(0)

  var yAxis = d3.axisLeft(y)
  .ticks(5)
  .tickSize(1)

  x.domain(newData.map(d=> d.day));
  y.domain([0, d3.max(newData, d => d.sessionLength)]);

  // add Axis
  svg.append("g")
  .attr("class", "line-x-axis")
  .attr("transform", "translate(-20, "+ height + ")")
  .call(xAxis)

  svg.select(".line-x-axis").selectAll("text")
  .style("fill","white")
  .style("font-size", "13px")
  .attr("dy", "20px")

  svg.append("g")
  .attr("class", "line-y-axis")
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
  .attr("stroke", "white")
  .attr("stroke-width", 2)
  .attr("d", line)
  .attr("transform", "translate(0, "+ (width - margin.left) +")");

  // creation tooltip group
  var tooltip = svg.append("g")
  .attr("id", "tooltip")
  .style("display", "none");

  // Le cercle extérieur
  tooltip.append("circle")
  .attr("fill", "#fff")
  .attr("class", "circle-ponter")
  .attr("r", 10)
  .attr("transform", "translate(0, 150)");


  // Le cercle intérieur
  tooltip.append("circle")
  .attr("fill", "#fff")
  .attr("r", 4)
  .attr("transform", "translate(0, 150)");

  tooltip.append("rect")
  .attr("class", "tooltip")
  .attr("width", 50)
  .attr("height", 25)
  .attr("x", 10)
  .attr("y", 52)
  .style("fill", "#fafafa")
  .attr("transform", "translate(-35, 50)");

  var text = tooltip.append("text")
  .style("font-size", "13px")
  .style("color", "black")
  .style("fill", "black")
  .attr("transform", "translate(-10, 120)");

  text.append("tspan")
  .attr("dx", "-8")
  .attr("id", "tooltip-time")

  svg.append("rect")
  .attr("class", "overlay")
  .attr("width", 260)
  .attr("height", height + margin.top)
  .on("mouseover", function() { 
    tooltip.style("display", null);
  })
  .on("mouseout", function() {
    tooltip.style("display", "none");
  })
  .on("mousemove", scalePointPosition);

  function scalePointPosition(event) {
    var xPos = d3.pointer(event)[0];
    var domain = x.domain(); 
    var range = x.range();
    var rangePoints = d3.range(range[0], range[1], x.step())
    var yPos = domain[d3.bisect(rangePoints, xPos) -1];
    var d = newData[yPos];

    tooltip.attr("transform", "translate(" + x(d.day) + "," + y(d.sessionLength) + ")");
    
    d3.select('#tooltip-time')
    .text(d.sessionLength + "min");
  }

  return (
    <section className="line">
      <div className="line-chart"></div>
    </section>
  );
}

LineChart.prototype = {
  sessions: PropTypes.arrayOf(PropTypes.object),
}