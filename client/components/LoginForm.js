import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import mutation from '../mutations/login';
import query from '../queries/currentUser';
import AuthForm from '../components/AuthForm';
import {hashHistory} from 'react-router';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {errors:[]}
    }

    componentWillUpdate(nextProps) {
        console.log(nextProps.data.user);
        if (!this.props.data.user && nextProps.data.user) {
            hashHistory.push("/dashboard")
        }
    }

    onSubmit({email, password}) {
        this.props.mutate({
            variables:{ email, password },
            refetchQueries: [{query}]
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({errors});
        });
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm 
                    errors={this.state.errors}
                    onSubmit={this.onSubmit.bind(this)}
                />
            </div>
        )
    }
}

export default graphql(query)(graphql(mutation)(LoginForm));