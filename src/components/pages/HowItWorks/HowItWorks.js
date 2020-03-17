import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import {Card, Icon, Image} from 'semantic-ui-react'
import './HowItWorks.css'
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
            <Card.Header>Select school and organisation </Card.Header>
            <Card.Meta>
              <span className='hw_date'>
                Compare different schools and organisations or go into
                detail with a selected organisation
              </span>
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
            <Card.Header>Discover patterns</Card.Header>
            <Card.Meta>
              <span className='hw_date'>
                To identify the reason for flying, dicover where, when
                and who has been flying
              </span>
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
            <Card.Header>Ask the right questions</Card.Header>
            <Card.Meta>
              <span className='hw_date'>
                When the patterns are established - take action and
                reduce the flights!
              </span>
            </Card.Meta>
          </Card.Content>
        </div>
      </div>
    </div>

    <div id='demoContainer'>
      <h1 id='howitworks'>
        <strong>DEMO</strong>
      </h1>
    </div>

    {/*
            <div className="col-sm-12">
                <h1>How it works</h1>
            </div>
            <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
            </div>
        */}

    <Footer></Footer>
  </React.Fragment>
)

export default HowItWorks
