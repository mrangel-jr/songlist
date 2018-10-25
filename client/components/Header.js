import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/currentUser';
import mutation from '../mutations/logout';
import {hashHistory} from 'react-router';

class Header extends Component {

    onLogoutClick() {
        this.props.mutate({
            refetchQueries: [{query}]
        });
    }

    renderButtons() {
        const {loading , user} = this.props.data;

        if (loading) { return <div/>; }

        if (user) {
            return <div><a onClick={this.onLogoutClick.bind(this)}>Logout</a></div>;
        } else {
            return (
                <div>
                {/* "waves-effect waves-light btn"     */}
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/Login">Login</Link>
                    </li>
                </div>
            );
        }
    }
    render() {

        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left">
                        WTM ? 
                    </Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default graphql(mutation)(graphql(query)(Header));