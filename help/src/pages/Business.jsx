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
                <label> 
                   Restaurant Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                <br />

                <label>
                    Type: 
                <input type="text"  value={this.state.value} onChange={this.handleChange} />   
                </label> 
                <input type="submit" value="Submit" />
                <br />

                <label>
                    Description: 
                <input type="text"  value={this.state.value} onChange={this.handleChange} />   
                </label> 
                <input type="submit" value="Submit" />
                <br />
            
            <input type = "submit" value = "Submit"/>
            </form>
        );
    }
}

export default Business;