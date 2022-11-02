import axios from 'axios';
import React, { Component } from 'react';

import ParentContainer from './homePage/container/ParentContainer';
import LSandView from './login-signup/LSandView';
import NavBar from './navBar/nav_bar';
class App extends Component {
    constructor(props) {
        super(props);

       this.username=""

    }

    setUserName=(res,val)=>{
        
        return new Promise((s,r)=>{this.username=val
        localStorage.setItem("loggedIn",true)
        localStorage.setItem("sessId",res[0])
        localStorage.setItem("uname",val)
        localStorage.setItem("uid",res[1])
        this.setState({isLoggedIn:true},()=>{s()})
    })
    }

    fetchSessId=(val)=>{
        return new Promise((s,r)=>{
            axios.post('http://localhost:8080/checksession/'+val).then((res)=>{
                s(res.data)
            })
        })
    }

    async componentDidMount()
    {
        if(localStorage.getItem("loggedIn"))
        {
            await this.fetchSessId(localStorage.getItem("uname")).then((res)=>{
                let val=localStorage.getItem("sessId")
                
                if(val!==res){
                    
                    localStorage.clear()
                    window.location.reload(false)
                }
            })
        }
    }


    render()
    {
        return(

            <>
                <NavBar showLogOut={localStorage.getItem("loggedIn")==="true"}/>
               
                    
                    {
                        localStorage.getItem("loggedIn")?
                        <ParentContainer username={localStorage.getItem("uname")} checkSession={this.fetchSessId} />:
                        ''
                    }
                    
                    <LSandView setUserName={this.setUserName}/>
                
            </>
        )
    }

}

 
export default App;