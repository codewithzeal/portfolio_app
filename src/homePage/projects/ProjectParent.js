import React, { Component } from 'react';
import axios from 'axios';
import ProjectComponent from './ProjectComponent';
class ProjectsParent extends Component {
    constructor(props) {
        super(props);
        this.state={
            projectsArray:[],
            emptyInput:1
        }
        this.fetchStateFromDatabase=()=>{
            return new Promise((s,r)=>{
                axios.post('http://localhost:8080/fetch/'+this.props.userID).then((res)=>{res?s(res.data[0].projects):s(null)}).catch((res)=>{s(null)})
            })
        }
    }

    addInput=()=>{
        this.setState((prevState)=>({emptyInput:prevState.emptyInput+1}))
    }

    addToArray=(val)=>{
        this.setState((prevState)=>({projectsArray:[...prevState.projectsArray,val]}))
    }

    async componentDidMount()
    {
        if(!localStorage.getItem("loggedIn"))
        window.location.reload(false)
        this.props.setRoute("projects")
        await this.fetchStateFromDatabase().then((res)=>{
            if(!res)
            return
            
            this.setState(({projectsArray:[...res]}))
        })
        return null
    }

    

   render()
   {
    
    return(
        <>
            
            
            {
               this.state.projectsArray.map((item,index)=>(

                        <ProjectComponent value={item} eduCount={index} key={index} userID={this.props.userID}/>
                   
               ))
            }
            {
                    Array(this.state.emptyInput).fill().map((v, i)=> (
                        
                                
                                <ProjectComponent key={i} addToArray={this.addToArray} userID={this.props.userID}/>
                            
                        
                    ))
            }
            
        </>
    )
   }
   
}
 
export default ProjectsParent;