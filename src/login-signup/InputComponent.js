import React, { Component } from 'react';
import WarningComponent from '../utils/WarningComponent';
class InputComponent extends Component {
    constructor(props) {
        super(props);
       
        this.state={
            warn:false,
            type:'',
            message1:'invalid character input',
            message2:'user already exits',
        }

        this.fetch=()=>{
            console.log("calling fecth simulation....")
            this.props.username!=='naman'&&this.props.username!==''?
            this.setState({
                warn:true,
                type:'invt'
            }):
            this.setState({
                warn:false,
            })

        }

        this.betterFetch=this.props.deBounce(this.fetch.bind(this),300)
    }

    inputHandle=(e)=>{
        this.setState({warn:false})
       this.props.setUser(e.target.value)

    }

    validate=()=>{

    }

    render()
    {
        const {role,username}=this.props
        
        return(
            <>
                <div className='input-group'>
                    <span className="input-group-text" style={{width:'50px',justifyItems:'center',justifyContent:'center'}}>
                        <i className="fa fa-user" aria-hidden="true" ></i>
                    </span>
                    <input
                        type="text"
                        className='form-control shadow-none'
                        placeholder='username' 
                        value={username}
                        onKeyUp={()=>{
                            role==='signup'?
                            this.betterFetch():
                            this.validate()
                        }}
                        onChange={this.inputHandle}
                        
                    />
                    
                    {
                        this.props.username?
                        <span className="input-group-text" style={{width:'50px',justifyItems:'center',justifyContent:'center',backgroundColor:'white',borderStyle:'hidden'}}>
                        
                            
                            
                            {
                            this.state.warn?
                            <i className="fa fa-times"  aria-hidden="true" style={{color:'red'}}></i>:
                            <i className="fa fa-check"  aria-hidden="true" style={{color:'green'}}></i>
                            
                            }
                            
                        
                        </span>:
                        ''
                    } 
                
            </div>
                <div className='text-danger' style={{float:'left'}}>
                {
                    this.state.warn?
                    <div className='text-danger'>
                        {
                            this.state.type==='invt'?
                            <WarningComponent message={this.state.message1}/>:
                            <WarningComponent message={this.state.message2}/>
                        }
                    </div>:
                    ''
                }</div>

            </>
        )
    }

}
 
export default InputComponent;