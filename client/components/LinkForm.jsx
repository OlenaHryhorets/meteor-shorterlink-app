import React, { Component } from 'react';

class LinkForm extends Component {
    constructor(props) {
        super(props)

        this.state = { error: ''};
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.input.value);
        Meteor.call('links.insert', event.target.input.value, (error) => {
            if(error) {
                this.setState({error: 'Enter a valid URL'});
            } else {
                this.setState({error: ''});
                event.target.reset();
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
               <div className="form-group">
                   <label>Link to shorten</label>
                   <input id="input" className="form-control"></input>
               </div>
               <div className="text-danger">{this.state.error}</div>
               <button className="btn btn-primary">Shorten!</button>
            </form>
        );
    }
}

export default LinkForm;