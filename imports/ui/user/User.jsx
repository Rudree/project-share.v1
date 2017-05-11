import React, { Component } from 'react';
import { Grid, Menu, Segment, Header, Card, Icon, Image, Input, Button, List, Item, ItemContent } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import NotFoundPage from '../NotFoundPage.jsx';
import { ItemCollection } from '../../collections/items.js';
import UserEdit  from './Edit.jsx';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    };

    render() {
        let { error } = this.state;
        let { user } = this.props;   
        return (
            <div>
                {user ?
                    <Segment.Group>
                        <Segment><Header>{user.username}</Header></Segment>
                        <Segment compact>
                            {user.profile ?
                                <Image src={user.profile.avatarUrl} size='small' />
                                :
                                <Image src='http://res.cloudinary.com/rudree/image/upload/v1493390709/user/default.png' size='small' />
                            }
                        </Segment>
                        {user.profile ? this.renderProfile(user) : <p></p>}
                        <Segment floated="right">
                            <Button icon='edit' color='blue' content='Edit' href={`#/user/${user.username}/edit`} />
                        </Segment>
                    </Segment.Group>
                    : <NotFoundPage />}
            </div>
        )
    }

    renderProfile(user) {
        let profile = user.profile;
        let createdAt = user.createdAt.toDateString();
        console.log("item count>", ItemCollection.find({ "owner" : user.username }).count());
        return (
            <Segment.Group>
                <Segment><p>{profile.firstName} {profile.lastName}</p></Segment>
                <Segment> <span className='date'>Joined on {createdAt}</span></Segment>
                <Segment> <a><Icon name='database' />{ItemCollection.find({ "owner" : user.username }).count()} items</a></Segment>
            </Segment.Group >
        );
    }
}
