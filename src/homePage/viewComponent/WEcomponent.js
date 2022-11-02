import React, { Component } from 'react';


class Card extends Component
{
    setIndexPlus=()=>{
        
        this.props.changeIndex(this.props.index+1)
    }
    setIndexMinus=()=>{
       
        this.props.changeIndex(this.props.index-1)
    }
    render() {
        return (
             <>
               <div className="card bg-white basic-container">
                <img className="card-img img-fluid" src="https://ccdi.ca/media/3399/ccip-professional-experience-dossier-submission.png" 
                     alt="Card image"
                     style={{maxHeight:'280px'}}
                />
                <div className="card-img-overlay text-white section-titles">
                <i className='fa fa-briefcase fa-lg' style={{display:'inline'}} ></i> : <p className="card-title display-5" style={{display:'inline'}} >{this.props.value.organization}</p>
                </div>
                <div className="card-img-overlay"  >
                    <div className='bg-light traverse-arrow-right'onClick={this.setIndexPlus} style={{cursor:'pointer'}} >
                        <i className='fa fa-arrow-right' ></i>
                    </div>
                </div>
                <div className="card-img-overlay "  >
                    <div className='bg-danger section-tag1' >
                        <center>
                            Work experience
                        </center>
                    </div>
                </div>
                <div className="card-img-overlay " >
                    <div className='bg-light traverse-arrow-left' onClick={this.setIndexMinus} style={{cursor:'pointer'}}>
                        <i className='fa fa-arrow-left'  ></i>
                    </div>
                </div>
                <div className='container-fluid descriptors'>
                    <p><span style={{fontWeight:'bolder'}} >Position:</span> {this.props.value.position}</p>
                    <p><span style={{fontWeight:'bolder'}} >Start-Date:</span> {this.props.value.startDate}</p>
                    <p><span style={{fontWeight:'bolder'}} >End-Date:</span> {this.props.value.endDate}</p>
                </div>
                </div>
                
             </>
        );
    }
}

class WEComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            index:0
        }
    }



    changeIndex=(val)=>{
        val=val<0?0:val
        val=val>=this.props.value.length?this.props.value.length-1:val
        this.setState((prevState)=>(
            {index:val}
        ))
    }

    render() {
        return (
             <div className='row mt-4 mb-4' style={{position:'relative',top:'143px'}} >
                <div className='col-sm-2'></div>
                <div className='col-sm-8'>
                    <Card value={this.props.value[this.state.index]} changeIndex={this.changeIndex} index={this.state.index}/>
                </div>
                <div className='col-sm-2'></div>
             </div>
             
        );
    }
}
 
export default WEComponent;