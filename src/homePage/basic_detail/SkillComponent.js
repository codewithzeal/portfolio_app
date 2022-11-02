import axios from 'axios';
import React, { Component } from 'react';
import EnhancedInput from '../../utils/InputComponent';
class SkillComponent extends Component {
    constructor(props) {
        super(props);

        this.state={
            skillName:'',
            skillLevel:'5',
            skills:[],
            skillsToUpdate:[],
            warn:true,
            buttonValue:"Update Skills"
        }
    }

    setSkillName=(val)=>{
        this.setState({skillName:val})
    }

    handleSkillAdd=()=>{
        
        this.setState((prevState)=>(
            {
                skillsToUpdate:[{
                    skillName:this.state.skillName,
                    skillLevel:this.state.skillLevel
                },...prevState.skillsToUpdate],
                skillName:'',
                skillLevel:'5',
                warn:false,
                buttonValue:'Update skills'
            }
        ))
    }

    setSkillLevel=(e)=>{
        this.setState({skillLevel:e.target.value})
    }

    updateSkills=()=>{
        this.setState({buttonValue:'Updating....',warn:true})
        axios.post('http://localhost:8080/update',{
            type:'skills',
            userToUpdate:{
                username:this.props.userID,
                skills:[
                    ...this.state.skillsToUpdate
                ]
            }
        }).then((res)=>{
           
            this.setState({buttonValue:'Updated',warn:true,skillsToUpdate:[]},()=>{
                axios.post('http://localhost:8080/fetch/'+this.props.userID).then((res)=>{
                    
                    this.setState((prevState)=>({skills:[...res.data[0].skills]}))
                })
            })
        })
    }

    componentDidMount()
    {
        if(this.props.getHistory().skills!=='')
        this.setState((this.props.getHistory().skills))
        else
        axios.post('http://localhost:8080/fetch/'+this.props.userID).then((res)=>{
            
            this.setState((prevState)=>({skills:[...prevState.skills,...res.data[0].skills]}))
        })
    }


    componentWillUnmount()
    {
        this.props.saveHistory(this.state,"skills")
    }

    delFromDatabase=(index,id)=>{
        
        axios.post('http://localhost:8080/update',{
            type:'dellskill',
            userToUpdate:{
                username:this.props.userID,
                skills:[
                    {
                        idValue:id
                    }
                ]
            }
        }).then((res)=>{
                let newArr=[...this.state.skills]
                newArr.splice(index,1)
                this.setState({skills:newArr})
        })
    }

    delFromView=(index)=>{
        let newArr=[...this.state.skillsToUpdate]
        newArr.splice(index,1)
        
        this.setState((prevState)=>({skillsToUpdate:newArr})) 
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
                        value={this.state.skillName}
                        setValue={this.setSkillName}
                        placeHolder="Type skills"
                        inputIcons={inputIconsArray}
                        setSubmit={this.setSubmitStatus}
                        inputIconWidth="50px"
                    />
                    <span className='input-group-text p-0' style={{width:'70px',justifyContent:'center',alignItems:'center'}} 
                            
                    >
                        <select
                            className='dropdown'  
                            value={this.state.skillLevel}
                            onChange={this.setSkillLevel}
                            style={{height:'100%'}}
                        >
                            <option value="5">Level 5</option>
                            <option value="4">Level 4</option>
                            <option value="3">Level 3</option>
                            <option value="2">Level 2</option>
                            <option value="1">Level 1</option>
                        </select> 
                    </span>
                    <span className='input-group-text' style={{width:'50px',justifyContent:'center',alignItems:'center'}} 
                          onClick={this.handleSkillAdd}  
                    >
                        <i className='fa fa-plus'> </i>
                    </span>
                    
                </div>
                
                
                    {
                         
                        this.state.skills.length?
                        <>
                           {this.state.skills.map((item,index)=>(
                                <div className='m-3 bg-success p-2' style={{width:'max-content',display:'block',position:'relative',borderRadius:'5px 5px 5px 5px'}} >
                                <p style={{display:'inline'}} className="skill-unit" key={item.skillName} >{item.skillName}</p>
                                <p style={{display:'inline',color:'white'}}><i className='fa fa-fire'></i>:{item.skillLevel}</p>
                                <p 
                                    onClick={
                                        ()=>{this.delFromDatabase(index,item.idValue)}
                                        }
                                    style={{display:'inline',color:'white',marginLeft:'10px',cursor:'pointer'}}
                                 >
                                    <i  className="fa fa-trash fa-lg"></i>
                                </p>
                                </div>
                           ))}
                        </>:
                        ""
                    }

                    {
                         
                         this.state.skillsToUpdate.length?
                         <>
                            {this.state.skillsToUpdate.map((item,index)=>(
                                <div className='m-3 bg-danger p-2' style={{width:'max-content',display:'block',position:'relative',borderRadius:'5px 5px 5px 5px'}} >
                                <p style={{display:'inline'}} className="skill-unit" key={item.skillName} >{item.skillName}</p>
                                <p style={{display:'inline',color:'white'}}><i className='fa fa-fire'></i>:{item.skillLevel}</p>
                                <p 
                                    onClick={
                                        ()=>{this.delFromView(index)}
                                        }
                                    style={{display:'inline',color:'white',marginLeft:'10px',cursor:'pointer'}}
                                 >
                                    <i  className="fa fa-trash fa-lg"></i>
                                </p>
                                </div>
                            ))}
                         </>:
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