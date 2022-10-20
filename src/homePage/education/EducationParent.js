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

    addInput=()=>{
        this.setState((prevState)=>({emptyInput:prevState.emptyInput+1}))
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

    

   render()
   {
    
    return(
        <>
            
            
            {
               this.state.eduArray.map((item,index)=>(
                    <div className='bg-danger container-fluid p-2' key={index} >
                        <EducationComponent value={item}/>
                    </div>
               ))
            }
            {
                    Array(this.state.emptyInput).fill().map((v, i)=> (
                        
                                
                                <EducationComponent key={i}/>
                            
                        
                    ))
            }
            <button className='form-control btn-success btn mt-2'>
                                    <i className='fa fa-plus'></i>
            </button>
        </>
    )
   }
   
}
 
export default EducationParent;