import React, { Component } from 'react';
import EnhancedInput from '../../utils/InputComponent';
import axios from 'axios';
import { cgpaValidator,  validateName } from '../basic_detail/validators';
import '../container/style.css'
class EducationComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            stream:'',
            startDate:'',
            endDate:'',
            cgpa:'',
            institute:'',
            warn:false,
            buttonValue:'Save education',
            validator:true
        }
        
    }
    
    getFormStatus=()=>{
        return this.state.stream&&this.state.institute&&this.state.startDate&&this.state.endDate&&this.state.cgpa
    }

    componentDidMount()
    {
        
        if(this.props.value)
        {
            const res=this.props.value
            res["warn"]=false
            res["buttonValue"]="Save education"
            this.setState((res))
        }
    }

    setInstitue=(val)=>{
        this.setState({institute:val})
    }

    setStream=(val)=>{
        this.setState({stream:val})
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

    setCgpa=(val)=>{
        this.setState({cgpa:val})
    }


    setSubmitStatus=(val)=>{
        if(val)
        this.setState({warn:true,validator:true})
        else
        this.setState({warn:false,validator:false})
    }


    updateEducation=()=>{
      
        this.setState({buttonValue:'Updating....',warn:true})
        let res={
            stream:this.state.stream,
            institute:this.state.institute,
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            cgpa:this.state.cgpa
        }
        if(this.props.value)
        res["idValue"]=this.props.value.idValue
        axios.post('https://pbackend2.herokuapp.com/update',{
            type:'edu',
            userToUpdate:{
                username:this.props.userID,
                education:[res]
            }
        }).then((res)=>{
            if(!this.props.value)
            this.props.addToArray(this.state)
            if(this.props.value)
            this.setState({
                buttonValue:'Updated',
                warn:false})
            else
            {
                this.setState({
                    stream:'',
                    startDate:'',
                    endDate:'',
                    cgpa:'',
                    institute:'',
                    buttonValue:'Updated',
                    warn:false})
            }
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
                        this.props.eduCount!==undefined?<h2>Eduction {this.props.eduCount+1}</h2>:
                        <h2>Add education</h2>
                    }
                <EnhancedInput
                        classValue="form-control"
                        value={this.state.institute}
                        setValue={this.setInstitue}
                        placeHolder="Institue"
                        inputIcons={inputIconsArray}
                        inputIconWidth="50px"
                        validate={validateName}
                        setSubmit={this.setSubmitStatus}
                        messages={["enter a valid value"]}
                />

                <EnhancedInput
                        classValue="form-control mt-2"
                        value={this.state.stream}
                        setValue={this.setStream}
                        placeHolder="Stream/Degree"
                        inputIcons={inputIconsArray}
                        inputIconWidth="50px"
                        validate={validateName}
                        setSubmit={this.setSubmitStatus}
                        messages={["special char not allowed"]}
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
                <EnhancedInput
                        classValue="form-control mt-2"
                        value={this.state.cgpa}
                        setValue={this.setCgpa}
                        placeHolder="CGPA VAL/MAX VALUE"
                        inputIcons={inputIconsArray}
                        inputIconWidth="50px"
                        validate={cgpaValidator}
                        setSubmit={this.setSubmitStatus}
                        messages={["CGPA should be of the form val/max-val"]}
                />
                <button
                        onClick={this.updateEducation}
                        className="btn-success btn mt-2 form-control"
                        disabled={!(this.state.warn&&this.state.institute&&this.state.stream&&this.state.startDate&&this.state.endDate&&this.state.cgpa)}
                        style={{float:'right'}}
                >
                    {this.state.buttonValue}
                </button>

                </div>
            </>
        )
    }

}
 
export default EducationComponent;