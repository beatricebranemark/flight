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

  const [mapClass, setMapClass] = useState('mapNotPushed')
  const [barClass, setBarClass] = useState('barNotPushed')
  const [mapButton, setMapButton] = useState('mapViewButton')
  const [pieButton, setPieButton] = useState('pieViewButton')
  const [toggleBar, setToggleBar] = useState('viewToggleBar')

  const filter = Filter()

  store.subscribe(() => {
    setData(store.getState().getSchools.data)
  })

  const [visible, setVisible] = useBooleanKnob({name: 'visible'})

  let showSideBar = () => {
    console.log(visible)
    if (visible === false) {
      setVisible(true)
      setArrow('fas fa-angle-left')
      setMapClass('mapPushed')
      setBarClass('barPushed')
      setMapButton('mapViewButtonPushed')
      setPieButton('pieViewButtonPushed')
      setToggleBar('viewToggleBarPushed')
    } else {
      setVisible(false)
      setArrow('fas fa-angle-right')
      setMapClass('mapNotPushed')
      setBarClass('barNotPushed')
      setMapButton('mapViewButton')
      setPieButton('pieViewButton')
      setToggleBar('viewToggleBar')
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
                visible={visible}
                width='wide'
                id='pushaSideBar'
              >
                <h1>Employee Data</h1>

                <SideChart filter={filter}></SideChart>
              </Sidebar>
              <Sidebar.Pusher id='sideBarChart'>
              <NavBar props={props} />

                <span
                  onClick={showSideBar}
                  className='badge badge-success'
                  id='showButton'
                >
                  <i class={arrow}></i>
                  <span id='showButtonText'>Show employees</span>
                </span>
                <Segment basic>

                  <div className={barClass} id='secondViewBarChart'>
                    <BarChart type={'secondView'} filter={filter} />
                  </div>
                  <div id={toggleBar}>
                    <div id='viewButtons'>
                      <button
                        onClick={() => setView('map')}
                        id={mapButton}
                        type='button'
                        class={
                          view === 'map'
                            ? 'btn btn-dark mapPieActive'
                            : 'btn btn-dark'
                        }
                      >
                        <i class='fas fa-globe-americas'></i>
                      </button>
                      <button
                        onClick={() => setView('pie')}
                        id={pieButton}
                        type='button'
                        class={
                          view === 'pie'
                            ? 'btn btn-dark mapPieActive'
                            : 'btn btn-dark'
                        }
                      >
                        <i class='fas fa-chart-pie'></i>
                      </button>
                    </div>

                    {view === 'map' ? (
                      <Map filter={filter} />
                    ) : (
                      <PieChart id="pieChart" />
                    )}
                  </div>
                  >
                  <HoverBox />
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </>
        </Provider>
      </React.Fragment>
    )
  }
}

export default withRouter(D3Index)
