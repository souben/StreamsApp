import React from 'react';
import { Link } from 'react-router-dom';
import { listStreams } from '../../actions';
import { connect } from 'react-redux';


class StreamList extends React.Component {
    
    componentDidMount(){
        this.props.listStreams();
    }

    linkPathSeletion(pathSeletion, id){
        return `/streams/${pathSeletion}/${id}` 
    }

    renderAdmin(stream){
        if( this.props.auth.isSignedIn &&
            this.props.auth.userId === stream.userId) {

            return (
                <div className="right floated content">
                    <Link 
                        className="ui primary basic button"
                        to={this.linkPathSeletion('edit', stream.id)}>Edit
                    </Link>
                    <button className="ui negative basic button">Delete</button>
                </div>
            )}
    }

    renderCreate(){
        if( this.props.auth.isSignedIn ){
            return (
                <div style={{ textAlign: "right"}}>
                   <Link to='/streams/new' className="item">
                        <button className="ui secondary basic button">Create a stream</button>
                    </Link>
                </div>
            )
        }
    }
    
    renderListStreams(){
        return this.props.streams.map( stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned camera icon" />
                    <div className="content">
                        <div className="header">{stream.title}</div>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            )
        }
        )
    }
    
    render(){
        console.log(this.props)
        return (
            <div className="container">
                <div className="ui relaxed divided list">
                   {this.renderListStreams()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }
};
const mapStateToProps = (state) => {
    return { streams: Object.values(state.streams), auth: state.auth }
}

export default connect(mapStateToProps , { listStreams })(StreamList);