import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import {Card, Icon, Image} from 'semantic-ui-react'

import TopMenu from '../TopMenu/TopMenu'
import Footer from '../Footer/Footer'
var one = require('./one.png')
var two = require('./two.png')
var three = require('./three.png')

const HowItWorks = props => (
  <React.Fragment>
    <TopMenu props={props}></TopMenu>

    <div id='guideContainer'>
      <h1 id='howitworks'>
        <strong>HOW IT WORKS</strong>
      </h1>
      <div id='aboutContainer'>
        <div className='imageDiv'>
          <img className='responsive' src={one} wrapped ui={false} />
          <Card.Content>
            <Card.Header><strong>Select school and organisation </strong></Card.Header>
            <Card.Meta>
              <p className='hw_date'>
                Compare different schools and organisations or go into
                detail with a selected organisation
              </p>
            </Card.Meta>
          </Card.Content>
        </div>

        <div className='imageDiv'>
          <img
            className='responsive'
            id='image'
            src={two}
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header><strong>Discover patterns</strong></Card.Header>
            <Card.Meta>
              <p className='hw_date'>
                To identify the reason for flying, dicover where, when
                and who has been flying
              </p>
            </Card.Meta>
          </Card.Content>
        </div>

        <div className='imageDiv'>
          <img
            className='responsive'
            src={three}
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header ><strong>Ask the right questions</strong></Card.Header>
            <Card.Meta>
              <p className='hw_date'>
                When the patterns are established - take action and
                reduce the flights!
              </p>
            </Card.Meta>
          </Card.Content>
        </div>
      </div>
    </div>

    <div id='demoContainer'>
      <h1 id='demo'>
        <strong>DEMO</strong>
      </h1>
      <div className="descriptionVideo">
      <p className="demoDescription">
        Watch the video for insights on how this tool can be used. Follow a discovery process looking into how the department "Media Technology and Interaction Design" has been travelling over the past three years.
    </p>

    <iframe width="560" height="315" src="https://www.youtube.com/embed/vYf_7MLFkKw?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    
    </div>

    
           
        

    <Footer></Footer>
  </React.Fragment>
)

export default HowItWorks
