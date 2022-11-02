import axios from 'axios';
import React, { Component } from 'react';
import BasicView from './BasicView';
import EducationComponent from './EducationComponent';
import ProjectComponent from './ProjectComponent';
import WEComponent from './WEcomponent';
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
    
    axios.post('http://localhost:8080/fetchbyid/'+this.props.id).then((res)=>{

        let response=res.data[0]
        this.setState({
            
            complete:response.basicDetails.fullName&&response.address.adrline1,
            basicDetails:response.basicDetails.fullName?response.basicDetails:'',
            address:response.address.adrline1?response.address:'',
            skills:response.skills.length?response.skills:'',
            projects:response.projects.length?response.projects:'',
            education:response.education.length?response.education:'',
            experience:response.workExperiences.length?response.workExperiences:''
        })
    })
}

    render()
    {
        return(
            <>
              
                    <div className='container-fluid bg-light p-3' style={{position:'relative',color:'black',height:'100vh'}}>
                        <BasicView value={[this.state.basicDetails,this.state.address,this.state.skills]}/>
                        
                        {
                            this.state.education?
                            <>
                                <EducationComponent value={this.state.education}/>
                            </>:
                            ''
                        }
                        {
                            this.state.experience?
                            <>
                                <WEComponent value={this.state.experience}/>
                            </>:
                            ''
                        }
                        {
                            this.state.projects?
                            <>
                                <ProjectComponent value={this.state.projects}/>
                            </>:
                            ''
                        }
                        <div style={{height:'400px'}} >

                        </div>
                    </div>
                
            </>
        )
    }

}
 
export default ViewComponent;