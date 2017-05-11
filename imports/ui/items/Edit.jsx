import React from 'react';
import { hashHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { ItemCollection } from '../../collections/items.js';
import { Popup, Container, Header, Message, Card, Input, Icon, Image, Button, Divider, Form, Segment } from 'semantic-ui-react'
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
        console.log("edit item..", this.state);
        return (
            <div>
                {item ?
                    <Container text>
                        <Container textAlign='right'>
                            <Popup
                                trigger={ <Icon inverted circular name='trash outline' color="red" onClick={this.removeItem.bind(this)} />}
                                content="Delete Item"
                                basic
                            />
                           
                        </Container>

                        <ItemForm item={item} onSave={this.onItemUpload.bind(this)} />
                    </Container>
                    : <p></p>}
            </div>
        );
    }

    componentDidMount() {
        this.loadItem();
    }

    loadItem() {
        console.log("prop in loadItem-->", this.props);
        let item = ItemCollection.findOne({ "_id": this.props.params.id });
        if (item) {
            this.setState({ item: item });
        } else {
            this.setState({ error: "Error>>>" });
        }
        console.log("items-->", item);
    }

    removeItem(e) {
        console.log("delete..", e.target.value)
        ItemCollection.remove(this.props.params.id);
        hashHistory.push(`/dashboard/${this.state.item.owner}`);
    }

    onItemUpload(item) {
        console.log("onItemedit.........", item);
        ItemCollection.update(item._id, {
            name: item.name,
            imageUrl: item.imageUrl,
            description: item.description,
            condition: item.condition,
            value: item.value,
            owner: item.owner
        });
        hashHistory.push(`/dashboard/${item.owner}`);
    }
}

