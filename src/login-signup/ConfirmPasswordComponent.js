import React, { Component } from 'react';
import WarningComponent from '../utils/WarningComponent';
class ConfirmPasswordComponenet extends Component {
    constructor(props) {
        super(props);

        this.state={
            message:'passwords do not match',
            show:false
        }
    }

    changeType()
    {
        this.setState((prevState)=>({show:!prevState.show}))
    }

    handleInput=(e)=>{
        this.props.setCnfPassword(e.target.value)
    }
    
    render()
    {
        const inputType=this.state.show?'text':'password'
        const iconType=this.state.show?'fa fa-eye':'fa fa-eye-slash'
        return(
            <>
                <div className='input-group mt-3'>
                    <input 
                        className='form-control shadow-none'
                        type={inputType}
                        value={this.props.cnfPassword}
                        onChange={this.handleInput}
                        style={{borderRightStyle:'hidden'}}
                    />
                    {
                        this.props.cnfPassword?
                        <span className="input-group-text"
                        style={{width:'30px',justifyItems:'center',justifyContent:'center',backgroundColor:'white',borderLeftStyle:'hidden'}}
                        >
                    
                        
                            
                            <center>
                            {
                                this.props.warn?
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
                <div className='text-danger' style={{float:'left'}}>
                    {   
                        this.props.warn?
                        <div className='text-danger'>
                            <WarningComponent message={this.state.message}/>
                        </div>:
                        ''
                    }
                </div>
            </>
        )
    }
}
 
export default ConfirmPasswordComponenet;