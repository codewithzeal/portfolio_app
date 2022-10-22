import React, { Component } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import BottomNavbar from './bottom_navbar';
import { Route } from 'react-router-dom';
import BasicComponent from '../basic_detail/BasicComponent';
import ViewComponent from '../viewComponent/ViewComponent';
import EducationParent from '../education/EducationParent';
import WeParent from '../work_experience/WeParent';
import ProjectsParent from '../projects/ProjectParent';
import LSFinalView from '../../login-signup/LSFinalView';
class ParentContainer extends Component {
    constructor(props) {
        super(props);
        this.state={
            route:'basic',
            isLoggedIn:'',
            username:''
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
                            
                                <Route path="" element={<BottomNavbar routeValue={this.state.route}/>}>
                                    <Route index element={<BasicComponent setRoute={this.updateRoute} getHistory={this.getHistory} saveHistory={this.saveHistory} userID={this.props.username}/>}/>
                                    <Route path='education' element={<EducationParent setRoute={this.updateRoute} getHistory={this.getHistory} saveHistory={this.saveHistory} userID={this.props.username}/>}/>
                                    <Route path='we' element={<WeParent setRoute={this.updateRoute} getHistory={this.getHistory} saveHistory={this.saveHistory} userID={this.props.username}/>}/>
                                    <Route path='projects' element={<ProjectsParent setRoute={this.updateRoute} getHistory={this.getHistory} saveHistory={this.saveHistory} userID={this.props.username}/>}/>
                                    <Route path='view' element={<ViewComponent setRoute={this.updateRoute} getHistory={this.getHistory} saveHistory={this.saveHistory} userID={this.props.username}/>}/>
                                </Route>
                    </Routes>
                </BrowserRouter>
            </>

        )
            
   }
}
 
export default ParentContainer;