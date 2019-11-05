import React from 'react';
import StreamForm from './StreamForm'
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {

    onSubmit =(formValues) =>{
        this.props.createStream(formValues)
    }

    render(){
        return(
            <StreamForm onSubmit={this.onSubmit}/>
        )
    }
}
const mapStateToProps = (state) => {
    return {auth: state.auth}
}
export default connect(
    mapStateToProps ,
    { createStream }
)(StreamCreate)