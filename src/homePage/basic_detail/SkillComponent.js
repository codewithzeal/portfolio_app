import axios from 'axios';
import React, { Component } from 'react';
import EnhancedInput from '../../utils/InputComponent';
class SkillComponent extends Component {
    constructor(props) {
        super(props);

        this.state={
            skill:'',
            skills:[],
            warn:true,
            buttonValue:"Update Skills"
        }
    }

    setSkill=(val)=>{
        this.setState({skill:val})
    }

    handleSkillAdd=()=>{
        console.log(this.state)
        this.setState((prevState)=>(
            {
                skills:[...prevState.skills,this.state.skill],
                skill:'',
                warn:false,
                buttonValue:'Update skills'
            }
        ))
    }

    updateSkills=()=>{
        this.setState({buttonValue:'Updating....',warn:true})
        axios.post('http://localhost:8080/update',{
            type:'skills',
            userToUpdate:{
                username:'test',
                skills:this.state.skills
            }
        }).then((res)=>{
            this.setState({buttonValue:'Updated',warn:true})
        })
    }

    componentDidMount()
    {
        if(this.props.getHistory().skills!=='')
        this.setState((this.props.getHistory().skills))
        else
        axios.post('http://localhost:8080/fetch/test').then((res)=>{
            this.setState((prevState)=>({skills:[...prevState.skills,...res.data[0].skills]}))
        })
    }


    componentWillUnmount()
    {
        this.props.saveHistory(this.state,"skills")
    }

    

    render()
    {
        let inputIconsArray=[
            <i className="fa fa-plus" aria-hidden="true"></i>
        ]
        return(
            <>
               <div className=' row mt-4'>
               <h2 className='mt-3'>Skills</h2>
               <div className='input-group'>  
                    <EnhancedInput
                        classValue="form-control"
                        value={this.state.skill}
                        setValue={this.setSkill}
                        placeHolder="Type skills"
                        inputIcons={inputIconsArray}
                        setSubmit={this.setSubmitStatus}
                        inputIconWidth="50px"
                    />
                    <span className='input-group-text' style={{width:'50px',justifyContent:'center',alignItems:'center'}} 
                          onClick={this.handleSkillAdd}  
                    >
                        <i className='fa fa-plus'> </i>
                    </span>
                    
                </div>
                
                
                    {
                         
                        this.state.skills.length?
                        <div>
                           {this.state.skills.map((item,index)=>(
                                <p style={{float:"left"}} className="skill-unit" key={index} >{item}</p>
                           ))}
                        </div>:
                        ""
                    }
                
                <button 
                        onClick={this.updateSkills}
                        className="btn-success btn mt-2 form-control"
                        disabled={this.state.warn||this.state.skill}
                        style={{float:'right'}}
                >
                    {this.state.buttonValue}
                </button>
                </div>
            </>
        )
    }
}
 
export default SkillComponent;