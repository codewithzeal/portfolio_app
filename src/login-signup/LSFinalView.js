import React, { Component } from 'react';
import LSParent from './LSparent';
class LSFinalView extends Component {
    
    render()
    {
        return(

            <>

                <div className='container-fluid'>

                    <div className='row p-3'>

                        <div className='col-sm-4'style={
                            {
                                justifyContent:'center',
                                border:'1px solid blue',
                                borderRadius:'8px 8px 8px 8px',
                                height:'max-content',
                                backgroundColor:'rgb(87, 207, 123)',
                                position:'relative',
                                top:'20vh'
                                
                            }}
                            >
                            <center>
                                <LSParent setUserName={this.props.setUserName}/>
                            </center>
                        </div>
                        <div className='col-sm-8'style={
                            {
                                backgroundColor:'white',
                                height:'80vh',
                                 
                            }}
                        >
                            
                        </div>

                    </div>

                </div>

            </>

        )
    }

}
 
export default LSFinalView;