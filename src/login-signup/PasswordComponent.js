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
                'password must contain a numeric charater',
                'password should have uppercase character'
            ],
            warn:false,
            show:false
        }

        this.BetterValidate=this.props.deBounce(this.validate,300)
    }

    validate=()=>{
        
        const password=this.props.password
        const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/
        regex.test(password)?this.setState({warn:false},()=>{
            this.state.warn?this.props.setSubmit(true):this.props.setSubmit(false)
        }):this.setState({warn:true},()=>{
            this.state.warn?this.props.setSubmit(true):this.props.setSubmit(false)
        })
    }

    handleInput=(e)=>{
        this.setState({warn:false})
        this.props.setPassword(e.target.value)
    }

    changeType()
    {
        this.setState((prevState)=>({show:!prevState.show}))
    }


    render()
    {
        const inputType=this.state.show?'text':'password'
        const iconType=this.state.show?'fa fa-eye':'fa fa-eye-slash'
        return(<>


        <div className='input-group mt-4'>
            <input 
                type={inputType}
                className='form-control shadow-none'
                placeholder='password'
                value={this.props.password} 
                onKeyUp={()=>this.BetterValidate()}
                onChange={this.handleInput}
                style={{borderRightStyle:'hidden',}}
                
            />
            {
                this.props.password!==''?
                <span className="input-group-text"
                  style={{width:'30px',justifyItems:'center',justifyContent:'center',backgroundColor:'white'}}
                    
                >
                    
                
                    
                    
                        <center>
                        {
                            this.state.warn?
                            <i className="fa fa-times"  aria-hidden="true" style={{color:'red'}}></i>:
                            <i className="fa fa-check"  aria-hidden="true" style={{color:'green'}}></i>
                                
                        }
                        </center>
                    
                    
                
                </span>:
                ''
            }
            <span className="input-group-text"
                  style={{width:'50px',justifyItems:'center',justifyContent:'center',cursor:'pointer'}}
                  onClick={()=>this.changeType()}  
            >
                <center>
                    <i className={iconType} aria-hidden="true" style={{verticalAlign:'middle'}} ></i>
                </center>
            </span>
            
        </div>

        <div className='text-danger' >
            {
                this.state.warn&&this.props.password!==''?
                <>
                    <p style={{float:'left',fontSize:'2.5vh'}}>
                        <WarningComponent message={this.state.messages[0]}/>
                    </p>
                    <p style={{float:'left',fontSize:'2.5vh'}}>
                        <WarningComponent message={this.state.messages[1]}/>
                    </p>
                    <p style={{float:'left',fontSize:'2.5vh'}}>
                        <WarningComponent message={this.state.messages[2]}/>
                    </p>
                </>:
                ''
                
            }
        </div>
        </>)
        
    }
}

export default PasswordComponent