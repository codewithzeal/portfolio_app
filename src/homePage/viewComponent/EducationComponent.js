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
               <div className="card bg-white mt-4 basic-container">
                <img className="card-img img-fluid" src="https://t3.ftcdn.net/jpg/04/47/39/32/360_F_447393243_O0ba7BX3bL41T3dFylrjgj6sXCaob5Rt.jpg" 
                     alt="Card image"
                     style={{maxHeight:'280px'}}
                />
                <div className="card-img-overlay section-titles">
                <i className='fa fa-graduation-cap fa-lg' style={{display:'inline',wordSpacing:'0px'}} ></i> : <p className="card-title" style={{display:'inline',wordSpacing:'0px',textJustify:"auto"}} >{this.props.value.institute}</p>
                </div>
                <div className="card-img-overlay "  >
                    <div className='bg-danger section-tag1' >
                        Education
                    </div>
                </div>
                <div className="card-img-overlay"  >
                    <div className='bg-light traverse-arrow-right'onClick={this.setIndexPlus} style={{cursor:'pointer'}} >
                        <i className='fa fa-arrow-right' ></i>
                    </div>
                </div>
                <div className="card-img-overlay " >
                    <div className='bg-light traverse-arrow-left' onClick={this.setIndexMinus} style={{cursor:'pointer'}}>
                        <i className='fa fa-arrow-left'  ></i>
                    </div>
                </div>
                <div className='container-fluid'>
                    <p><span style={{fontWeight:'bolder'}} >Stream:</span> {this.props.value.stream}</p>
                    <p><span style={{fontWeight:'bolder'}} >Start-Date:</span> {this.props.value.startDate}</p>
                    <p><span style={{fontWeight:'bolder'}} >End-Date:</span> {this.props.value.endDate}</p>
                    <p><span style={{fontWeight:'bolder'}} >CGPA:</span> {this.props.value.cgpa}</p>
                </div>
                </div>
                
             </>
        );
    }
}

class EducationComponent extends Component {
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
             <div className='row' style={{position:'relative',top:'100px'}} >
                <div className='col-sm-2'></div>
                <div className='col-sm-8'>
                    <Card value={this.props.value[this.state.index]} changeIndex={this.changeIndex} index={this.state.index}/>
                </div>
                <div className='col-sm-2'></div>
             </div>
             
        );
    }
}
 
export default EducationComponent;