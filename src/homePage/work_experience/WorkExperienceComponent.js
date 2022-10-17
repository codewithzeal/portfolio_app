import React, { Component } from 'react';
class WorkExperienceComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            
        }
    }
    componentDidMount()
    {
        this.props.setRoute("we") 
        console.log(this.props.getHistory().we)
        if(this.props.getHistory().we!=='')
        this.setState((this.props.getHistory().we))
        return null
    }



    componentWillUnmount()
    {
        this.props.saveHistory(this.state,"we")
    }
   render()
   {
      
    return(
            <>
                <div className='form-input-group m-1'>

                    <h2>Basic Info</h2>
                    <input className='form-control' type="text" placeholder='full name'/>
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
 
export default WorkExperienceComponent;