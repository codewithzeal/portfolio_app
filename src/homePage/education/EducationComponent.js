import React, { Component } from 'react';
class EducationComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            val:''
        }
    }

    componentDidMount()
    {
        this.props.setRoute("education") 
        if(this.props.getHistory().education!=='')
        this.setState((this.props.getHistory().education))
        return null
    }

    componentWillUnmount()
    {
        this.props.saveHistory(this.state,"education")
    }

    handlechange=(e)=>{
        this.setState({val:e.target.value})
    }

   render()
   {
       
    return(
            <>
                <div className='form-input-group m-1'>

                    <h2>Basic Info</h2>
                    <input className='form-control' value={this.state.val} type="text" placeholder='full name' onChange={this.handlechange}/>
                    <input className='form-control mt-2' type="text" placeholder='email'/>
                    <input className='form-control mt-2' type="text" placeholder='contact'/>
                    <input className='form-control mt-2' type="text" placeholder='LinkedIN'/>
                    <hr/>
                    <h2>Skills</h2>



                </div>
            </>
        ) 
   }
}
 
export default EducationComponent;