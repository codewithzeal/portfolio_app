import React, { Component } from 'react';
import InputComponent from "./InputComponent";
import DebounceInput from "../utils/DebounceInput";
import PasswordComponent from './PasswordComponent';
import ConfirmPasswordComponenet from './ConfirmPasswordComponent';
import axios from 'axios';
//declare child component here beacuse each time render is called new set of
//child component renders and not updates
const DebouncedInput=DebounceInput(InputComponent)
const DebouncedPassword=DebounceInput(PasswordComponent)
const DebouncedCnfPassword=DebounceInput(ConfirmPasswordComponenet)
class LSParent extends Component {
    constructor(props) {
        super(props);
        this.state={
            role:'Signup',
            username:'',
            password:'',
            confirmPassword:'',
            shouldNotSubmit1:true,
            shouldNotSubmit2:true,
        }
    }

    //component given to child to update user name
    setUserName=(userName)=>{
        this.setState(({username:userName}))
    }

    setPassword=(password)=>{
        this.setState(()=>({password:password}))
    }

    setConfirmPassword=(cnfpassword)=>{
        this.setState(()=>({confirmPassword:cnfpassword}))
    }

    setSubmit1=(bool)=>{
        this.setState(()=>({shouldNotSubmit1:bool}))
    }

    setSubmit2=(bool)=>{
        this.setState(()=>({shouldNotSubmit2:bool}))
    }

    setRole=()=>{
        this.setState((prevState)=>({
            role:prevState.role==='Signup'?'Login':'Signup',
            username:'',
            password:'',
            confirmPassword:'',
            shouldNotSubmit1:true,
            shouldNotSubmit2:true
            

        }))
    }

    signup=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:8080/signup',{
            username:this.state.username,
            password:this.state.password
        }).then((res)=>{
            if(res.data==="ok")
            {
                alert("registered successfully")
                this.setState({role:'Login'})
            }
            
        })
    }


    login=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:8080/login',{
            username:this.state.username,
            password:this.state.password
        }).then((res)=>{
            if(res.data==="ok")
            {
               this.props.setUserName(this.state.username).then(()=>{})
                
            }
            else
            {
                alert("invalid credentials")
            }
            
        })
    }

   render()
   {
    
    let shouldNotSubmit3=this.state.role==='Signup'&&this.state.password!==this.state.confirmPassword
    
    const roleInside=this.state.role
    const usernameInside=this.state.username
    //const DebouncedCnfPassword=DebounceInput(CnfpasswordComponent)    
    return(
        
        
            <form className='mt-5'>            
                <DebouncedInput  
                    role={roleInside} 
                    username={usernameInside} 
                    setUser={this.setUserName}
                    setSubmit={this.setSubmit1}
                />
                
                <DebouncedPassword  
                    key="1" password={this.state.password} setPassword={this.setPassword}
                    setSubmit={this.setSubmit2}  
                />

                
                {
                    this.state.role==='Signup'?
                    <DebouncedCnfPassword key="2" 
                    cnfPassword={this.state.confirmPassword} 
                    setCnfPassword={this.setConfirmPassword} 
                    password={this.state.password}
                    warn={this.state.password!==this.state.confirmPassword&&this.state.confirmPassword!==''}
                    setSubmit={this.setSubmit}
                    />:''
                }

                <button 
                    className='form-control shadow-none btn btn-primary mt-3' 
                    disabled={this.state.shouldNotSubmit1||this.state.shouldNotSubmit2||shouldNotSubmit3}
                    onClick={this.state.role==="Signup"?
                        this.signup:
                        this.login
                    }
                >
                    {this.state.role}
                </button>

                <p className="mt-4"
                   style={
                    {
                        float:'right',color:'white',
                        textDecoration:'underline',
                       cursor:'pointer'
                    }}
                    onClick={this.setRole} 
                >
                    
                    {
                        this.state.role==='Signup'?
                        <>Already a user?Login</>:
                        <>New user?Register</>
                    }
                </p>

            </form>

            

        
    )
   }
}

export default LSParent