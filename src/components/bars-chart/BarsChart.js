import * as d3 from 'd3';
import React from "react";
import PropTypes from "prop-types";
import './BarsChart.css'

export default function BarsChart({activity}) {
  var newData = activity.map((a, index) => {
    return {
      "day": index+1,
      "kilogram": a.kilogram,
      "calories": a.calories,
    }
  })

  var margin = {top: 30, right: 35, bottom: 30, left: 50};
  var width = 665;
  var height = 300;

  //setup svg wrapper
  var chart = d3.select('.bars-chart')
  
  chart.selectAll(".svg").remove();

  var svg = chart.append("svg")
  .attr("class", "svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x0 = d3.scaleBand().range([0, width - margin.left - margin.right]);

  var x1 = d3.scaleBand();

  var y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

  var xAxis = d3.axisBottom(x0)
  .tickSize(0);

  var yAxis = d3.axisLeft(y)
  .tickSize(0)
  .ticks(3);

  x0.domain(newData.map(d=> d.day));
  x1.domain(['kilogram', 'calories']).range([0, 25]);
  y.domain([0, d3.max(newData, d => d.kilogram > d.calories ? d.kilogram : d.calories)]);

  var g = svg.selectAll(".bars")
  .data(newData)
  .enter().append("g")
  .attr("class", "bars")
  .attr("transform", d => `translate(${x0(d.day)+ margin.right},0)`);

  console.log(x1.bandwidth())


  /* Add field1 bars */
  g.selectAll(".bar.kilogram")
  .data(d => [d])
  .enter()
  .append("rect")
  .attr("class", "bar kilogram")
  .style("fill","blue")
  .attr("x", d => x1('kilogram'))
  .attr("y", d => y(d.kilogram))
  .attr("width", 5)
  .attr("height", d => {
    return height - margin.top - margin.bottom - y(d.kilogram)
  });

  /* Add field2 bars */
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
    
  // Add the X Axis
  svg.append("g")
  .attr("fill","#9B9EAC")
  .attr("class", "x axis")
  .attr("transform", "translate(0, "+( height - margin.top - margin.bottom) + ")")
  .call(xAxis)
  

  // Add the Y Axis
  svg.append("g")
  .attr("fill","white")
  .attr("class", "y axis")
  .attr("fill","transparent")
  .call(yAxis);

  svg.selectAll("text")
  .style("fill","#9B9EAC")
  .style('font-size', '12px')
  .style('font-weight', 'bold')
  .attr("dy", "20px");


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