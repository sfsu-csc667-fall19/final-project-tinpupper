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
        alert('Your request has been submitted') //+ this.state.value
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <h1> Create Business</h1>
            <br />
                <label> 
                   Restaurant Name:
                <input type="text" class = "form-control" value={this.state.value} onChange={this.handleChange} placeholder="Desired restaurant(s)" />
                </label>
                {/*<button type = "submit" class = "btn btn-primary"> Submit </button>*/}
                <br />

                <label>
                    Restaurant Type: 
                <input type="text" class = "form-control" value={this.state.value} onChange={this.handleChange} placeholder="Type of restaurant(s)" />   
                </label> 
                {/*<button type = "submit" class = "btn btn-primary"> Submit </button>*/}
                <br />

                <label>
                   Restaurant Description: 
                <input type="text" class = "form-control"  value={this.state.value} onChange={this.handleChange} placeholder="Description of restaurant(s)"/>   
                </label> 
                {/*<button type = "submit" class = "btn btn-primary"> Submit </button>*/}
                <br />
            
            <button type = "submit" class = "btn btn-primary"> Submit </button>
            </form>
        );
    }
}

export default Business;