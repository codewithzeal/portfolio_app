import React, { Component } from 'react';
import InputComponent from "./InputComponent";
import DebounceInput from "../utils/DebounceInput";
import PasswordComponent from './PasswordComponent';
import ConfirmPasswordComponenet from './ConfirmPasswordComponent';
//declare child component here beacuse each time render is called new set of
//child component renders and not updates
const DebouncedInput=DebounceInput(InputComponent)
const DebouncedPassword=DebounceInput(PasswordComponent)
const DebouncedCnfPassword=DebounceInput(ConfirmPasswordComponenet)
class LSParent extends Component {
    constructor(props) {
        super(props);
        this.state={
            role:'signup',
            username:'',
            password:'',
            confirmPassword:'',
            shouldSubmit:''
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

    setShouldSubmit=(bool)=>{
        this.setState(()=>({shouldSubmit:bool}))
    }

    setRole=(role)=>{
        this.setState(()=>({role:role}))
    }

   render()
   {
    
    const roleInside=this.state.role
    const usernameInside=this.state.username
    //const DebouncedCnfPassword=DebounceInput(CnfpasswordComponent)    
    return(
        
        <form>            
            <DebouncedInput  
            role={roleInside} 
            username={usernameInside} 
            setUser={this.setUserName}
            />
            
            <DebouncedPassword  
            key="1" password={this.state.password} setPassword={this.setPassword}
            />

            <DebouncedCnfPassword key="2" 
                cnfPassword={this.state.confirmPassword} 
                setCnfPassword={this.setConfirmPassword} 
                password={this.state.password}
                warn={this.state.password!==this.state.confirmPassword&&this.state.confirmPassword!==''}
            />
        </form>
            
    )
   }
}

export default LSParent