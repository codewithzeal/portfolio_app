import React, { Component } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import BottomNavbar from './bottom_navbar';
import { Route } from 'react-router-dom';
import BasicComponent from '../basic_detail/BasicComponent';
import WorkExperienceComponent from '../work_experience/WorkExperienceComponent';
import ProjectComponent from '../projects/ProjectComponent';
import ViewComponent from '../viewComponent/ViewComponent';
import EducationParent from '../education/EducationParent';
class ParentContainer extends Component {
    constructor(props) {
        super(props);
        this.state={
            route:'basic'
        }

        this.historyStack={
            projects:'',
            we:'',
            education:'',
            basic:'',
            view:'',
            skills:'',
            address:''
        }

        this.saveHistory=(val,type)=>
        {
            
            if(type==="basic")
            this.historyStack.basic=val
            else if(type==="we")
            this.historyStack.we=val
            else if(type==="projects")
            this.historyStack.projects=val
            else if(type==="education")
            this.historyStack.education=val
            else if(type==="view")
            this.historyStack.view=val
            else if(type==="skills")
            this.historyStack.skills=val
            else if(type==="address")
            this.historyStack.address=val
            console.log(val,'bahar')
        }

        this.getHistory=()=>{
            return this.historyStack
        }


        

    }



    updateRoute=(val)=>{
        this.setState({route:val})
    }

   render()
   {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="home" element={<BottomNavbar routeValue={this.state.route}/>}>
                            <Route path="basic" element={<BasicComponent setRoute={this.updateRoute} getHistory={this.getHistory} saveHistory={this.saveHistory} />}/>
                            <Route path='education' element={<EducationParent setRoute={this.updateRoute} getHistory={this.getHistory} saveHistory={this.saveHistory}/>}/>
                            <Route path='we' element={<WorkExperienceComponent setRoute={this.updateRoute} getHistory={this.getHistory} saveHistory={this.saveHistory}/>}/>
                            <Route path='projects' element={<ProjectComponent setRoute={this.updateRoute} getHistory={this.getHistory} saveHistory={this.saveHistory}/>}/>
                            <Route path='view' element={<ViewComponent setRoute={this.updateRoute} getHistory={this.getHistory} saveHistory={this.saveHistory}/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </>

        )
            
   }
}
 
export default ParentContainer;