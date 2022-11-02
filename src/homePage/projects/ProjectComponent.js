import React, { Component } from 'react';
import EnhancedInput from '../../utils/InputComponent';
import axios from 'axios';
import { validateLinkedInUrl} from '../basic_detail/validators';
import '../container/style.css'
class ProjectComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:'',
            description:'',
            startDate:'',
            endDate:'',
            url:'',
            warn:false,
            buttonValue:'Save experience',
            validator:true
        }
        
    }
    
    getFormStatus=()=>{
        return this.state.title&&this.state.description&&this.state.startDate&&this.state.endDate&&this.state.url
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

    setTitle=(val)=>{
        this.setState({title:val})
    }

    setDescription=(e)=>{
        let bool= this.getFormStatus()
        if(bool&&this.state.validator)
        this.setState({warn:true})
        this.setState({description:e.target.value})
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

    
    setUrl=(val)=>{
        this.setState({url:val})
    }

    setSubmitStatus=(val)=>{
        if(val)
        this.setState({warn:true,validator:true})
        else
        this.setState({warn:false,validator:false})
    }


    updateProjects=()=>{
        this.setState({buttonValue:'Updating....',warn:true})
        let res={
            title:this.state.title,
            description:this.state.description,
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            url:this.state.url
        }
        if(this.props.value)
        res["idValue"]=this.props.value.idValue
        axios.post('http://localhost:8080/update',{
            type:'projects',
            userToUpdate:{
                username:this.props.userID,
                projects:[res]
            }
        }).then((res)=>{
            if(!this.props.value)
            this.props.addToArray(this.state)
            this.props.value?
            this.setState({buttonValue:'Updated',warn:false}):
            this.setState({
                title:'',
                startDate:'',
                endDate:'',
                description:'',
                url:'',
                buttonValue:'Updated',
                warn:false})
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
                       this.props.eduCount!==undefined?<h2>Project {this.props.eduCount+1}</h2>:
                       <h2>Add Project</h2>
                    }
                <EnhancedInput
                        classValue="form-control"
                        value={this.state.title}
                        setValue={this.setTitle}
                        placeHolder="Title"
                        inputIcons={inputIconsArray}
                        inputIconWidth="50px"
                        setSubmit={this.setSubmitStatus}
                        messages={["enter a valid value"]}
                />

                <textarea className='form-control mt-2' 
                          value={this.state.description}
                          onChange={this.setDescription}
                >

                </textarea>
                
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
                        classValue="form-control"
                        value={this.state.url}
                        setValue={this.setUrl}
                        placeHolder="url"
                        inputIcons={inputIconsArray}
                        inputIconWidth="50px"
                        setSubmit={this.setSubmitStatus}
                        validate={validateLinkedInUrl}
                        messages={["enter a valid value"]}
                />

                <button
                        onClick={this.updateProjects}
                        className="btn-success btn mt-2 form-control"
                        disabled={!(this.state.warn&&this.state.title&&this.state.description&&this.state.startDate&&this.state.endDate&&this.state.url)}
                        style={{float:'right'}}
                >
                    {this.state.buttonValue}
                </button>

                </div>
            </>
        )
    }

}
 
export default ProjectComponent;