import React, { Component } from 'react';
class BasicView extends Component {
    constructor(props) {
        super(props);
    }
    

    formatAddress=(val)=>{
        return val.adrline1+", "+val.city+", "+val.pinCode+", "+val.state+", "+val.country
    }

    render()
    {
        return(
        
        <div className='container-fluid'>
            <div className='basic-details'>
            <h3>{this.props.value[0].fullName}</h3>
                <div className='row bg-white mt-4 detail-menu-bar'>
                    
                    <div className='col-4 p-0'>
                        <div className='bg-primary container-fluid w-100'>
                            Address
                        </div>
                        <div>
                            Contact
                        </div>
                        <div>
                            Connect
                        </div>
                    </div>
                    <div className='col-8 bg-primary'>
                        B
                    </div>
                </div>
            </div>
        </div>
        
        )
    }


}
 
export default BasicView;