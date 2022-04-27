import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const root = document.getElementById('root');

function LoginVerdict(props){
    console.log(typeof(props.inputPassword));
    if(props.inputUsername === props.username && props.inputPassword === props.password){
        return <p>Successfully logged in</p>;
    }
    return <p>The username or password you entered is incorrect.</p>;
}

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'usernameValue': '',
            'passwordValue': '',
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

    login(){
        alert("Your username is " + this.state.usernameValue + " and your password is " + this.state.passwordValue);
    }
    
    render() {
        const username = 'Alexandros';
        const password = '123';
        return (
            <form id="login-form">
                <input type="text" id="username-field" value={this.state.usernameValue} onChange={(event) => this.handleUsernameChange(event)}></input>
                <input type="text" id="password-field" value={this.state.passwordValue} onChange={(event) => this.handlePasswordChange(event)}></input>
                <button  id="login-button" onClick={() => this.login()}>Login</button>
                <LoginVerdict username={username}
                    inputUsername={this.state.usernameValue} 
                    password={password}
                    inputPassword={this.state.passwordValue} />
            </form>
        );
    }
}

ReactDOM.render(<LoginForm />, root);
