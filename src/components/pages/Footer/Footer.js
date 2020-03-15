import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  
  return (
    <footer
      id='footer'
      className='footer'
    >
        <div className="footer__description">
            <p>The development of this tool was a part of the course Information Visualization DH2321 
            <br/>at KTH Royal Institute of Technology in Stockholm, Sweden. 
            Read more {" "}
            <Link exact to="/about">
                here
            </Link>
            .
            </p> 
        </div>
        {/* 
        <div className="footer__wrapper">
            <Link to="/howitworks" className="footer__item">
                How it works
            </Link>
          <Link to="/about" className="footer__item">
                About
          </Link>
        </div>
        */}
        

    </footer>
  )
}

export default Footer
