import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LSFinalView from './LSFinalView';
import ViewParent from '../homePage/viewComponent/ViewParent'
class LSandView extends Component {
   render()
   {
        return(
                <BrowserRouter>
                    <Routes>
                        <Route path="" element={<LSFinalView setUserName={this.props.setUserName} />} />
                        <Route path='view/:id' element={<ViewParent/>}/>
                    </Routes>
                </BrowserRouter>
        )
   }
}
 
export default LSandView;