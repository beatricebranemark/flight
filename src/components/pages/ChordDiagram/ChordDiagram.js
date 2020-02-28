import React, {useEffect, useRef, useState} from 'react'
import Model from '../../../data/model'
import {connect} from 'react-redux'
import * as d3 from 'd3'
import "./ChordDiagram.css"
import $ from "jquery"

const ChordDiagram = ({data,filter}) => {
/*
    console.log(data);
    var unique_cities = []

    for(var i = 0;i<data.length();i++){
        var departure = data[i].departure_city.split(",");
        var city = departure[0];
        if(unique_cities.includes(city)){
            unique_cities.push(city);
        }
    }

    console.log(unique_cities);
*/
  

    const d3Container = useRef(null)
    //const airportData = require('../../../../data/airports.json')
    const filteredTravels = []

    var margin = {left:90, top:90, right:90, bottom:90},
    width =  1000 - margin.left - margin.right, // more flexibility: Math.min(window.innerWidth, 1000)
    height =  1000 - margin.top - margin.bottom, // same: Math.min(window.innerWidth, 1000)
    innerRadius = Math.min(width, height) * .39,
    outerRadius = innerRadius * 1.1;

    console.log("chorddiagram");
  
    useEffect(()=>{
    ////////////////////////////////////////////////////////////
    //////////////////////// Set-Up ////////////////////////////
    ////////////////////////////////////////////////////////////


        var names = ["Test1","Test2","AMO-DB","YouTube","Twitter", "Google+", "Pflegeratgeber" ,"O-Mag","RuV"],
        colors = ["#301E1E", "#083E77", "#342350", "#567235", "#8B161C", "#DF7C00"],
        opacityDefault = 0.8;

    /*Computes the chord layout for the specified square matrix of size n×n, 
    where the matrix represents the directed flow amongst a network (a complete digraph) of n nodes. 
    The given matrix must be an array of length n, where each element matrix[i] is an array of n numbers, 
    where each matrix[i][j] represents the flow from the ith node in the network to the jth node. 
    Each number matrix[i][j] must be nonnegative, though it can be zero if there is no flow from node i to node j.
    */
        var matrix = [
        [0,1,1,1,1,1,1,1,1], //Test1
        [0,0,1,1,1,1,1,0,1], //Test2
        [0,1,0,1,1,1,1,1,1], //Hawkeye
        [0,1,1,0,1,1,0,1,1], //The Hulk
        [0,1,1,1,0,1,1,1,1], //Iron Man
        [0,1,1,1,1,0,1,1,1],
        [0,1,1,1,1,1,0,1,1], //Iron Man
        [0,1,1,1,1,1,1,0,1],
        [0,1,1,1,1,1,1,0,0] //Thor //Thor
        ];
        


       /* var mat = [];
        var names = [];
        n=30;
        for (var i = 0;i<n;i++){


        }*/

    ////////////////////////////////////////////////////////////
    /////////// Create scale and layout functions //////////////
    ////////////////////////////////////////////////////////////
    var colors = d3.scaleOrdinal()
    .domain(d3.range(names.length))
    .range(colors);

    var chord = d3.chord()
    .padAngle(.15)
    .sortChords(d3.descending)

    var arc = d3.arc()
    .innerRadius(innerRadius*1.01)
    .outerRadius(outerRadius);

    var path = d3.ribbon()
    .radius(innerRadius);

////////////////////////////////////////////////////////////
  ////////////////////// Create SVG //////////////////////////
  ////////////////////////////////////////////////////////////

  var svg = d3.select(d3Container.current)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (width/2 + margin.left) + "," + (height/2 + margin.top) + ")")
    .datum(chord(matrix));

  ////////////////////////////////////////////////////////////
  ////////////////// Draw outer Arcs /////////////////////////
  ////////////////////////////////////////////////////////////
    
  var outerArcs = svg.selectAll("g")
    .data(function(chords) { return chords.groups; })
    .enter().append("g")
    .attr("class", "group_active")
    .on("click", function(d,i){
        console.log(d3.select(this).attr('class'));
        d3.select(this).attr('class') == 'group_inactive'
          ? d3.select(this).attr('class', 'group_active')
          : d3.select(this).attr('class', 'group_inactive')

        if(d3.select(this).attr('class') == "group_inactive"){
            console.log("tja")
          svg.selectAll("path.chord")
              .filter(function(d) { return d.source.index != i && d.target.index != i; })
          .transition()
              .style("opacity", 0.1);
        }
        else if(d3.select(this).attr('class')=="group_active"){
           
            svg.selectAll("path.chord")
              .filter(function(d) { return d.source.index != i && d.target.index != i; })
          .transition()
              .style("opacity", 0.8);
    };
    })
    


    ////////////////////////////////////////////////////////////
  ////////////////////// Append names ////////////////////////
  ////////////////////////////////////////////////////////////

  //Append the label names INSIDE outside
  outerArcs.append("path")
  .style("fill", function(d) { return colors(d.index); })
  .attr("id", function(d, i) { return "group" + d.index; })
  .attr("d", arc);

 outerArcs.append("text")
         .attr("x", 6)
         .attr("dx", 60)
        .attr("dy", 18)
      .append("textPath")
        .attr("href", function(d) { return "#group" + d.index;})
        .text(function(chords, i){return names[i];})
        .style("fill", "white");

////////////////////////////////////////////////////////////
////////////////// Draw inner chords ///////////////////////
////////////////////////////////////////////////////////////
svg.selectAll("path.chord")
    .data(function(chords) { return chords; })
    .enter().append("path")
    .attr("class", "chord")
    .style("fill", function(d) { return colors(d.source.index); })
    .style("opacity", opacityDefault)
    .attr("d", path);

  ////////////////////////////////////////////////////////////
  ////////////////// Extra Functions /////////////////////////
  ////////////////////////////////////////////////////////////

    function popup() {
        return function(d,i) {
          console.log("love");
        };
      }//popup
    
      //Returns an event handler for fading a given chord group.
      function fade(cla) {
        if(cla == "group_inactive"){
            console.log("tja")
        return function(d,i){
          svg.selectAll("path.chord")
              .filter(function(d) { return d.source.index != i && d.target.index != i; })
          .transition()
              .style("opacity", 0.1);
        }}
        else if(cla=="group_active"){
            return function(d,i){
            svg.selectAll("path.chord")
              .filter(function(d,i) { return d.source.index != i && d.target.index != i; })
          .transition()
              .style("opacity", 0.8);
        
        };
      }
    }//fade
    
        //Highlight hovered over chord
      function mouseoverChord(d,i) {
    
        //Decrease opacity to all
        svg.selectAll("path.chord")
          .transition()
          .style("opacity", 0.1);
        //Show hovered over chord with full opacity
        d3.select(this)
          .transition()
              .style("opacity", 1);
    
        //Define and show the tooltip over the mouse location
        $(this).popover({
          //placement: 'auto top',
          title: 'test',
          placement: 'right',
          container: 'body',
          animation: false,
          offset: "20px -100px",
          followMouse: true,
          trigger: 'click',
          html : true,
          content: function() {
            return "<p style='font-size: 11px; text-align: center;'><span style='font-weight:900'>"  +
                 "</span> text <span style='font-weight:900'>"  +
                 "</span> folgt hier <span style='font-weight:900'>" + "</span> movies </p>"; }
        });
        $(this).popover('show');
      }
      //Bring all chords back to default opacity
      function mouseoutChord(d) {
        //Hide the tooltip
        $('.popover').each(function() {
          $(this).remove();
        })
        //Set opacity back to default for all
        svg.selectAll("path.chord")
          .transition()
          .style("opacity", opacityDefault);
        }      //function mouseoutChord
  
    })
    return <svg width={width} height={height} ref={d3Container}></svg>
}

export default ChordDiagram
