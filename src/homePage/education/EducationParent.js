import React, { Component } from 'react';
import EducationComponent from './EducationComponent';
import axios from 'axios';
class EducationParent extends Component {
    constructor(props) {
        super(props);
        this.state={
            eduArray:[],
            emptyInput:1
        }
        this.fetchStateFromDatabase=()=>{
            
            return new Promise((s,r)=>{
                axios.post('https://pbackend2.herokuapp.com/fetch/'+this.props.userID).then((res)=>{res?s(res.data[0].education):s(null)}).catch((res)=>{s(null)})
            })
        }
    }


    async componentDidMount()
    {
        if(!localStorage.getItem("loggedIn"))
        window.location.reload(false)
        this.props.setRoute("education")
        await this.fetchStateFromDatabase().then((res)=>{
            if(!res)
            return
            

            this.setState(({eduArray:[...res]}))
        })
        return null
    }

    addToArray=(val)=>{
        this.setState((prevState)=>({eduArray:[...prevState.eduArray,val]}))
    }

   render()
   {
    
    return(
        <>
            
            
            {
               this.state.eduArray.map((item,index)=>(

                        <EducationComponent value={item} eduCount={index} key={index} userID={this.props.userID}/>
                   
               ))
            }
            {
                    Array(this.state.emptyInput).fill().map((v, i)=> (
                        
                                
                                <EducationComponent key={i} addToArray={this.addToArray} userID={this.props.userID}/>
                            
                        
                    ))
            }
           
        </>
    )
   }
   
}
 
export default EducationParent;