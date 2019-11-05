import React from 'react';
import { reduxForm, Field } from 'redux-form';
import StreamForm from "../streams/StreamForm";
import { listStreams, updateStream } from '../../actions';
import { connect } from 'react-redux';
import history from '../../history';
class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.listStreams();
    }

    getIdStream = (string = '') => {
        const arr = string.split('/');
        return arr[arr.length - 1];
    }

    onSubmit = (formValues) => {
        this.props.updateStream(this.getIdStream(history.location.pathname), formValues);
    }


    render() {
        if(JSON.stringify(this.props.streams) === "{}"){
            return(
                <div>
                    Loading . . .
                </div>
            )
        }
        return (
            <form className="ui form error"
                onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field
                    value={this.props.streams[this.getIdStream(history.location.pathname)]['title']}
                    name="title"
                    component={StreamForm.rI}
                    label="Enter a title :" />
                <Field
                    value={this.props.streams[this.getIdStream(history.location.pathname)]['description']}
                    name="description"
                    component={StreamForm.rI}
                    label="Enter a description :" />
                <button className="ui button primary"> Sumbit </button>
            </form>
        )
    }
};


const fromWrapped = reduxForm({
    form: 'streamUpdate',
    validate: ''
})(StreamEdit);
const mapStateToProps = (state) => {
    return { streams: state.streams }
}
export default connect(
    mapStateToProps,
    { listStreams, updateStream }
)(fromWrapped)
