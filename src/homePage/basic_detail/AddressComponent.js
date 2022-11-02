import React, { Component } from 'react';
import EnhancedInput from '../../utils/InputComponent';
import { addressValidator, validateName, validatePincode } from './validators';
import axios from 'axios';
class AddressComponent extends Component {
    constructor(props) {
        super(props);

        this.state={
            adrline1:'',
            city:'',
            state:'',
            pinCode:'',
            country:'',
            warn:true,
            buttonValue:'Update address'
        }
    }
   
    componentDidMount()
    {
        if(this.props.getHistory().address!=='')
        this.setState((this.props.getHistory().address))
        else
        axios.post('http://localhost:8080/fetch/'+this.props.userID).then((res)=>{
            if(!res.data[0])
            return
            res=res.data[0].address
            if(res.adrline1===null)
            return
            res["warn"]=false
            res["buttonValue"]='Update address'
            this.setState((prevState)=>(res))
        })
    }

    componentWillUnmount()
    {
        this.props.saveHistory(this.state,"address")
    }

    setAdrLine1=(val)=>{
        this.setState({adrline1:val})
    }

    setCountry=(val)=>{
        this.setState({country:val})
    }

    setStateVal=(val)=>{
        this.setState({state:val})
    }

    setCity=(val)=>{
        this.setState({city:val})
    }

    setPinCode=(val)=>{
        this.setState({pinCode:val})
    }


    setSubmitStatus=(val)=>{
        if(val)
        this.setState({warn:true})
        else
        this.setState({warn:false})
    }

    updateAddress=()=>{
        this.setState({buttonValue:'Updating....',warn:true})
        axios.post('http://localhost:8080/update',{
            type:'address',
            userToUpdate:{
                username:this.props.userID,
                address:{
                    adrline1:this.state.adrline1,
                    country:this.state.country,
                    state:this.state.state,
                    city:this.state.city,
                    pinCode:this.state.pinCode
                }
            }
        }).then((res)=>{
            this.setState({buttonValue:'Updated',warn:false})
        })
    }

    render()
    {
        let inputIconsArray=[
        ]
        return (
            <>
                <h2 className='mt-4'>Address</h2>
                <div className='input-group mt-2'>
                <EnhancedInput
                        classValue="form-control"
                        value={this.state.adrline1}
                        setValue={this.setAdrLine1}
                        placeHolder="Address line 1"
                        inputIcons={inputIconsArray}
                        inputIconWidth="50px"
                        validate={addressValidator}
                        setSubmit={this.setSubmitStatus}
                        messages={["enter a valid value"]}
                    />
                    <EnhancedInput
                        classValue="form-control"
                        value={this.state.country}
                        setValue={this.setCountry}
                        placeHolder="Country"
                        inputIcons={inputIconsArray}
                        inputIconWidth="50px"
                        validate={validateName}
                        setSubmit={this.setSubmitStatus}
                        messages={["enter a valid value"]}
                    />
                </div>
                <div className='input-group mt-2'>
                <EnhancedInput
                        classValue="form-control"
                        value={this.state.state}
                        setValue={this.setStateVal}
                        placeHolder="State"
                        inputIcons={inputIconsArray}
                        inputIconWidth="50px"
                        setSubmit={this.setSubmitStatus}
                        messages={["enter a valid value"]}
                        validate={validateName}
                    />
                    <EnhancedInput
                        classValue="form-control"
                        value={this.state.city}
                        setValue={this.setCity}
                        placeHolder="City"
                        inputIcons={inputIconsArray}
                        inputIconWidth="50px"
                        setSubmit={this.setSubmitStatus}
                        messages={["enter a valid value"]}
                        validate={validateName}
                    />
                </div>
                <div className='input-group mt-2'>
                <EnhancedInput
                        classValue="form-control"
                        value={this.state.pinCode}
                        setValue={this.setPinCode}
                        placeHolder="Pin code"
                        inputIcons={inputIconsArray}
                        inputIconWidth="50px"
                        setSubmit={this.setSubmitStatus}
                        messages={["enter a valid value"]}
                        validate={validatePincode}
                    />
                    
                </div>
                <button 
                        onClick={this.updateAddress}
                        className="btn-success btn mt-2 form-control"
                        disabled={!(this.state.warn&&this.state.adrline1&&this.state.country&&this.state.state&&this.state.city&&this.state.pinCode)}
                        style={{float:'right'}}
                >
                    {this.state.buttonValue}
                </button>
            </>
        )
    }

}
 
export default AddressComponent;