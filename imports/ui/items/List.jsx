import React, { Component } from 'react';
import { Popup, Container, Divider, Accordion, Message, Grid, Menu, Segment, Header, Card, Icon, Image, Input, Button, List, Item, ItemContent } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import NotFoundPage from '../NotFoundPage.jsx';
import { ItemCollection } from '../../collections/items.js';
import ItemComponent from './Item.jsx';

export default class ItemsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            items: null,
            itemsCount: null
        };
    };

    render() {
        let { error, items, itemsCount } = this.state;
        let { user } = this.props;
        console.log("state>>", this.state);
        console.log("props>>", this.props);
        console.log("user>>", user);
        return (
            <div>
                <Container>
                    {itemsCount > 0 ?
                        <Segment.Group>
                            <Segment><Header><Icon name='database' />Listed Items</Header></Segment>
                            <Grid.Column>
                                {items.map(item => this.renderItems(item))}
                            </Grid.Column>
                        </Segment.Group>
                        : <Message size='huge'>You don't have any uploaded items yet.<br />add now</Message>
                    }
                </Container>
            </div>
        )
    }

    componentDidMount() {
        this.loadItems();
    }

    loadItems() {
        let items = ItemCollection.find({ "owner": this.props.user.username }).fetch();
        let itemsCount = ItemCollection.find({ "owner": this.props.user.username }).count();
        if (items) {
            this.setState({ items: items });
            this.setState({ itemsCount: itemsCount });
        } else {
            this.setState({ error: "Error>>>" });
        }
        console.log("items-->", items);
    }

    renderItems(item) {
        let panels = [
            {
                title: (
                    <Card>
                        <Card.Content>
                            <Card.Header> {item.name}</Card.Header>
                            <Image src={item.imageUrl} />
                        </Card.Content>
                    </Card>),
                content: (
                    <Card>
                        <Card.Content>
                            <Card.Description>
                                <span></span>
                                <p>{item.description}</p>
                            </Card.Description>
                            <Divider />

                            <span>Condition : {item.condition}</span>
                            <Divider />

                            <span>Price : {item.price} </span>
                        </Card.Content>
                    </Card>
                ),
            }
        ]

        // <Accordion key={item._id} panels={panels} exclusive={false} fluid />
        return (
            <div key={item._id}>
                <Segment>
                    <ItemComponent key={item._id} item={item} />
                </Segment>
            </div>
        );
    }
}
