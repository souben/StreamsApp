import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';


class GoogleAuth extends React.Component {

    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId:
                    '291078710890-nvg2chppuqcspt2619uqmaqrrkc0boqi.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        }) ; 
    }
    // Listener 
    onAuthChange = (isSignedIn) => {
        if( isSignedIn ){ this.props.signIn(this.auth.currentUser.get().getId());}
        else {this.props.signOut()}
    }
    

    // Button to signIn or SignOut
    renderSignInState() {
        if(this.props.isSignedIn === null) {
            return <div> null </div>
        }
        else if(this.props.isSignedIn){
            return (
                <button className="ui red google button" onClick={ () => this.auth.signOut()}>
                    <i className="google icon" />
                    Sign Out 
                </button>
            )}
        else {
            return (
                <button className="ui red google button" onClick={ () => this.auth.signIn()}>
                    <i className="google icon" />
                    Sign in with Google
                </button>
            )}
        }

    render(){                           
        return <div>{this.renderSignInState()}</div>
    };
};
const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, userId : state.auth.userId };
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);