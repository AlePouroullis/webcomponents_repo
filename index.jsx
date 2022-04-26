import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const root = document.getElementById('root');

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'usernameValue': '',
            'passwordValue': '',
            'selection': '1'
        }
        
    }

    handleUsernameChange(event) {
        this.setState({
            'usernameValue': event.target.value
        });
    }

    handlePasswordChange(event){
        this.setState({
            'passwordValue': event.target.value
        })
    }

    handleSelection(event){
        this.setState({
            selection: event.target.value
        });
    }

    login(){
        alert("Your username is " + this.state.usernameValue + " and your password is " + this.state.passwordValue);
    }

    render() {
        return (
            <form id="login-form">
                <input type="text" id="username-button" value={this.state.usernameValue} onChange={(event) => this.handleUsernameChange(event)}></input>
                <input type="text" id="password-field" value={this.state.passwordValue} onChange={(event) => this.handlePasswordChange(event)}></input>
                <button  id="login-button" onClick={() => this.login()}>Login</button>
                <select value={this.state.selection} onChange={(event) => this.handleSelection(event)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </form>
        );
    }
}

ReactDOM.render(<LoginForm />, root);
