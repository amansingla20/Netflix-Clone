import React,{useEffect, useState} from 'react'
import './NavBar.css';

const NavBar = () => {
    const [show, handleshow] = useState(false)

    useEffect(() => {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          handleshow(true)
        } else handleshow(false);
      });
      return () => {
        window.removeEventListener("scroll", null)
      }
    }, []);

    return (
        <div className={`navbar ${show && 'nav-black'}`}>
            <img className= 'nav-logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png" alt="netflix logo" />

            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png" alt="netflix avatar" className='nav-avatar'/>
        </div>
    )
}

export default NavBar
