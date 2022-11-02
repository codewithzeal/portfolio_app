import React, { Component } from 'react';


class Card extends Component
{
    
    constructor(props)
    {
        super(props)
        this.state={
            description:'',
            bvalue:'Read more',
            expanded:false
        }
        this.reducedText=""
    }


    componentDidMount()
    {
        let str=this.props.value.description
        let wd=""
        for(let i=0;i<130&&str.length>130;i++)
        wd+=str[i]
        this.reducedText=wd
         this.setState({
            description:wd,
            bvalue:'Read more',
            expanded:false
        })

    }


    setIndexPlus=()=>{
   
        this.props.changeIndex(this.props.index+1)
    }
    setIndexMinus=()=>{
        
        this.props.changeIndex(this.props.index-1)
    }

    toggleView=()=>{
        
        if(this.state.expanded===false)
        {
            
            this.setState({
                description:this.props.value.description,
                bvalue:'Read less',
                expanded:true
            })
        }
        else
        {
            this.setState({
                description:this.reducedText,
                bvalue:'Read more',
                expanded:false
            })
        }
    }

    render() {
        return (
             <>
               <div className="card bg-white basic-container">
                <img className="card-img img-fluid" src="https://venngage-wordpress.s3.amazonaws.com/uploads/2018/09/Colorful-Circle-Simple-Background-Image-1.jpg" 
                     alt="Card image"
                     style={{maxHeight:'280px'}}
                />
                <div className="card-img-overlay text-white section-titles">
                <i className='fa fa-wrench fa-lg' style={{display:'inline'}} ></i> : <p className="card-title" style={{display:'inline'}} >{this.props.value.title}</p>
                </div>
                <div className="card-img-overlay"  >
                    <div className='bg-light traverse-arrow-right'onClick={this.setIndexPlus} style={{cursor:'pointer'}} >
                        <i className='fa fa-arrow-right' ></i>
                    </div>
                </div>
                <div className="card-img-overlay "  >
                    <div className='bg-danger section-tag1' >
                        <center>
                            Projects
                        </center>
                    </div>
                </div>
                <div className="card-img-overlay " >
                    <div className='bg-light traverse-arrow-left' onClick={this.setIndexMinus} style={{cursor:'pointer'}}>
                        <i className='fa fa-arrow-left'  ></i>
                    </div>
                </div>
                <div className='container-fluid' style={{zIndex:'1'}} >
                    <p style={{display:'inline'}} >
                        {this.state.description}
                    </p>
                    <p style={{display:'inline',marginLeft:'6px',color:'blue',textDecoration:'underline',cursor:'pointer'}}  onClick={this.toggleView} >{this.state.bvalue}</p>
                    <p><span style={{fontWeight:'bolder'}} >Start-Date:</span> {this.props.value.startDate}</p>
                    <p><span style={{fontWeight:'bolder'}} >End-Date:</span> {this.props.value.endDate}</p>
                    <a className='btn btn-success' href={this.props.value.url} style={{zIndex:'1'}} target="_blank">View project</a>
                </div>
                </div>
                
             </>
        );
    }
}

class ProjectComponent extends Component {
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
             <div className='row mt-4' style={{position:'relative',top:'190px'}} >
                <div className='col-sm-2'></div>
                <div className='col-sm-8'>
                    <Card value={this.props.value[this.state.index]} changeIndex={this.changeIndex} index={this.state.index}/>
                </div>
                <div className='col-sm-2'></div>
             </div>
             
        );
    }
}
 
export default ProjectComponent;