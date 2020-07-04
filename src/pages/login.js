import React, { Component } from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import firebase from '../firebase/firebase.util'

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: [],
        loading: false
    };

    displayErrors = errors => errors.map((error, i) => (
        <p key={i}>{error.message}</p>
    ))

    

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true });
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(signedInUser => {
                console.log(signedInUser);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    errors: this.state.errors.concat(err),
                    loading: false
                })
            })
        }
    };

    isFormValid = ({ email, password }) => email && password;

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : '';
    }

    render() {
        const { password, email, errors, loading } = this.state;

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet" />
                        Login to DevChat
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input fluid name="email" className={this.handleInputError(errors, 'email')} icon="mail" value={email} iconPosition="left" placeholder="Email Address" type="email" onChange={this.handleChange} />
                            <Form.Input fluid name="password" className={this.handleInputError(errors, 'password')} icon="lock" value={password} iconPosition="left" placeholder="Password" type="password" onChange={this.handleChange} />
                            <Button disabled={loading} className={loading ? "loading": ""} color="violet" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error >
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Don't have an account? <Link to="/register">Register</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Login;
