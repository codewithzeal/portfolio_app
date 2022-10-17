import React, { Component } from 'react';
class ProjectComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            val:''
        }
    }

    handlechange=(e)=>{
        this.setState({val:e.target.value})
    }

    componentDidMount()
    {
        this.props.setRoute("projects") 
        console.log(this.props.getHistory().projects)
        if(this.props.getHistory().projects!=='')
        this.setState((this.props.getHistory().projects))
        return null
    }

    componentWillUnmount()
    {
        this.props.saveHistory(this.state,"projects")
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
 
export default ProjectComponent;