import * as d3 from "d3";
import React from "react";
import PropTypes from "prop-types";
import "./BarsChart.css"

export default function BarsChart({activity}) {
  var newData = activity.map((a, index) => {
    return {
      "day": index + 1,
      "kilogram": a.kilogram,
      "calories": a.calories,
    }
  })

  var margin = {top: 30, right: 40, bottom: 30, left: 10};
  var width = 600;
  var height = 250;
  var barPadding = .2;
  var rx = 3;
  var ry = 3; 

  // setup svg wrapper
  var chart = d3.select(".bars-chart")
  
  chart.selectAll(".svg").remove();

  // add group container
  var svg = chart.append("svg")
  .attr("class", "svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // add scales
  var x0 = d3.scaleBand().range([width - margin.left - margin.right, 0])
  .paddingInner(barPadding)
  .paddingOuter(barPadding);

  var x1 = d3.scaleBand();

  var y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

  // set Axis
  var xAxis = d3.axisBottom(x0)
  .tickSize(0)

  var yAxis = d3.axisRight(y)
  .tickSize(0)
  .tickSizeInner(-width + margin.left + margin.right)
  .ticks(2);

  // mapping axis with data
  x0.domain(newData.map(d=> d.day));
  x1.domain(["kilogram", "calories"]).range([25 , 0]);
  y.domain([0, d3.max(newData, d => d.kilogram > d.calories ? d.kilogram : d.calories)]);

  // create and transform bars group
  var g = svg.selectAll(".bars")
  .data(newData)
  .enter().append("g")
  .attr("class", "bars")
  .attr("transform", d => `translate(${x0(d.day)},0)`)

  // add bars info data
  var g2 =  g.append("g")
  .attr("class", "bars-text")

  g2.append("rect")
  .attr("y", "50")
  .attr("x", "15")
  .attr("width", "45px")
  .attr("height", "50px")
  .style("fill","red")

  g2.append("text")
  .text(d => d.kilogram + "kg" )
  .style("fill","white")
  .style("font-size", "10px")
  .style("background-color", "red" )
  .attr("dy", "65px")
  .attr("dx", "25px")

  g2.append("text")
  .text(d => d.calories + "kcal")
  .style("fill","white")
  .style("font-size", "10px")
  .attr("dy", "90px")
  .attr("dx", "20px")

  // add kilogram bars
  g.selectAll(".bar.kilogram")
  .data(d => [d])
  .enter()
  .append("path")
  .attr("class", "bar kilogram")
  .style("fill","#282D30")
  .attr("d", d => `
    M${x1("kilogram")},${y(d.kilogram) + ry}
    a${rx},${ry} 0 0 1 ${rx},${-ry}
    h${5 - 2 * rx}
    a${rx},${ry} 0 0 1 ${rx},${ry}
    v${height  - margin.top - margin.bottom - y(d.kilogram) - ry}
    h${-5}Z
  `);

  // add calories bars 
  g.selectAll(".bar.calories")
  .data(d => [d])
  .enter()
  .append("path")
  .attr("class", "bar calories")
  .style("fill","red")
  .attr("d", d => `
    M${x1("calories")},${y(d.calories) + ry}
    a${rx},${ry} 0 0 1 ${rx},${-ry}
    h${5 - 2 * rx}
    a${rx},${ry} 0 0 1 ${rx},${ry}
    v${height  - margin.top - margin.bottom - y(d.calories) - ry}
    h${-5}Z
  `);

  // Add X Axis
  svg.append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0, "+( height - margin.top - margin.bottom) + ")")
  .call(xAxis)

  svg.select(".x-axis").selectAll("text")
  .style("fill","#9B9EAC")
  .style("font-size", "12px")
  .style("font-weight", "bold")
  .attr("dy", "20px")
  .attr("dx", "-20px");
  
  // Add Y Axis
  svg.append("g")
  .attr("class", "y-axis")
  .attr("transform", "translate("+ ( width - margin.left - margin.right)+ ",0)")
  .call(yAxis);

  svg.select(".y-axis").selectAll("text")
  .style("fill","#9B9EAC")
  .style("font-size", "12px")
  .style("font-weight", "bold")
  .attr("dy", "5px")
  .attr("dx", "15px");

  return (
    <section className="bars">
      <p className="bars-title">Activité quotidienne</p>
      <div className="bars-chart"></div>
    </section>
  );
}

BarsChart.prototype = {
  activity: PropTypes.arrayOf(PropTypes.object),
}