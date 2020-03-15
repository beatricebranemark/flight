import React, {useState} from 'react'
import BarChart from './BarChart/BarChart'
import Map from './Map/Map'
import store from '../../../reducers'
import NavBar from './NavBar/NavBar'
import {Provider} from 'react-redux'
import HoverBox from './HoverBox/hoverBox'
import SideChart from './SideChart/SideChart'
import TopMenu from '../TopMenu/TopMenu'
import Footer from '../Footer/Footer'
import Filter from './../../Filter'
import PieChart from './PieChart/PieChart'
import {withRouter} from 'react-router-dom'
import './D3Index.css'

import {useBooleanKnob} from 'retoggle'
import {
  Header,
  Icon,
  Image,
  Button,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import TopTen from './TopTen/TopTen'
import PieMapWrapper from './PieMapWrapper'

const D3Index = props => {
  const [currentSchool, setCurrentSchool] = useState(
    store.getState().getSelectedSchool.data.length > 0
      ? store.getState().getSelectedSchool.data[0].key
      : ''
  )
  const [currentOrg, setCurrentOrg] = useState(
    store.getState().getSelectedOrg.data.length > 0
      ? store.getState().getSelectedOrg.data[0].key
      : ''
  )

  const [data, setData] = useState(store.getState().getSchools.data)
  const [arrow, setArrow] = useState('fas fa-angle-right')
  //const [view, setView] = useState('map')

  const [barClass, setBarClass] = useState('barPushed')
  const [toggleBar, setToggleBar] = useState('viewToggleBarPushed')
  const [showText, setShowText] = useState('Show')
  const [pieText, setPieText] = useState('legendContainerPiePushed')

  const filter = Filter()

  store.subscribe(() => {
    setData(store.getState().getSchools.data)
  })

  const [visible, setVisible] = useBooleanKnob({name: 'visible'})

  let showSideBar = () => {
    if (visible === false) {
      setVisible(true)
      setArrow('fas fa-angle-left')
      setBarClass('barPushed')
      setToggleBar('viewToggleBarPushed')
      setShowText('Hide')
      setPieText('legendContainerPiePushed')
    } else {
      setVisible(false)
      setArrow('fas fa-angle-right')
      setBarClass('barNotPushed')
      setToggleBar('viewToggleBar')
      
      setShowText('Show')
      setPieText('legendContainerPie')
    }
  }

  if (currentOrg.length === 0) {
    props.history.replace('/')
    return null
  } else {
    return (
      <React.Fragment>
        <TopMenu props={props}></TopMenu>

        <Provider store={store}>
          <>
            <Sidebar.Pushable id='mainPusher' as={Segment}>
              <Sidebar
                as={Menu}
                animation='slide in'
                icon='labeled'
                inverted
                vertical
                visible={true}
                width='wide'
                id='pushaSideBar'
              >
                <h1 className="employeeTitle">Who has been flying?</h1>



                <SideChart filter={filter}></SideChart>
              </Sidebar>
              <Sidebar.Pusher id='sideBarChart'>
                <NavBar props={props} />

                {/*<span
                  onClick={showSideBar}
                  className='badge badge-success'
                  id='showButton'
                >
                  <i className={arrow}></i>
                  <span id='showButtonText'>
                    {showText} employees
                  </span>
                </span>*/}
                <Segment basic>
                  <div
                    className={'barPushed'}
                    id='secondViewBarChart'
                  >
                    <BarChart type={'secondView'} filter={filter} />
                  </div>
                  <PieMapWrapper
                    toggleBar={toggleBar}
                    pieText={pieText}
                  />
                  
                  <HoverBox />
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </>
        </Provider>
        <Footer></Footer>
      </React.Fragment>
    )
  }
}

export default withRouter(D3Index)
