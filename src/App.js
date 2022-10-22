import React, { Component } from 'react';
import ParentContainer from './homePage/container/ParentContainer';
import LSFinalView from './login-signup/LSFinalView';
import NavBar from './navBar/nav_bar';
class App extends Component {
    constructor(props) {
        super(props);

       this.username=""

    }

    setUserName=(sessID,val)=>{
        console.log("setting")
        return new Promise((s,r)=>{this.username=val
        localStorage.setItem("loggedIn",true)
        localStorage.setItem("sessId",sessID)
        localStorage.setItem("uname",val)
        this.setState({isLoggedIn:true},()=>{s()})
    })
    }



    render()
    {
        return(

            <>
                <NavBar showLogOut={localStorage.getItem("loggedIn")==="true"}/>
                { 
                    localStorage.getItem("loggedIn")==="true"?
                    <ParentContainer username={localStorage.getItem("uname")}/>:
                    <LSFinalView setUserName={this.setUserName}/>
                }
            </>
        )
    }

}

 
export default App;