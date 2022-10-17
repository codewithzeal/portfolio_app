import React, { Component } from 'react';

class EnhancedInput extends Component {
    constructor(props) {
        super(props);
        this.state={
            warn:false
        }

        this.deBounce=(fn,delay)=>
        {
            let Timer
            return function(...args)
            {
                const context=this
                if(Timer)
                clearTimeout(Timer)
            
                    Timer=setTimeout(()=>{
                        fn.apply(context,args)
                    },delay)
                
            }
        }


    }
    

    handleChange=(e)=>{
        this.props.setValue(e.target.value)
    }

    validate=()=>{
        if(this.props.validate(this.props.value))
        this.setState({warn:false},()=>{this.props.setSubmit(true)})
        else
        this.setState({warn:true},()=>{this.props.setSubmit(false)})
    }

    render()
    {
        return(
            <>
                <input 
                    className='form-control mt-2' 
                    type="text" 
                    placeholder={this.props.placeHolder}
                    value={this.props.value}
                    onChange={this.handleChange}
                    onKeyUp={this.deBounce(this.validate,300)}
                />
                
                {
                    this.state.warn&&this.props.value?
                    <div>
                        {
                            this.props.messages.map((item,index)=>(
                                <p key={index} style={{float:'left',fontSize:'2.5vh',color:'yellow'}}>
                                    *{item}
                                </p>
                            ))
                        }
                    </div>:
                    ''
                }
            </>
        )
    }

}
 
export default EnhancedInput;