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
                axios.post('http://localhost:8080/fetch/test').then((res)=>{res?s(res.data[0].education):s(null)}).catch((res)=>{s(null)})
            })
        }
    }


    async componentDidMount()
    {
        this.props.setRoute("education")
        await this.fetchStateFromDatabase().then((res)=>{
            if(!res)
            return
            console.log(res,"haan ye wala edu")
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

                        <EducationComponent value={item} eduCount={index} key={index}/>
                   
               ))
            }
            {
                    Array(this.state.emptyInput).fill().map((v, i)=> (
                        
                                
                                <EducationComponent key={i} addToArray={this.addToArray}/>
                            
                        
                    ))
            }
           
        </>
    )
   }
   
}
 
export default EducationParent;