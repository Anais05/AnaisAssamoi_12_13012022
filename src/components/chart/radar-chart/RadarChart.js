/* eslint-disable no-loop-func */
import * as d3 from "d3";
import { React, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./RadarChart.css"

export default function RadarChart({perf}) {
  // set svg reference and dimensions
  const svgRef = useRef(null);
  const svgWidth = 280;
  const svgHeight = 300;

  useEffect(() => {
    // set new data
    var axes = perf.map(p => {
      return {
        "axis": p.kind[0].toUpperCase() + p.kind.substring(1),
        "value": p.value,
      }
    });
    var newData = [axes];

    // create radial chart
    var RadarChart = {
      /**
       * @description draw radial chart
       * @param {string} select class or id of select div
       * @param {object[]} data user performance data
       * @param {object} config chart configurartion parameters
      */
      draw: function(select, data, config) {
        var cfg = {
          radius: 5,
          w: 180,
          h: 300,
          factor: 1,
          factorLegend: .65,
          levels: 5,
          maxValue: 240,
          radians: 2 * Math.PI,
          TranslateX: 50,
          TranslateY: 50,
          ExtraWidthX: 100,
          ExtraWidthY: 100,
        };
      
        if('undefined' !== typeof config){
          for(var i in config){
            if('undefined' !== typeof config[i]){
              cfg[i] = config[i];
            }
          }
        }
            
        // set axis parameters
        var allAxis = (data[0].map(i => {return i.axis }));
        var total = allAxis.length;
        var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);

        // clean duplicate chart
        d3.select(select).select("svg").remove();
    
        // set svg and group
        var g = d3.select(select)
        .append("svg")
        .attr("width", cfg.w+cfg.ExtraWidthX)
        .attr("height", cfg.h+cfg.ExtraWidthY)
        .attr("class", "bg")
        .append("g")
        .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

        // add circular segments
        for(var s=0; s<cfg.levels; s++){
          var levelFactor = cfg.factor*radius*((s+1)/cfg.levels);
          g.selectAll(".levels")
          .data(allAxis)
          .enter()
          .append("svg:line")
          .attr("x1", function(data, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
          .attr("y1", function(data, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
          .attr("x2", function(data, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
          .attr("y2", function(data, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
          .attr("class", "line")
          .style("stroke", "white")
          .style("stroke-width", "1px")
          .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
        }

        // add axis
        var axis = g.selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");
      
        // add axis title
        axis.append("text")
        .attr("class", "legend")
        .text(function(data){return data})
        .style("font-size", "14px")
        .style("fill", "white")
        .attr("text-anchor", "middle")
        .attr("dy", "25px")
        .attr("transform", function(data, i){return "translate(0, -20)"})
        .attr("x", function(data, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
        .attr("y", function(data, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});
      
        // get performance dataset
        data.forEach(function(y, x){
          let dataValues = [];
          g.selectAll(".nodes")
          .data(y, function(j, i){
            dataValues.push([
            cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
            cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
          ]);
        });

        // add performance area
        g.selectAll(".area")
        .data([dataValues])
        .enter()
        .append("polygon")
        .attr("points",function(d) {
          var str="";
          for(var pti=0;pti<d.length;pti++) {
            str=str+d[pti][0]+","+d[pti][1]+" ";
          }
          return str;
        })
        .style("fill", "#FF0101B2")
        });
      }
    };

    // set chart configuration parameters
    var config = {
      w: 180,
      h: 200,
      maxValue: 240,
      levels: 5,
    }

    // draw chart
    RadarChart.draw(".radar-chart", newData, config);

  },[perf]); // redraw chart if data changes

  return (
    <section className="radar">
        <div className="radar-chart">
          <svg ref={svgRef} width={svgWidth} height={svgHeight} />
        </div>
    </section>
  );
}

RadarChart.prototype = {
  sessions: PropTypes.arrayOf(PropTypes.object),
}