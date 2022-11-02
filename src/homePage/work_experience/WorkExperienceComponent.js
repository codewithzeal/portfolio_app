import React, { Component } from 'react';
import EnhancedInput from '../../utils/InputComponent';
import axios from 'axios';
import { validateName } from '../basic_detail/validators';
import '../container/style.css'
class WorkExperienceComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            organization:'',
            position:'',
            startDate:'',
            endDate:'',
            warn:false,
            buttonValue:'Save experience',
            validator:true
        }
        
    }
    
    getFormStatus=()=>{
        return this.state.organization&&this.state.startDate&&this.state.endDate&&this.state.position
    }

    componentDidMount()
    {
        
        if(this.props.value)
        {
            const res=this.props.value
            res["warn"]=false
            res["buttonValue"]="Save experience"
            this.setState((res))
        }
    }

    setorganization=(val)=>{
        this.setState({organization:val})
    }

    setPosition=(val)=>{
        this.setState({position:val})
    }

    setStartDate=(e)=>{
        let bool= this.getFormStatus()
        if(bool&&this.state.validator)
        this.setState({warn:true})
        this.setState({startDate:e.target.value})
    }

    setEndDate=(e)=>{
        let bool= this.getFormStatus()
        if(bool&&this.state.validator)
        this.setState({warn:true})
        this.setState({endDate:e.target.value})
    }

    


    setSubmitStatus=(val)=>{
        if(val)
        this.setState({warn:true,validator:true})
        else
        this.setState({warn:false,validator:false})
    }


    updateWorkExperience=()=>{
        this.setState({buttonValue:'Updating....',warn:true})
        let res={
            organization:this.state.organization,
            position:this.state.position,
            startDate:this.state.startDate,
            endDate:this.state.endDate,
        }
        if(this.props.value)
        res["idValue"]=this.props.value.idValue
        axios.post('http://localhost:8080/update',{
            type:'we',
            userToUpdate:{
                username:this.props.userID,
                workExperiences:[res]
            }
        }).then((res)=>{
            if(!this.props.value)
            this.props.addToArray(this.state)
            !this.props.value?
            this.setState({
                organization:'',
                startDate:'',
                endDate:'',
                position:'',
                buttonValue:'Updated',
                warn:false}):
                this.setState({warn:false,buttonValue:'Updated'})
        })
    }

    render()
    {
        const inputIconsArray=[]
        return(
            <>
                <div className='row m-2 p-4 mt-4  eduUnit'
                     style={{borderRadius:'10px 10px 10px 10px'}}
                >
                    {
                       this.props.eduCount!==undefined?<h2>Experience {this.props.eduCount+1}</h2>:
                       <h2>Add Experience</h2>
                    }
                <EnhancedInput
                        classValue="form-control"
                        value={this.state.organization}
                        setValue={this.setorganization}
                        placeHolder="organization"
                        inputIcons={inputIconsArray}
                        inputIconWidth="50px"
                        validate={validateName}
                        setSubmit={this.setSubmitStatus}
                        messages={["enter a valid value"]}
                />

                <EnhancedInput
                        classValue="form-control mt-2"
                        value={this.state.position}
                        setValue={this.setPosition}
                        placeHolder="Postion"
                        inputIcons={inputIconsArray}
                        inputIconWidth="50px"
                        validate={validateName}
                        setSubmit={this.setSubmitStatus}
                        messages={["enter a valid value"]}
                />
                
                <div className='mt-2'>
                    <div className='w-100' style={{position:'relative',left:'-10px'}} >
                        <label htmlFor="start" style={{color:'white'}} >Start Date: {this.state.startDate}</label>
                        <input   type="date" id="start" onChange={this.setStartDate} style={{width:'24px',position:'relative',float:'right',marginRight:'5vw'}} />
                    </div>
                    <div className='w-100 mt-2' style={{position:'relative',left:'-10px'}} >
                        <label htmlFor="end" style={{color:'white'}}>End Date: {this.state.endDate}</label>
                        <input type="date" id="end"onChange={this.setEndDate} style={{width:'24px',position:'relative',float:'right',marginRight:'5vw'}}/>
                    </div>
                </div>
                
                <button
                        onClick={this.updateWorkExperience}
                        className="btn-success btn mt-2 form-control"
                        disabled={!(this.state.warn&&this.state.organization&&this.state.position&&this.state.startDate&&this.state.endDate)}
                        style={{float:'right'}}
                >
                    {this.state.buttonValue}
                </button>

                </div>
            </>
        )
    }

}
 
export default WorkExperienceComponent;