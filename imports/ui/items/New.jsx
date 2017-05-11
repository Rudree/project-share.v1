import React from 'react';
import { hashHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { ItemCollection } from '../../collections/items.js';
import { Modal, Header, Message, Card, Input, Icon, Image, Button, Divider, Form, Segment } from 'semantic-ui-react'
import { Session } from 'meteor/session';
import ItemForm from './Form.jsx';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            user: null,
            error: null
        };
    }

    render() {
        let { item, error, user } = this.state;
        console.log("upload item..", this.state);
        return (
            <div>
                {user ? 
                    <ItemForm item={item}  onSave={this.onItemUpload.bind(this)} />
                :<p></p>}
            </div>
        );
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        let user = Session.get('user');
        console.log("user", user);
        if (user) {
            this.setState({ user: user });
        } else {
            this.setState({ error: "Error>>>" });
        }
    }

    onItemUpload(item) {
        item = Object.assign({}, item, { status: 'Unknown', borrowed: false, rating: 0 });
        console.log("onIteminset.........",item);
        ItemCollection.insert(item);
        hashHistory.push(`/dashboard/${this.state.user.username}`);
    }
}

