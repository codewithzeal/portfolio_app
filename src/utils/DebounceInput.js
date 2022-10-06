import { Component } from "react"

const DebounceInput=(OldComponent)=>{

    class NewComponent extends Component
    {
        constructor(props)
        {
            super(props)
        }
        deBounce=(fn,delay)=>
        {
            let Timer
            return function(...args)
            {
                const context=this
                if(Timer)
                clearTimeout(Timer)
            
                    Timer=setTimeout(()=>{
                        fn.apply(context,args)
                    },delay)
                
            }
        }

        render()
        {
            return(
                <>
                    <OldComponent deBounce={this.deBounce} {...this.props}/>
                </>
            )
        }
    }

    return NewComponent
}




export default DebounceInput