import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './style.css'
class BottomNavbar extends Component {
    constructor(props) {
        super(props);
        this.state={
            borderStyle1:{
                borderRadius:'0px 30px 0px 0px'
            },
            borderStyle2:{
                borderRadius:'30px 0px 0px 0px'
            },
            borderStyle3:{
                borderRadius:'0px 0px 0px 0px'
            },
            activeState:{
                position:'relative',
                top:'25%',
                color:'white',
                fontWeight:'bold',
                fontSize:'13px'
            },
            unActiveState:{
                position:'relative',
                top:'25%',
                color:'black',
                fontWeight:'bold',
                fontSize:'11px'
            }
        }
    }
    getStyle=(routeNumber,val)=>{
        if(routeNumber===val)
            {
                const style={
                    borderRadius:this.state.borderStyle3.borderRadius,
                    color:'white'
                }
                return style
            }
        else if(val+1===routeNumber)
            return this.state.borderStyle1
        else if(val-1===routeNumber)
            return this.state.borderStyle2
        else
            return this.state.borderStyle3
    }
    render()
    {
        const routeValue=this.props.routeValue
        let routeNumber=0
        if(routeValue==="basic")
        routeNumber=1
        else if(routeValue==="education")
        routeNumber=2
        else if(routeValue==="we")
        routeNumber=3
        else if(routeValue==="projects")
        routeNumber=4
        else if(routeValue==="view")
        routeNumber=5

        const activeState=this.state.activeState
        const unActiveState=this.state.unActiveState
        return(
            <>
                <nav className="navbar fixed-bottom navbar-expand mybgclass" style={{height:'8vh',boxShadow:'5px '}} >
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" >
                            <ul className="navbar-nav nav-fill w-100 " style={{fontSize:'12px',position:'absolute',bottom:'0px',width:'100%',left:'0px',height:'8vh'}} >
                                <li className={routeNumber===1?"nav-item mybgclass":"nav-item bg-light"} style={this.getStyle(routeNumber,1)} >
                                    <Link to="basic" className="nav-link" style={routeNumber===1?activeState:unActiveState}>Home</Link>
                                </li>
                                <li className={routeNumber===2?"nav-item mybgclass":"nav-item bg-light"} style={this.getStyle(routeNumber,2)}>
                                    <Link className="nav-link" to='education'style={routeNumber===2?activeState:unActiveState}>Education</Link>
                                </li>
                                <li className={routeNumber===3?"nav-item mybgclass":"nav-item bg-light"} style={this.getStyle(routeNumber,3)}>
                                    <Link className="nav-link" to="we" style={routeNumber===3?activeState:unActiveState}>Experience</Link>
                                </li>
                                <li className={routeNumber===4?"nav-item mybgclass":"nav-item bg-light"} style={this.getStyle(routeNumber,4)}>
                                    <Link className="nav-link" to="projects" style={routeNumber===4?activeState:unActiveState}>Projects</Link>
                                </li>
                                <li className={routeNumber===5?"nav-item mybgclass":"nav-item bg-light"} style={this.getStyle(routeNumber,5)}>
                                    <Link className="nav-link" to="view" style={routeNumber===5?activeState:unActiveState}>View</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                
            <div className=' mybgclass' style={{top:'62px',position:'relative',width:'100%',height:'100vh',overflowX:'auto'}} >
                <div className='container-fluid ml-1 mr-1'>
                    <div className='row' style={{marginBottom:'20vh'}} >
                        <div className='col-sm-3'  >

                        </div>
                        <div className='col-sm-6 mt-4' >
                                <Outlet/>
                        </div>
                        <div className='col-sm-3'>

                        </div>
                    </div>
                </div>
            </div>

            </>
        )
    }

}
 
export default BottomNavbar;