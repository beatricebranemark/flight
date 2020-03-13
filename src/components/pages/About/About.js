import React, {useState} from 'react'
import { withRouter } from "react-router-dom";

import { Card, Icon, Image } from 'semantic-ui-react'
import './About.css'
import TopMenu from '../TopMenu/TopMenu'
var lovisa = require('./lovisa.png')
var elin = require('./elin.png')
var viktor = require('./viktor.png')
var philip = require('./philip.png')
var bea = require('./bea.png')
var bubbles = require('./bubbles.gif')
const About = () => (

    <React.Fragment>
        <TopMenu></TopMenu>

        <div id="headerContainer">
            <h1 id="textTitle"><strong>A FLIGHT VISUALIZATION TOOL</strong></h1>
            <p id="text_citat">
            “In this project, we will create and test practical tools to reduce travel-related CO2 emissions, thereby moving from words to action.” 
            <p id="text_italic">
            - Energimyndigheten ansökan, Daniel Pargman
            </p>
            <p id="text_italic"> 
              <a href="https://www.kth.se/sv/mid/research/sustainability/projects/flight-1.920661" target="_blank" >Read more about the project here</a>
            </p>
            </p>   
            </div>
        <div id="textContainer">
          
            <p id="text">
            At KTH, where 75-80% of its budget goes to research, employees fly a lot. The emissions from flying were 2016 18 090 tonnes of CO2 and 92.5% of these emissions came from travels linked to flights performed within the service. Therefore, KTH has set a goal of reducing their flight emissions with 9% each year and the first step to take is to get to know how KTH flies. 
            </p>
            <p id="text">
            This flight visualization tool is a way for the employees and other stakeholders at KTH to find patterns and trends in their flying. The tool will also help to ask the right questions by presenting: 
            </p>
            <p id="text">
            <strong>When</strong> the employees have traveled
            </p>
            <p id="text">
            <strong>Where</strong> they have traveled to
            </p>
            <p id="text">
            <strong>Who</strong> has traveled and how much
            </p>
            <p id="text">
            By using this tool, KTH can start analyzing patterns to find out the reason for flying - and most importantly - how to possibly reduce it and reach the 9% goal. 
            </p>
        </div>
<div id="teamContainer">
<h1 id="ourTeam"><strong>OUR TEAM</strong></h1>
<div id="aboutContainer">
  <div className="imageDiv">
    <img className="responsive" src={viktor} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Viktor Lémon</Card.Header>
      <Card.Meta>
        <span className='date'>vlemon@kth.se</span>
      </Card.Meta>
    </Card.Content>
    </div>
  
    <div className="imageDiv">
    <img className="responsive" id="image" src={lovisa} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Lovisa Forsberg</Card.Header>
      <Card.Meta>
      <span className='date'>lovfor@kth.se</span>
      </Card.Meta>
    </Card.Content>
    </div>
  
    <div className="imageDiv">
    <img className="responsive" src={elin} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Elin Forsberg</Card.Header>
      <Card.Meta>
        <span className='date'>elinfors@kth.se</span>
      </Card.Meta>
    </Card.Content>
    </div>
  <div className="imageDiv">
    <img className="responsive" id="image" src={philip} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Philip Axelsson</Card.Header>
      <Card.Meta>
        <span className='date'>philipax@kth.se</span>
      </Card.Meta>
    </Card.Content>
    </div>
    <div className="imageDiv">
    <img className="responsive" src={bea} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Beatrice Brånemark</Card.Header>
      <Card.Meta>
        <span className='date'>beabra@kth.se</span>
      </Card.Meta>
    </Card.Content>
    </div>
  
  </div>
  </div>
  </React.Fragment>
  
)

export default withRouter(About)