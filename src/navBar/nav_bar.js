import './nav_bar.css'
import React from 'react';
import SVG from './SVG';
class NavBar extends React.Component {
    
   
    
    getAPI()
    {
        alert("hello")
        window.location.href='/getAPI'
    }

    render() {


        return(
            <nav className="navbar topNav navbar-expand fixed-top">
                
                    <div className='navbar-brand'>
                        <SVG />
                    </div>
                  

                    <ul className="navbar-nav mr-auto" >
                        <li className='nav-item'>
                        <button className="btn  btn-sm btn-success apibtn" onClick={this.getAPI}>API for recruiters</button>
                        </li>
                    </ul>
                
            </nav>
        );
    }
}

export default NavBar