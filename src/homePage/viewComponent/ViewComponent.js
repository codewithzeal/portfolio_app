import axios from 'axios';
import React, { Component } from 'react';
import BasicView from './BasicView';
class ViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            basicDetails:'',
            address:'',
            skills:'',
            projects:'',
            education:'',
            experience:'',
            complete:false
        }
    }

componentDidMount()
{
    this.props.setRoute("view")
    axios.post('http://localhost:8080/fetch/'+this.props.userID).then((res)=>{

        let response=res.data[0]
        this.setState({
            
            complete:response.basicDetails.fullName&&response.address.adrline1,
            basicDetails:response.basicDetails.fullName?response.basicDetails:'',
            address:response.address.adrline1?response.address:'',
            skills:response.skills.length?response.skills:'',
            projects:response.projects.length?response.projects:'',
            education:response.education?response.education:'',
            experience:response.experience?response.workExperiences:''
        })
    })
}

    render()
    {
        return(
            <>
                {
                    
                    !this.state.complete?
                    <h6 style={{color:'white'}}>*Please complete address and basic details to start viewing
                        or wait for changes to update(do not refresh or leave this tab)
                    </h6>:
                    <>
                        <BasicView value={[this.state.basicDetails,this.state.address]}/>
                    </>
                }
            </>
        )
    }

}
 
export default ViewComponent;