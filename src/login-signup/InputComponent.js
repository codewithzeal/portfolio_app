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
            const regex=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
            const bool=regex.test(this.props.username)
            !bool?
            this.props.username==='naman'?
            this.setState({warn:false},()=>{this.state.warn?this.props.setSubmit(true):this.props.setSubmit(false)}):
            this.setState({warn:true,type:'invu'},()=>{
                this.state.warn?this.props.setSubmit(true):this.props.setSubmit(false)
            })

            :this.setState(({warn:true,type:"invt"}),()=>{
                this.state.warn?this.props.setSubmit(true):this.props.setSubmit(false)
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
                <div className='input-group mt-3'>
                    
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
                        style={{borderRightStyle:'hidden'}}
                    />
                    
                    {
                        this.props.username?
                        <span className="input-group-text" style={{width:'30px',justifyItems:'center',justifyContent:'center',backgroundColor:'white'}}>
                        
                            
                            
                            {
                            this.state.warn?
                            <i className="fa fa-times"  aria-hidden="true" style={{color:'red'}}></i>:
                            <i className="fa fa-check"  aria-hidden="true" style={{color:'green'}}></i>
                            
                            }
                            
                        
                        </span>:
                        ''
                    } 
                    <span className="input-group-text" style={{width:'50px',justifyItems:'center',justifyContent:'center'}}>
                        <i className="fa fa-user" aria-hidden="true" ></i>
                    </span>
                
            </div>
                <div className='text-danger' style={{float:'left'}}>
                {
                    this.state.warn?
                    <div className='text-danger' style={{float:'left',fontSize:'2.5vh'}}>
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