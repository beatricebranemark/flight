import React, {useState} from 'react'
import { withRouter } from "react-router-dom";

import './HowItWorks.css'
import TopMenu from '../TopMenu/TopMenu'
import Footer from '../Footer/Footer'

const HowItWorks = (props) => (
    <React.Fragment>
        <TopMenu props={props}></TopMenu>
            <div className="col-sm-12">
                <h1>How it works</h1>
            </div>
            <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
            </div>
            <Footer></Footer>
  </React.Fragment>
)

export default HowItWorks