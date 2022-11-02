import axios from 'axios';
import React, { Component } from 'react';
import EnhancedInput from '../../utils/InputComponent';
import { validateAge, validateContacts, validateEmail, validateLinkedInUrl, validateName } from './validators';
import '../container/style.css'
import SkillComponent from './SkillComponent';
import AddressComponent from './AddressComponent';
class BasicComponent extends Component {
    constructor(props) {
        super(props);

        this.state={

                fullName:'',
                contact:'',
                linkedInUrl:'',
                gender:'Male',
                email:'',
                shouldSubmit:false,
                buttonValue:"save",
                age:'',
                position:'',
                bio:''
            
        }

        this.errorOccured=false

        this.fetchStateFromDatabase=()=>{
            return new Promise((s,r)=>{
                axios.post('http://localhost:8080/fetch/'+this.props.userID).then((res)=>{res?s(res.data[0].basicDetails):s(null)}).catch((res)=>{s(null)})
            })
        }
    }


    async componentDidMount()
    {
        if(!localStorage.getItem("loggedIn"))
        window.location.reload(false)
        this.props.setRoute("basic")
        
        if(this.props.getHistory().basic!=='')
        this.setState((this.props.getHistory().basic))
        if(this.props.getHistory().basic==='')
        await this.fetchStateFromDatabase().then((res)=>{
            if(!res||res.fullName===null)
            return
           
            res["shouldSubmit"]=false
            res["buttonValue"]="save"
            this.setState((res))
        })
        return null
    }

    getFormStatus=()=>{
       return this.state.fullName&&this.state.email&&this.state.contact&&this.state.gender&&this.state.linkedInUrl&&this.state.age&&this.state.position&&this.state.bio
    }

    setFullName=(val)=>{
        this.setState({fullName:val})
    }

    setEmail=(val)=>{
        this.setState({email:val})
    }

    setGender=(e)=>{
            if(!this.errorOccured&&this.getFormStatus())
            {
                this.setState({shouldSubmit:true})
            }
            this.setState({gender:e.target.value})
    }

    setAge=(val)=>{
        
        this.setState({
            age:val
        },()=>{
            if(!this.errorOccured&&this.getFormStatus())
            this.setState({shouldSubmit:true})
           
        })
    }

    setPosition=(val)=>{

        this.setState({
            position:val
        },()=>{
            if(!this.errorOccured&&this.getFormStatus()&&this.state.position.length!=0)
            this.setState({shouldSubmit:true})
            else
            this.setState({shouldSubmit:false})
        })
    }

    setContact=(val)=>{
        this.setState({contact:val})
    }

    setDescription=(e)=>{
        this.setState({
            bio:e.target.value
        },()=>{
            if(!this.errorOccured&&this.getFormStatus()&&this.state.bio.length!=0)
            this.setState({shouldSubmit:true})
            else
            this.setState({shouldSubmit:false})
        })
    }

    setLinkedInURL=(val)=>{
        this.setState({linkedInUrl:val})
    }

    componentWillUnmount()
    {
        this.props.saveHistory(this.state,"basic")
    }

    setSubmitStatus=(val)=>{
        this.errorOccured=!val
        val=val&&this.getFormStatus()
        this.setState({shouldSubmit:val?true:false})
    }

    updateBasicDetail=()=>{
        this.setState({buttonValue:"updating...",shouldSubmit:false})
        axios.post('http://localhost:8080/update',{
            type:'basic',
            userToUpdate:
            {
                username:this.props.userID,
                basicDetails:this.state
            }
        }).then((res)=>{
            this.setState({buttonValue:"saved",shouldSubmit:false})
        })
    }

   render()
   {
    
    return(
            <>
                <div className=' m-1'  >

                    <h2 style={{marginTop:'32px'}}>Basic Information</h2>
                    <EnhancedInput 
                        classValue="form-control mt-2"
                        value={this.state.fullName}
                        setValue={this.setFullName}
                        validate={validateName}
                        placeHolder="Full Name"
                        messages={["name cannot contain special character"]}
                        setSubmit={this.setSubmitStatus}
                    />
                   
                   <EnhancedInput
                        classValue="form-control mt-2"
                        value={this.state.email}
                        setValue={this.setEmail}
                        validate={validateEmail}
                        placeHolder="E-mail"
                        messages={["not a valid e-mail"]}
                        setSubmit={this.setSubmitStatus}
                    />
                    <EnhancedInput 
                        classValue="form-control mt-2"
                        value={this.state.contact}
                        setValue={this.setContact}
                        validate={validateContacts}
                        placeHolder="Contact"
                        messages={["not a valid mobile number"]}
                        setSubmit={this.setSubmitStatus}
                    />
                    <EnhancedInput 
                        classValue="form-control mt-2"
                        value={this.state.linkedInUrl}
                        setValue={this.setLinkedInURL}
                        validate={validateLinkedInUrl}
                        placeHolder="LinkedInUrl"
                        messages={["enter a valid url"]}
                        setSubmit={this.setSubmitStatus}
                    />
                    <select
                        className='dropdown form-select mt-2'  
                        value={this.state.gender}
                        onChange={this.setGender}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        
                    </select>


                    <div className='input-group'>
                        <EnhancedInput 
                            classValue="form-control mt-2"
                            value={this.state.age}
                            setValue={this.setAge}
                            placeHolder="Age"
                            validate={validateAge}
                            messages={["enter a valid age"]}
                            setSubmit={this.setSubmitStatus}
                        />
                        <EnhancedInput 
                            classValue="form-control mt-2"
                            value={this.state.position}
                            setValue={this.setPosition}
                            placeHolder="current designation"
                        />
                    </div>

                    <textarea 
                        className='form-control mt-2'
                        placeholder='about me'
                        value={this.state.bio}
                        onChange={this.setDescription}
                    >

                    </textarea>

                    <button 
                        onClick={this.updateBasicDetail}
                        className="btn-success btn mt-2 form-control"
                        disabled={!this.state.shouldSubmit}
                        style={{float:'right'}}
                    >
                        {this.state.buttonValue}
                    </button>
                    <hr/>

                </div>
                


                <SkillComponent getHistory={this.props.getHistory} saveHistory={this.props.saveHistory} userID={this.props.userID}/>
                    <br/>
                    <AddressComponent getHistory={this.props.getHistory} saveHistory={this.props.saveHistory} userID={this.props.userID}/>

                    {
                        //useless div to increase height
                    }
                <div style={{height:'400px'}} ></div>

            </>
        ) 
   }
}
 
export default BasicComponent;