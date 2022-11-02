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
        
        <div>
           <div className='row m-1' style={{top:'80px',position:'relative'}} >
                <div className='col-sm-2'></div>
                <div className='col-sm-8 basic-container' style={{backgroundColor:'white',height:'auto'}} >
                    <h1 className='full-name'>{this.props.value[0].fullName}</h1>
                    <p className='about-text'>
                        {this.props.value[0].bio}
                    </p>
                    <div className='container-fluid mb-4'>
                        <div className='row'>
                            <div className='col-sm-4 p-1' style={{wordWrap:'break-word'}} >
                                <div className='bg-danger general-data text-white p-2'>
                                    <p><i className='fa fa-child fa-lg' style={{display:'inline'}}></i> : {this.props.value[0].age} Years</p>
                                    <p><i className='fa fa-address-book fa-lg' style={{display:'inline'}}></i> : {this.props.value[0].contact}</p>
                                    <p><i className='fa fa fa-envelope fa-lg' style={{display:'inline'}}></i> : <a className='text-white' href={"mailto:"+this.props.value[0].email}>Email</a></p>
                                    <p><i className='fa fa fa-link fa-lg' style={{display:'inline'}}></i> : <a className='text-white' href={this.props.value[0].linkedInUrl}>LinkedIn</a></p>
                                </div>
                            </div>
                            <div className='col-sm-8 p-1'>
                                {
                                    this.props.value[2]?
                                    <div className='bg-danger skills text-white p-3' style={{height:'175px',overflowY:'auto'}} >
                                        {
                                            <>
                                            <h3>Skills</h3>
                                            {this.props.value[2].map((item,index)=>{
                                                let widthValue=Math.floor((item.skillLevel/5)*100)+'%'
                                                
                                                return(
                                                    <div key={index} className="progress mt-2" style={{width:'100%'}} >
                                                        <div className="progress-bar bg-success" role="progressbar" style={{width:widthValue,fontSize:'14px'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">{item.skillName}</div>
                                                    </div>
                                                )
                                            })}
                                            </>
                                        }
                                    </div>:
                                    <div className='bg-danger skills text-white p-3'>
                                            <h4>No skills added</h4>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-2'></div>
           </div>
        </div>
        )
    }


}
 
export default BasicView;