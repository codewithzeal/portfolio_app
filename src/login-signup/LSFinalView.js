import React, { Component } from 'react';
import LSParent from './LSparent';
class LSFinalView extends Component {
    
    render()
    {
        return(

            <>

                <div className='container-fluid mt-3' >

                    <div className='row'>

                        <div className='col-sm-4'style={{backgroundColor:'white',justifyContent:'center'}}>
                            <center>
                                <LSParent/>
                            </center>
                        </div>
                        <div className='col-sm-7 ml-3 mt-2'style={{backgroundColor:'yellow'}}>
                            .
                        </div>

                    </div>

                </div>

            </>

        )
    }

}
 
export default LSFinalView;