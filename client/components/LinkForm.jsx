import React, { Component } from 'react';

class LinkForm extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.input.value);
        Meteor.call('links.insert', event.target.input.value);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
               <div className="form-group">
                   <label>Link to shorten</label>
                   <input id="input" className="form-control"></input>
               </div>
               <button className="btn btn-primary">Shorten!</button>
            </form>
        );
    }
}

export default LinkForm;