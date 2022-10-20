import React, { Component } from 'react';
import axios from 'axios';
import WorkExperienceComponent from './WorkExperienceComponent';
class WeParent extends Component {
    constructor(props) {
        super(props);
        this.state={
            weArray:[],
            emptyInput:1
        }
        this.fetchStateFromDatabase=()=>{
            return new Promise((s,r)=>{
                axios.post('http://localhost:8080/fetch/test').then((res)=>{res?s(res.data[0].workExperiences):s(null)}).catch((res)=>{s(null)})
            })
        }
    }

    addInput=()=>{
        this.setState((prevState)=>({emptyInput:prevState.emptyInput+1}))
    }

    addToArray=(val)=>{
        this.setState((prevState)=>({weArray:[...prevState.weArray,val]}))
    }

    async componentDidMount()
    {
        this.props.setRoute("we")
        await this.fetchStateFromDatabase().then((res)=>{
            if(!res)
            return
            console.log(res,"haan ye wala edu")
            this.setState(({weArray:[...res]}))
        })
        return null
    }

    

   render()
   {
    
    return(
        <>
            
            
            {
               this.state.weArray.map((item,index)=>(

                        <WorkExperienceComponent value={item} eduCount={index} key={index}/>
                   
               ))
            }
            {
                    Array(this.state.emptyInput).fill().map((v, i)=> (
                        
                                
                                <WorkExperienceComponent key={i} addToArray={this.addToArray}/>
                            
                        
                    ))
            }
            
        </>
    )
   }
   
}
 
export default WeParent;