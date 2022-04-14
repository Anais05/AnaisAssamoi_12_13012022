import * as d3 from "d3";
import { React, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./BarsChart.css"

export default function BarsChart({activity}) {
  // set svg ref and dimensions
  const svgRef = useRef(null);
  const svgWidth = 950;
  const svgHeight = 300;

  useEffect(() => {  
    // set new data for x axis
    var newData = activity.map((a, index) => {
      return {
        "day": index + 1,
        "kilogram": a.kilogram,
        "calories": a.calories,
      }
    });
    // set chart parameters
    var margin = {top: 30, right: 40, bottom: 30, left: 10};
    var width = 950;
    var height = 300;
    var barPadding = .2;
    var rx = 3;
    var ry = 3; 

    // setup svg wrapper
    var chart = d3.select(svgRef.current)

    // clean duplicate chart
    chart.selectAll("*").remove();

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
    .ticks(2)
    .tickSizeInner(-width + margin.left + margin.right);

    // mapping axis with data
    x0.domain(newData.map(d=> d.day));
    x1.domain(["kilogram", "calories"]).range([30 , 0]);
    y.domain([0, d3.max(newData, d => d.kilogram > d.calories ? d.kilogram : d.calories)]);

    // add X Axis
    svg.append("g")
    .attr("class", "bars-x-axis")
    .attr("transform", "translate(0, "+( height - margin.top - margin.bottom) + ")")
    .call(xAxis)

    svg.select(".bars-x-axis").selectAll("text")
    .style("fill","#9B9EAC")
    .style("font-size", "14px")
    .style("font-weight", "800")
    .attr("dy", "20px")
    .attr("dx", "-40px");
    
    // add Y Axis
    svg.append("g")
    .attr("class", "bars-y-axis")
    .attr("transform", "translate("+ ( width - margin.left - margin.right)+ ",0)")
    .call(yAxis);

    svg.select(".bars-y-axis").selectAll("text")
    .style("fill","#9B9EAC")
    .style("font-size", "14px")
    .style("font-weight", "800")
    .attr("dy", "5px")
    .attr("dx", "8px");

    // create and transform bars group
    var g = svg.selectAll(".bars")
    .data(newData)
    .enter().append("g")
    .attr("class", "bars")
    .attr("transform", d => `translate(${x0(d.day)},0)`)

    // add bars info data on hover
    var g2 =  g.append("g")
    .attr("class", "bars-text")
    .attr('fill-opacity', 0)

    g2.append("rect")
    .attr("y", "0")
    .attr("x", "-12")
    .attr("width", "40px")
    .attr("height", height - margin.top - margin.bottom + "px")
    .style("fill","#c4c4c4")

    g2.append("rect")
    .attr("y", "-10")
    .attr("x", "35")
    .attr("width", "45px")
    .attr("height", "50px")
    .style("fill","red")

    g2.append("text")
    .text(d => d.kilogram + "kg" )
    .style("fill","white")
    .style("font-size", "10px")
    .attr("dy", "5px")
    .attr("dx", "47px")

    g2.append("text")
    .text(d => d.calories + "kcal")
    .style("fill","white")
    .style("font-size", "10px")
    .attr("dy", "30px")
    .attr("dx", "40px")

    svg.selectAll('.bars-text')
    .on('mouseover', function() {
      d3.select(this).attr('fill-opacity', 1)
    })
    .on('mouseout', function() {
      d3.select(this).attr('fill-opacity', 0)
    })

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

    // add chart title and text 
    svg.append("text")
    .attr("x", 80)             
    .attr("y", -15)
    .attr("text-anchor", "middle")
    .style("fill", "black")
    .style("font-weight", "500")
    .style("font-size", "18px")
    .text("Activité quotidienne");

    svg.append("circle")
    .attr("fill", "#282D30")
    .attr("r", 4)
    .attr("cx", 675)      
    .attr("cy", -19)

    svg.append("text")
    .attr("class", "middle")
    .attr("x", 720)      
    .attr("y", -15)
    .attr("text-anchor", "middle")
    .style("fill", "#74798C")
    .style("font-weight", "500")
    .style("font-size", "14px")
    .text("Poids (kg)");

    svg.append("circle")
    .attr("fill", "red")
    .attr("r", 4)
    .attr("cx", 785)      
    .attr("cy", -19)

    svg.append("text")
    .attr("class", "middle")
    .attr("x", 870)      
    .attr("y", -15)
    .attr("text-anchor", "middle")
    .style("fill", "#74798C")
    .style("font-weight", "500")
    .style("font-size", "14px")
    .text("Calories brûlées (kCal)");

  },[activity]); // redraw chart if data changes

  return (
    <section className="bars">
      <svg ref={svgRef} width={svgWidth} height={svgHeight}/>    
    </section>
  );
}

BarsChart.prototype = {
  activity: PropTypes.arrayOf(PropTypes.object),
}