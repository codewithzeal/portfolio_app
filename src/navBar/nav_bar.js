import './nav_bar.css'
import React from 'react';
import SVG from './SVG';
class NavBar extends React.Component {
    

    constructor(props)
    {
        super(props)
        
        this.state={
            id:''
        }
    }
   
    
    
    logOut=()=>{
        localStorage.clear();
        window.location.href="https://myself-portfolio-app.herokuapp.com"
    }

    viewProfile=()=>{
        let id=localStorage.getItem("uid")
        window.location.href="https://myself-portfolio-app.herokuapp.com/view/"+id
    }

    copyLink=()=>{
        navigator.clipboard.writeText("https://myself-portfolio-app.herokuapp.com/view/"+localStorage.getItem("uid"))
        alert("copied to clipboard")
    }

    render() {


        return(

            <>
            <div class="collapse collapse-bar" id="navbarToggleExternalContent" style={{marginTop:'54px'}}>
                <div class="mobile-nav-bg p-4">
                    <button className='btn btn-success w-100' onClick={this.copyLink}>Share link</button>
                    <button className='btn btn-success w-100 mt-2' onClick={this.viewProfile}>View your profile</button>
                    <button className='btn btn-success w-100 mt-2' onClick={this.logOut} >Log out</button>
                </div>
            </div>
            <nav className="navbar topNav navbar-expand fixed-top p-1">
                
                    <div className='navbar-brand'>
                        <SVG />
                    </div>
                    
                   { 
                        this.props.showLogOut?
                        <>
                            <button class="btn btn-danger text-white option-holder-mobile" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" style={{position:'absolute',right:'2%'}}>
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div className='option-holder-desktop'> 
                                <button className='btn btn-success nav-btn' onClick={this.copyLink}>Share link</button>
                                <button className='btn btn-success nav-btn' onClick={this.viewProfile}>View your profile</button>
                                <button className='btn btn-success nav-btn' onClick={this.logOut}>Log out</button>
                            </div>
                        </>:
                        ''
                    }
                
            </nav>
            </>
        );
    }
}

export default NavBar