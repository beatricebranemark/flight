import React, {useState} from 'react'
import {withRouter, NavLink, Link} from 'react-router-dom'
import store from '../../../reducers'
import {Card, Icon, Image} from 'semantic-ui-react'
import './About.css'
import TopMenu from '../TopMenu/TopMenu'
import Footer from '../Footer/Footer'
var lovisa = require('./lovisa.png')
var elin = require('./elin.png')
var viktor = require('./viktor.png')
var philip = require('./philip.png')
var bea = require('./bea.png')
var map = require('./map.png')
var bar = require('./barchart.png')
var plane = require('./plane.jpg')

const About = props => {
  const [currentSchool, setCurrentSchool] = useState(
    store.getState().getSelectedSchool.data.length > 0
      ? store.getState().getSelectedSchool.data[0].key
      : ''
  )

  return (
    <React.Fragment>
      <TopMenu></TopMenu>
      <div id='headerContainer'>
        <h1 id='textTitle'>
          <strong>FLIGHT FIGHTERS</strong>
        </h1>
        <p id='text_citat'>Get to know your flying</p>
      </div>

      <div id='descriptionContainer'>
        <h1 id='ourTeam'>
          <strong>ABOUT THE PROJECT</strong>
        </h1>
        <div id='mapTextContainer'>
          <div id='mapTextContainer1'>
            <img id='mapImg' src={map}></img>
          </div>
          <div id='mapTextContainer2'>
            <p id='img_text'>
              <strong>
                This project aims to help employees and other
                stakeholders at KTH to make better decisions regarding
                their flying habits by using a visualization tool.{' '}
              </strong>
            </p>
            {currentSchool === '' ? (
              <Link exact to='/' className='menuButton'>
                <button
                  id='greenBtn'
                  className='btn btn-light btn-lg'
                >
                  Go to visualization
                </button>
              </Link>
            ) : (
              <NavLink to='/seeOrg' className='menuButton'>
                <button
                  id='greenBtn'
                  className='btn btn-light btn-lg'
                >
                  Go to visualization
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>

      <div id='textContainer'>
        <div id="barTextContainer">
        <p id='text'>
          At KTH, where 75-80% of its budget goes to research,
          employees fly a lot. The emissions from flying were 18 090
          tonnes of CO2 year 2016 and 92.5% of these emissions came
          from travels linked to flights performed within the service.
          Therefore, KTH has set a goal of reducing their flight
          emissions with 9% each year and the first step to take is to
          get to know how KTH flies.
        </p>

        <img id='barImg' src={bar} width='100%'></img>
            <p id="bartext">All flights by KTH employees between year 2017-2019</p>
        
        </div>
        <div id='detaildes'>
          <p id='text1'>
            This flight visualization tool is a way for the employees
            and other stakeholders at KTH to find patterns and trends
            in their flying. The tool will also help to ask the right
            questions by presenting:
          </p>
          <div id='text2'>
            <ul id='essential'>
                <li>
                <strong>When</strong> the employees have traveled
                </li>
                <li>
                <strong>Where</strong> they have traveled to
                </li>
                <li>
                <strong>Who</strong> has traveled and how much
              </li>
            </ul>
          </div>
        </div>
        <p id='text3'>
          By using this tool, KTH can start analyzing patterns to find
          out the reason for flying - and most importantly - how to
          possibly reduce it and reach the 9% goal.
        </p>
      </div>
      <div id='teamContainer'>
        <h1 id='ourTeam'>
          <strong>OUR TEAM</strong>
        </h1>
        <div id='aboutContainer'>
          <div className='imageDivAbout'>
            <img
              className='responsive'
              src={viktor}
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Viktor Lémon</Card.Header>
              <Card.Meta>
                <span className='a_date'>vlemon@kth.se</span>
              </Card.Meta>
              <Card.Meta>
                <p className='role'>Front end</p>
                <p className='role'>Data modeling</p>
                <p className='role'>Data processing</p>
              </Card.Meta>
            </Card.Content>
          </div>

          <div className='imageDivAbout'>
            <img
              className='responsive'
              id='image'
              src={lovisa}
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Lovisa Forsberg</Card.Header>
              <Card.Meta>
                <span className='a_date'>lovfor@kth.se</span>
              </Card.Meta>
              <Card.Meta>
                <p className='role'>Front end</p>
                <p className='role'>UI/UX</p>
                <p className='role'>Concept Design</p>
              </Card.Meta>
            </Card.Content>
          </div>

          <div className='imageDivAbout'>
            <img
              className='responsive'
              src={elin}
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Elin Forsberg</Card.Header>
              <Card.Meta>
                <span className='a_date'>elinfors@kth.se</span>
              </Card.Meta>
              <Card.Meta>
                <p className='role'>Project Management</p>
                <p className='role'>Front end</p>
                <p className='role'>Concept Design</p>
              </Card.Meta>
            </Card.Content>
          </div>
          <div className='imageDivAbout'>
            <img
              className='responsive'
              id='image'
              src={philip}
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Philip Axelsson</Card.Header>
              <Card.Meta>
                <span className='a_date'>philipax@kth.se</span>
              </Card.Meta>
              <Card.Meta>
                <p className='role'>ansvarsområde</p>
                <p className='role'>ansvarsområde</p>
                <p className='role'>ansvarsområde</p>
              </Card.Meta>
            </Card.Content>
          </div>
          <div className='imageDivAbout'>
            <img
              className='responsive'
              src={bea}
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Beatrice Brånemark</Card.Header>
              <Card.Meta>
                <span className='a_date'>beabra@kth.se</span>
              </Card.Meta>
              <Card.Meta>
                <p className='role'>ansvarsområde</p>
                <p className='role'>ansvarsområde</p>
                <p className='role'>ansvarsområde</p>
              </Card.Meta>
            </Card.Content>
          </div>
        </div>
      </div>
      <div className="processContainer">
      <h1 id='ourTeam'>
          <strong>PROCESS</strong>
        </h1>
        <p id="process">
        This project was implemented as a part of the course Information Visualization at KTH - the Royal Institute of Technology. An agile working method was used throughout the project where an MVP, the minimal viable product was secured. The project proceeded for 7 weeks and at the beginning of the project different responsibilities were distributed among the team members, both to make sure that everyone had responsibilities but also to make sure that we had all the necessary competence in order to be able to proceed. 
</p>
<p id="process">
Our goal with the project was to develop a visualization of how employees at KTH fly, in order to support the founded project FLIGHT at KTH.  For this, we needed to stay in contact with our collaborators throughout the project and understand their needs. 

To be as efficient as possible, the work was distributed among the team members so that we could set things up simultaneously. The concept idea and design were set through iterative and explorative analysis of different visual structures and mappings, and at the same time the code structure was set up and collection- and processing of data was in full swing. This made sure that we quickly could begin implementing the visualization. 

Prototyping of the user interface was conducted alongside the development of the visualization components and UX aspects were considered in all stages of the project. For communication reasons, we sat down and worked a lot together and when it wasn’t possible we made sure to maintain good communication and update each other on what we worked on. 
</p>
<p id="techtext">
<strong>Technologies and tools: </strong>
D3.js, React, Github, JSX, Sass, Figma, Firebase, Python, Google Calendar + Drive and Messenger. The data sources were: KTH flight data and data of airport coordinates. The data was processed through Python scripts and imported through JSON-files.
</p>
<p id="process">

We have through this project gained more insight into how to represent a large amount of data through interactive visualizations - how to design visual structures and mappings. We have also learned how to handle complex datasets and how to select relevant data and process it, in order to get a structure to work with. We also learned how to combine React with the javascript library for visualizations, D3.js, and how to work efficiently with git branches so that we could work on different components simultaneously. 

        </p>
      </div>
      <Footer></Footer>
    </React.Fragment>
  )
}
export default withRouter(About)
