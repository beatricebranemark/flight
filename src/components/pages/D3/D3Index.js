import React, {useState} from 'react'
import BarChart from './BarChart/BarChart'
import Map from './Map/Map'
import store from '../../../reducers'
import NavBar from './NavBar/NavBar'
import {Provider} from 'react-redux'
import HoverBox from './HoverBox/hoverBox'
import SideChart from './SideChart/SideChart'
import TopMenu from '../TopMenu/TopMenu'
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
  const [view, setView] = useState('map')

  const filter = Filter()

  store.subscribe(() => {
    setData(store.getState().getSchools.data)
  })

  const [visible, setVisible] = useBooleanKnob({name: 'visible'})

  let showView = () => {
    if (view === 'map') {
      setView('pie')
    } else {
      setView('map')
    }
  }
  let showSideBar = () => {
    console.log(visible)
    if (visible === false) {
      setVisible(true)
      setArrow('fas fa-angle-left')
    } else {
      setVisible(false)
      setArrow('fas fa-angle-right')
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
            <NavBar props={props} />
            <Sidebar.Pushable id='mainPusher' as={Segment}>
              <Sidebar
                as={Menu}
                animation='push'
                icon='labeled'
                inverted
                vertical
                visible={visible}
                width='wide'
                id='pushaSideBar'
              >
                <h1>Employee Data</h1>

                <SideChart filter={filter}></SideChart>
              </Sidebar>

              <Sidebar.Pusher id='sideBarChart'>
                <span
                  onClick={showSideBar}
                  className='badge badge-success'
                  id='showButton'
                >
                  <i className={arrow}></i>
                </span>
                <Segment basic>
                  <div id='secondViewBarChart'>
                    <BarChart type={'secondView'} filter={filter} />
                  </div>
                  <div id='viewButtons'>
                    <button
                      id='mapViewButton'
                      type='button'
                      className='btn btn-dark'
                    >
                      <i className='fas fa-globe-americas'></i>
                    </button>
                    <button
                      id='pieViewButton'
                      type='button'
                      className='btn btn-dark'
                    >
                      <i className='fas fa-chart-pie'></i>
                    </button>
                  </div>
                  <div id='viewToggleBar'>
                    <Map filter={filter} />
                  </div>
                  <HoverBox />
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </>
          <div>
            <PieChart />
          </div>
        </Provider>
      </React.Fragment>
    )
  }
}

export default withRouter(D3Index)
