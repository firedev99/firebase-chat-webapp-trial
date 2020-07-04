import React, { Component } from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import firebase from '../firebase/firebase.util'
import md5 from 'md5';

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: [],
        loading: false,
        userRef: firebase.database().ref('users')
    };

    displayErrors = errors => errors.map((error, i) => (
        <p key={i}>{error.message}</p>
    ))

    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            //throw errors 
            error = { message: 'Fill the all fields' };
            this.setState({ errors: errors.concat(error) });
            return false
        } else if (!this.isPasswordValid(this.state)) {
            //throw errors 
            error = { message: 'Password is invalid' };
            this.setState({ errors: errors.concat(error) })
        } else {
            return true;
        }
    }

    isFormEmpty = ({ username, email, password, confirmPassword }) => {
        return !username.length || !email.length || !password.length || !confirmPassword
    }

    isPasswordValid = ({ password, confirmPassword }) => {
        if(password.length < 6 || confirmPassword.length < 6) {
            return false;
        } else if (password !== confirmPassword) {
            return false;
        } else {
            return true;
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid()) {
            this.setState({ errors: [], loading: true })
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                console.log(createdUser);
                createdUser.user.updateProfile({
                    displayName: this.state.username,
                    photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                })
                .then(() => {
                    this.saveUser(createdUser).then(() => {
                        console.log('user saved');
                    })
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ errors: this.state.errors.concat(err), loading: false })
                })
                // this.setState({ loading: false });
            })
            .catch(err => {
                console.log(err);
                this.setState({ errors: this.state.errors.concat(err), loading: false });
            })
        }
    };

    saveUser = createdUser => {
       return this.state.userRef.child(createdUser.user.uid).set({
           name: createdUser.user.displayName,
           avatar: createdUser.user.photoURL
       })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : '';
    }

    render() {
        const { username, password, confirmPassword, email, errors, loading } = this.state;

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register for DevChat
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input fluid name="username" value={username} icon="user" iconPosition="left" placeholder="Username" type="text" onChange={this.handleChange} />
                            <Form.Input fluid name="email" className={this.handleInputError(errors, 'email')} icon="mail" value={email} iconPosition="left" placeholder="Email Address" type="email" onChange={this.handleChange} />
                            <Form.Input fluid name="password" className={this.handleInputError(errors, 'password')} icon="lock" value={password} iconPosition="left" placeholder="Password" type="password" onChange={this.handleChange} />
                            <Form.Input fluid name="confirmPassword" className={this.handleInputError(errors, 'password')} value={confirmPassword} icon="repeat" iconPosition="left" placeholder="Password Confirmation" type="password" onChange={this.handleChange} />
                            <Button disabled={loading} className={loading ? "loading": ""} color="orange" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error >
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Already a user?<Link to="/login"> Login</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;
