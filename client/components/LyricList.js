import React, { Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class LyricList extends Component {
    onLike(id, likes) {
        this.props.mutate({
            variables: {id},
            optimisticResponse: {
                __tyoename: 'Mutation',
                likeLyric: {
                    id,
                    __tyoename: 'LyricType',
                    likes: likes + 1
                }
            }
        })
    }

    renderLyrics() {
        const {lyrics} = this.props;
        return lyrics.map(({id, content, likes}) => {
            return (
                <li key={id} className="collection-item">
                    <p>{content}</p>
                    <div className="vote-box">
                        <i
                            className="material-icons"
                            onClick={() => this.onLike(id,likes)}>
                            thumb_up
                        </i>
                        <span className="new badge blue" data-badge-caption="Likes">{likes}</span>
                    </div>
                </li>
            );                            
        });
    }

    render() {
        
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        );
    }
}

const mutation = gql`
    mutation LikeLyric($id: ID!) {
        likeLyric(id: $id) {
            id
            likes
        }
    }
`;

export default graphql(mutation)(LyricList);