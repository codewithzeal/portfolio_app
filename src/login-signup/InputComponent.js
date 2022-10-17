import React, { Component } from 'react';
import WarningComponent from '../utils/WarningComponent';
import axios from 'axios';
class InputComponent extends Component {
    constructor(props) {
        super(props);
       
        this.state={
            warn:false,
            type:'',
            messages:['username cannot have special charatcer',
                      'username must be greater than 4 characters',
                      'user already exists'      
        ]
        }


        

        this.getData=(val)=>{

            console.log('here')
            this.validate().then((isInvalid)=>{
                if(isInvalid)
                return
                else
                {
                    axios.post('http://localhost:8080/verify', {
                        username: val
                      })
                      .then((res)=>{
                        console.log(res)
                            if(res.data==="ok")
                            this.updateWarn(false)
                            else
                            this.updateWarn(true,'invu')
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                }
            })
        }

        this.betterFetch=this.props.deBounce(this.getData.bind(this),300)
    }


    updateWarn=(warnStatus,warnType='invt')=>{

        return new Promise((s,r)=>{

            this.setState({
                warn:warnStatus,
                type:warnType
            },()=>{
                this.state.warn?this.props.setSubmit(true):
                this.props.setSubmit(false)
                s()
            })
        })
       
    }

    inputHandle=(e)=>{
        this.props.setSubmit(true)
        this.setState({warn:false})
       this.props.setUser(e.target.value)

    }

    validate=()=>{
        return new Promise((s,r)=>{
        const regex=/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
        let bool=this.props.username.length<=3
        bool=bool||regex.test(this.props.username)
        bool?this.updateWarn(true).then(()=>{s(bool)}):
        this.updateWarn(false).then(()=>s(bool))
        })
    }

    

    render()
    {
        //const {role,username}=this.props
        
        return(
            <>
                <div className='input-group mt-3'>
                    
                    <input
                        type="text"
                        className='form-control shadow-none'
                        placeholder='username' 
                        value={this.props.username}
                        onKeyUp={()=>{
                            this.props.role==='Signup'?
                            this.betterFetch(this.props.username):
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
                    this.state.warn&&this.props.username?
                    <div className='text-danger' style={{float:'left',fontSize:'2.5vh'}}>
                        {
                            this.state.type==='invt'?
                            <>
                                <p style={{float:'left',fontSize:'2.5vh'}}>
                                    <WarningComponent message={this.state.messages[0]}/>
                                </p>
                                <p style={{float:'left',fontSize:'2.5vh'}}>
                                    <WarningComponent message={this.state.messages[1]}/>
                                </p>
                            </>:
                            <p style={{float:'left',fontSize:'2.5vh'}}>
                                <WarningComponent message={this.state.messages[2]}/>
                            </p>
                        }
                    </div>:
                    ''
                }</div>

            </>
        )
    }

}
 
export default InputComponent;