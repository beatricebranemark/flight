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
const About = () => (

    <React.Fragment>
        <TopMenu></TopMenu>
        <div id="textContainer">
            <h1 id="textTitle">About The Project</h1>
            <p id="text">
            In order to achive the goal of reducing the flighing at KTH with 9%, the first step to take is to get to know your flying.
            The flight-project is a way for the employees and other stakeholders at KTH to find pattern in their flying. The tool will help answer questions of:

When has the employees travels?

Where have they traveld to?

Who has traveld?

By answering theses questions, the stakeholders can start to analyse patterns to find out the reason for the flying - and most importantly - how to reduce it.
            </p>
        </div>
<div id="teamContainer">
<h1 id="ourTeam">Our Team</h1>
<div id="aboutContainer">
  <div className="imageDiv">
    <img src={viktor} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Victor Lémon</Card.Header>
      <Card.Meta>
        <span className='date'>vlemon@kth.se</span>
      </Card.Meta>
      <Card.Description>
          Victor is a wizard 
      </Card.Description>
    </Card.Content>
    </div>
  
    <div className="imageDiv">
    <img id="image" src={lovisa} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Lovisa Forsberg</Card.Header>
      <Card.Meta>
      <span className='date'>lovfor@kth.se</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    </div>
  
    <div className="imageDiv">
    <img src={elin} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Elin Forsberg</Card.Header>
      <Card.Meta>
        <span className='date'>elinfors@kth.se</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    </div>
  <div className="imageDiv">
    <img id="image" src={philip} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Philip Axelsson</Card.Header>
      <Card.Meta>
        <span className='date'>philipax@kth.se</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    </div>
    <div className="imageDiv">
    <img src={bea} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Beatrice Brånemark</Card.Header>
      <Card.Meta>
        <span className='date'>beabra@kth.se</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    </div>
  
  </div>
  </div>
  </React.Fragment>
  
)

export default withRouter(About)