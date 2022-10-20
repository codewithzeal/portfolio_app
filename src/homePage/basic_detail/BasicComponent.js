import axios from 'axios';
import React, { Component } from 'react';
import EnhancedInput from '../../utils/InputComponent';
import { validateContacts, validateEmail, validateLinkedInUrl, validateName } from './validators';
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
                buttonValue:"save"
            
        }

        this.errorOccured=false

        this.fetchStateFromDatabase=()=>{
            return new Promise((s,r)=>{
                axios.post('http://localhost:8080/fetch/test').then((res)=>{res?s(res.data[0].basicDetails):s(null)}).catch((res)=>{s(null)})
            })
        }
    }


    async componentDidMount()
    {
        this.props.setRoute("basic")
        console.log(this.props.getHistory().basic,"ye bhi wala") 
        if(this.props.getHistory().basic!=='')
        this.setState((this.props.getHistory().basic))
        if(this.props.getHistory().basic==='')
        await this.fetchStateFromDatabase().then((res)=>{
            if(!res||res.fullName===null)
            return
            console.log(res,"haan ye wala")
            res["shouldSubmit"]=false
            res["buttonValue"]="save"
            this.setState((res))
        })
        return null
    }

    setFullName=(val)=>{
        this.setState({fullName:val})
    }

    setEmail=(val)=>{
        this.setState({email:val})
    }

    setGender=(e)=>{
            if(!this.errorOccured&&this.state.fullName&&this.state.email&&this.state.contact&&this.state.gender&&this.state.linkedInUrl)
            {
                this.setState({shouldSubmit:true})
            }
            this.setState({gender:e.target.value})
    }

    setContact=(val)=>{
        this.setState({contact:val})
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
        val=val&&this.state.fullName&&this.state.email&&this.state.contact&&this.state.gender&&this.state.linkedInUrl
        this.setState({shouldSubmit:val})
    }

    updateBasicDetail=()=>{
        this.setState({buttonValue:"updating...",shouldSubmit:false})
        axios.post('http://localhost:8080/update',{
            type:'basic',
            userToUpdate:
            {
                username:'test',
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
                <div className='form-input-group m-1'>

                    <h2>Basic Information</h2>
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


                <SkillComponent getHistory={this.props.getHistory} saveHistory={this.props.saveHistory} />
                    <br/>
                    <AddressComponent getHistory={this.props.getHistory} saveHistory={this.props.saveHistory} />

                    {
                        //useless div to increase height
                    }
                <div style={{height:'400px'}} ></div>

            </>
        ) 
   }
}
 
export default BasicComponent;