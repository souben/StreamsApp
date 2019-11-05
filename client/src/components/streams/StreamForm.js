

import React from 'react';
import {Field, reduxForm } from 'redux-form';


class StreamForm extends React.Component {

    renderError = ({ error, touched}) => {
        return (touched && error) ? 
                <div className="ui error message">{error}</div> 
                :
                 <div>{null}</div>
    }
    
     
    renderInputField = ({ input, label, meta }) => {
        const error = ( meta.error && meta.touched ) ? 'error': '';
        const className = `field `+error;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input}  />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
       this.props.onSubmit(formValues);
    }


    render() {
        console.log(this.props.auth)
        console.log(this.props.handleSubmit(this.onSubmit));
        return  (this.props.auth.isSignedIn) ?
                <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="title" component={this.renderInputField}  label="Enter a title :"/>
                    <Field name="description" component={this.renderInputField} label="Enter a description :"/>
                    <button className="ui button primary"> Sumbit </button>
                </form>
                :
                <h2>Sorry , you've to log in before you can create a stream</h2>
        }
    }   

const validate = (fieldsValues) => {
    const errors = {};
    if( !fieldsValues.title ){ errors.title = 'You must enter a title' };
    if( !fieldsValues.description) { errors.description = 'You must enter a description' };
    return errors;
}

export default reduxForm({form : 'streamForm', validate: validate })(StreamForm);
