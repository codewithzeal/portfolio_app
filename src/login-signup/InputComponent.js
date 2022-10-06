import React, { Component } from 'react';
import WarningComponent from '../utils/WarningComponent';
class InputComponent extends Component {
    constructor(props) {
        super(props);
       
        this.state={
            warn:false,
            type:'',
            message1:'invalid character input',
            message2:'user already exits'
        }

        this.fetch=()=>{
            console.log("calling fecth simulation....")
            this.props.username!=='naman'?
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
                <input value={username}
                onKeyUp={()=>{
                    role==='signup'?
                    this.betterFetch():
                    this.validate()
                }} 
                onChange={this.inputHandle}/>
                {
                    this.state.warn?this.state.type==='invt'?
                    <WarningComponent  message={this.state.message1}/>:
                    <WarningComponent message={this.state.message2}/>:
                    <></>
                }
            </>
        )
    }

}
 
export default InputComponent;