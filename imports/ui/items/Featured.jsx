import React, { Component } from 'react';
import { Modal, Popup, Divider, Accordion, Message, Grid, Menu, Segment, Header, Card, Icon, Image, Input, Button, List, Item, ItemContent } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import NotFoundPage from '../NotFoundPage.jsx';
import { ItemCollection } from '../../collections/items.js';
import ItemForm from './Form.jsx';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            open: false
        };
    };

    render() {
        let { error } = this.state;
        let { item } = this.props;
        let id = this.props.item._id;
        console.log("state>>", this.state);
        console.log("props>>", this.props);
        console.log("id>>", id);
        //console.log("user>>", user);
        return (
            <div>
                <Grid.Column verticalAlign="middle">
                </Grid.Column>
                <Grid.Column>
                    <Card centered>
                        <Card.Content>
                                 <Popup
                                    trigger={<a href={`#/items/${item._id}`}><Image src={item.imageUrl} /></a>}
                                    content={item.owner}
                                    basic
                                />   
                                {item.name}
                                <Popup
                                    trigger={ <Icon color="blue" name="marker" size="small"/>}
                                    content={item.location}
                                    basic
                                />
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </div>
        )
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
        return (
            <Accordion key={item._id} panels={panels} exclusive={false} fluid />
        );
    }
}
