import React from 'react';
import Axios from 'axios';

class Business extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A new name has been submitted:  ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <h1> Welcome to your Business Page</h1>
            <br />
                <label> 
                   Restaurant Name:
                <input type="text" class = "form-control" value={this.state.value} onChange={this.handleChange} />
                </label>
                <button type = "submit" class = "btn btn-primary"> Submit </button>
                <br />

                <label>
                    Type: 
                <input type="text" class = "form-control" value={this.state.value} onChange={this.handleChange} />   
                </label> 
                <button type = "submit" class = "btn btn-primary"> Submit </button>
                <br />

                <label>
                    Description: 
                <input type="text" class = "form-control"  value={this.state.value} onChange={this.handleChange} />   
                </label> 
                <button type = "submit" class = "btn btn-primary"> Submit </button>
                <br />
            
            <button type = "submit" class = "btn btn-primary"> Submit </button>
            </form>
        );
    }
}

export default Business;