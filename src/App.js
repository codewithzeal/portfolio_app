import React, { Component } from 'react';
import ParentContainer from './homePage/container/ParentContainer';
import LSFinalView from './login-signup/LSFinalView';
class App extends Component {
    constructor(props) {
        super(props);

       

    }

    setUserName=(val)=>{
        console.log("setting")
        return new Promise((s,r)=>{this.username=val
        localStorage.setItem("loggedIn",true)
        localStorage.setItem("uname",val)
        this.setState({isLoggedIn:true},()=>{s()})
    })
    }

    componentDidMount()
    {
        localStorage.getItem("loggedIn")==="true"?
        this.setState({isLoggedIn:true},()=>{this.username=localStorage.getItem("uname")}):
        this.setState({isLoggedIn:false})
    }


    render()
    {
        return(

            localStorage.getItem("loggedIn")==="true"?
            <ParentContainer username={localStorage.getItem("uname")}/>:
            <LSFinalView setUserName={this.setUserName}/>
        )
    }

}

 
export default App;