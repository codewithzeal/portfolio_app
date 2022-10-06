import React, { Component } from 'react';
import WarningComponent from '../utils/WarningComponent';
class ConfirmPasswordComponenet extends Component {
    constructor(props) {
        super(props);

        this.state={
            message:'passwords do not match'
        }
    }

    handleInput=(e)=>{
        this.props.setCnfPassword(e.target.value)
    }
    
    render()
    {
        return(
            <>
                <input 
                    type='password'
                    value={this.props.cnfPassword}
                    onChange={this.handleInput}
                />
                {   
                    this.props.warn?
                    <WarningComponent message={this.state.message}/>:
                    ''
                }
            </>
        )
    }
}
 
export default ConfirmPasswordComponenet;