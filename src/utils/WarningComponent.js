import{ Component } from 'react';
class WarningComponent extends Component{
    

    render()
    {
        return (
            <>
                {this.props.message}
            </>
            )
    }
}

export default WarningComponent