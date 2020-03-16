import React, {useState} from 'react'
import { withRouter,NavLink, Link  } from "react-router-dom";
import store from '../../../reducers'
import { Card, Icon, Image } from 'semantic-ui-react'
import './About.css'
import TopMenu from '../TopMenu/TopMenu'
import Footer from '../Footer/Footer'
var lovisa = require('./lovisa.png')
var elin = require('./elin.png')
var viktor = require('./viktor.png')
var philip = require('./philip.png')
var bea = require('./bea.png')
var map = require('./map.png')
var plane = require('./plane.jpg')

const About = (props) => {

  const [currentSchool, setCurrentSchool] = useState(
    store.getState().getSelectedSchool.data.length > 0
      ? store.getState().getSelectedSchool.data[0].key
      : ''
  )
  
  
return (
    <React.Fragment>
        
      <TopMenu></TopMenu>
        <div id="headerContainer">
          
            <h1 id="textTitle"><strong>FLIGHT FIGHTERS</strong></h1>
            <p id="text_citat">
            Get to know your flying 
            </p>   
            </div>
        
      <div id= 'descriptionContainer'>
      <h1 id="ourTeam"><strong>ABOUT THE PROJECT</strong></h1>
      <div  id="mapTextContainer">
        <div id="mapTextContainer1">
          <img id='mapImg' src={map}></img>
        </div>
        <div id="mapTextContainer2">
          <p id="img_text"><strong>This project aims to help employees and other stakeholders at KTH to 
            make better decisions regarding their flying habits 
            by using a visualization tool. </strong>
          </p>
          {currentSchool === '' ? <Link exact to="/" className='menuButton'>
          <button  id="greenBtn" className='btn btn-light btn-lg'>Go to visualization</button>

      </Link> :
      <NavLink to="/seeOrg"
        className='menuButton'>
        <button  id="greenBtn" className='btn btn-light btn-lg'>Go to visualization</button>
      </NavLink> }
        </div>
        </div>

      </div>


        <div id="textContainer">
          
            <p id="text">
            At KTH, where 75-80% of its budget goes to research, employees fly a lot. The emissions from flying were 2016 18 090 tonnes of CO2 and 92.5% of these emissions came from travels linked to flights performed within the service. Therefore, KTH has set a goal of reducing their flight emissions with 9% each year and the first step to take is to get to know how KTH flies. 
            </p>
            <p id="text">
            This flight visualization tool is a way for the employees and other stakeholders at KTH to find patterns and trends in their flying. The tool will also help to ask the right questions by presenting: 
            </p>
            <p id="text2">
            <strong>When</strong> the employees have traveled
            </p>
            <p id="text2">
            <strong>Where</strong> they have traveled to
            </p>
            <p id="text2">
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
      <Card.Meta>
        <span className='role'>ansvarsområde</span>
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
      <Card.Meta>
        <span className='role'>ansvarsområde</span>
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
      <Card.Meta>
        <p className='role'>Project Management</p>
        <p className='role'>Concept Design</p>
        <p className='role'>Front end development</p>
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
      <Card.Meta>
        <span className='role'>ansvarsområde</span>
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
      <Card.Meta>
        <span className='role'>ansvarsområde</span>
      </Card.Meta>
    </Card.Content>
    </div>
  
  </div>
  </div>
  <Footer></Footer>
  </React.Fragment>
  
)
}
export default withRouter(About)