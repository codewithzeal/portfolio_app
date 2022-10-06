import React, { Component } from 'react';
import WarningComponent from '../utils/WarningComponent';
class PasswordComponent extends Component
{
    constructor(props)
    {
        super(props)
        this.state={
            isVisible:false,
            messages:[
                'password must be minimum 8 character',
                'pass word must contain a numeric charater',
                'pssword must have atleast one upperCase letter'
            ],
            warn:false
        }

        this.BetterValidate=this.props.deBounce(this.validate,300)
    }

    validate=()=>{
        const password=this.props.password
        const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/
        regex.test(password)?this.setState({warn:false}):this.setState({warn:true})
    }

    handleInput=(e)=>{
        this.setState({warn:false})
        this.props.setPassword(e.target.value)
    }

    render()
    {
        return(<>
        <input 
            type="password" 
            value={this.props.password} 
            onKeyUp={()=>this.BetterValidate()}
            onChange={this.handleInput}
        />

        {
            this.state.warn&&this.props.password!==''?
            <>
                <WarningComponent message={this.state.messages[0]}/>
                <WarningComponent message={this.state.messages[1]}/>
                <WarningComponent message={this.state.messages[2]}/>
            </>:
            ''
            
        }

        </>)
        
    }
}

export default PasswordComponent