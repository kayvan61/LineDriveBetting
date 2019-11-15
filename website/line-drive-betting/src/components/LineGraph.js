import React from "react";
import * as d3 from "d3";

class LineGraph extends React.Component{
  componentDidMount() {
    var dataToDrawTeam1 = [];
    var dataToDrawTeam2 = [];
    
    for(var i = 0; i < this.props.t1.length; i++) {
      dataToDrawTeam1.push({x: i, y: this.props.t1[i]});
    }
    for(i = 0; i < this.props.t2.length; i++) {
      dataToDrawTeam2.push({x: i, y: this.props.t2[i]});
    }
    var vis = d3.select("#"+this.props.name);
    var WIDTH = 1000;
    var HEIGHT = 500;
    var MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    };
    var xRange = d3.scaleLinear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([
      Math.min(d3.min(dataToDrawTeam1, function (d) {
        return d.x;
      }),
      d3.min(dataToDrawTeam2, function (d) {
        return d.x;
      })),
      Math.max(d3.max(dataToDrawTeam1, function (d) {
        return d.x;
      }),
      d3.max(dataToDrawTeam2, function (d) {
        return d.x;
      }))
    ]);

    var yRange = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([      
      Math.min(d3.min(dataToDrawTeam1, function (d) {
        return d.y;
      }),
      d3.min(dataToDrawTeam2, function (d) {
        return d.y;
      })),
      Math.max(d3.max(dataToDrawTeam1, function (d) {
        return d.y;
      }),
      d3.max(dataToDrawTeam2, function (d) {
        return d.y;
      }))
    ]);

    
    // background
    vis.append("rect")
     .attr("width", 1250)
     .attr("height", "100%")
      .attr("fill", "grey");

    var legend_x = 1250 - 200;
    var legend_y = 50;
    
    var legend = vis.append("g")
        .attr("class", "legend")
        .attr("x", legend_x)
        .attr("y", legend_y)
        .attr("height", 100)
        .attr("width", 125);
    
    legend.append("rect")
      .attr("x", legend_x - 15)
      .attr("y", legend_y - 10)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", "red");
    
    legend.append("text")
      .attr("x", legend_x)
      .attr("y", legend_y)
      .text(this.props.teamTwo);
    
    legend = vis.append("g")
        .attr("class", "legend")
        .attr("x", legend_x)
        .attr("y", legend_y + 25)
        .attr("height", 100)
        .attr("width", 125);
    
    legend.append("rect")
      .attr("x", legend_x - 15)
      .attr("y", legend_y + 25 - 10)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", "blue");
    
    legend.append("text")
      .attr("x", legend_x)
      .attr("y", legend_y + 25)
      .text(this.props.teamOne);
    
    // xAxis
    var xAxis = d3.axisBottom()
      .scale(xRange)
        .tickSize(5);

    // ticks
    xAxis.tickFormat(function(d, i) {
      var dateOfDataPoint = new Date();
      dateOfDataPoint.setDate(dateOfDataPoint.getDate() - dateOfDataPoint.getDay() + Math.floor(i/3));

      var monthInd   = dateOfDataPoint.getMonth();
      var dayOfMonth = dateOfDataPoint.getDate();

      var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
      return mL[monthInd] + " " + dayOfMonth;
      
    });
    
    var yAxis = d3.axisLeft()
      .scale(yRange)
        .tickSize(5);

    vis.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis)
      .selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)" );;

    vis.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (MARGINS.left) + ",0)")
      .call(yAxis);

    var lineFunc = d3.line()
    .x(function (d) {
      return xRange(d.x);
    })
    .y(function (d) {
      return yRange(d.y);
    }) 

   // lines
   vis.append("svg:path")
    .attr("d", lineFunc(dataToDrawTeam1))
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
      .attr("fill", "none");
   vis.append("svg:path")
    .attr('d', lineFunc(dataToDrawTeam2))
    .attr('stroke', 'red')
    .attr('stroke-width', 2)
    .attr('fill', 'none');  
  }

  render() {
    return (<svg id={this.props.name} width="1250" height="600"></svg>);
  }
}

export default LineGraph; 
