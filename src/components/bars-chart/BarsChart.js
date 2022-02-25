import * as d3 from 'd3';
import React from "react";
import PropTypes from "prop-types";
import './BarsChart.css'

export default function BarsChart({activity}) {
  var newData = activity.map((a, index) => {
    return {
      "day": index + 1,
      "kilogram": a.kilogram,
      "calories": a.calories,
    }
  })

  var margin = {top: 30, right: 30, bottom: 30, left: 50};
  var width = 560;
  var height = 250;
  var barPadding = .2;

  //setup svg wrapper
  var chart = d3.select('.bars-chart')
  
  chart.selectAll(".svg").remove();

  var svg = chart.append("svg")
  .attr("class", "svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x0 = d3.scaleBand().range([width - margin.left - margin.right, 0])
  .paddingInner(barPadding)
  .paddingOuter(barPadding);

  var x1 = d3.scaleBand();

  var y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

  var xAxis = d3.axisBottom(x0)
  .tickSize(0)

  var yAxis = d3.axisRight(y)
  .tickSize(0)
  .ticks(2);

  var line = d3.line()
  .x(function(d) { return x0(d.x); })
  .y(function(d) { return y(d.y); });

  x0.domain(newData.map(d=> d.day));
  x1.domain(['kilogram', 'calories']).range([25 , 0]);
  y.domain([0, d3.max(newData, d => d.kilogram > d.calories ? d.kilogram : d.calories)]);

  var g = svg.selectAll(".bars")
  .data(newData)
  .enter().append("g")
  .attr("class", "bars")
  .attr("transform", d => `translate(${x0(d.day)},0)`)


  var g2 =  g.append("g")
  g2.append("rect")
  .attr("y", "50")
  .attr("x", "15")
  .attr("width", "45px")
  .attr("height", "50px")
  .style('fill',"red")

  g2.append("text")
  .text(d => d.kilogram + 'kg' )
  .attr("class", "bars-text")
  .style('fill',"white")
  .style("font-size", "10px")
  .style("background-color", "red" )
  .attr("dy", "65px")
  .attr("dx", "25px")

  g2.append("text")
  .text(d => d.calories + 'kcal')
  .attr("class", "bars-tex")
  .style('fill',"white")
  .style("font-size", "10px")
  .attr("dy", "90px")
  .attr("dx", "20px")


  /* Add kilogram bars */
  g.selectAll(".bar.kilogram")
  .data(d => [d])
  .enter()
  .append("rect")
  .attr("class", "bar kilogram")
  .style("fill","#282D30")
  .attr("x", d => x1('kilogram'))
  .attr("y", d => y(d.kilogram))
  .attr("width", 5)
  .attr("height", d => {
    return height - margin.top - margin.bottom - y(d.kilogram)
  });

  /* Add calories bars */
  g.selectAll(".bar.calories")
  .data(d => [d])
  .enter()
  .append("rect")
  .attr("class", "bar calories")
  .style("fill","red")
  .attr("x", d => x1('calories'))
  .attr("y", d => y(d.calories))
  .attr("width", 5)
  .attr("height", d => {
    return height - margin.top - margin.bottom - y(d.calories)
  });

  // Add X Axis
  svg.append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0, "+( height - margin.top - margin.bottom) + ")")
  .call(xAxis)

  svg.select(".x-axis").selectAll("text")
  .style("fill","#9B9EAC")
  .style('font-size', '15px')
  .style('font-weight', 'bold')
  .attr("dy", "20px")
  .attr("dx", "-20px");
  
  // Add Y Axis
  svg.append("g")
  .attr("class", "y-axis")
  .attr("transform", "translate("+ ( width - margin.left - margin.right)+ ",0)")
  .call(yAxis);

  svg.select(".y-axis").selectAll("text")
  .style("fill","#9B9EAC")
  .style('font-size', '15px')
  .style('font-weight', 'bold')
  .attr("dy", "20px")

  // Add line
  svg.append("path")
  .data(newData)
  .style("stroke-dasharray", "5 5")
  .attr("class", "line")
  .attr("d", line)
  .call(line);


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