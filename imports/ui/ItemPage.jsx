import React, { Component } from 'react';
import { Grid, Menu, Segment, Card, Icon, Image, Divider, Input, Button, List, Item, ItemContent } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//import { Header, Message, Grid, Card, Input, Icon, Image, Button, Divider, Form, Segment, Modal } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import NotFoundPage from './NotFoundPage.jsx';
import { ItemCollection } from '../collections/items.js';

export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            error: null
        };
    };


    render() {
        let { item, error } = this.state;
        console.log("state>>", this.state);
        return (
            <div>
                <Grid>
                      <Grid.Row columns={3}>
                        <Grid.Column width = {3}>
                        </Grid.Column>
                        
                        <Grid.Column width = {10}>
                            {item ?
                            <div>
                            <Item>
                            <Item.Image size='medium' src={item.imageUrl} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header>{item.Name}</Item.Header>
                                <Divider/>
                                <Item.Description>{item.description}</Item.Description>
                                <Item.Extra>
                                <Button floated='right'>
                                    Borrow
                                </Button>
                                </Item.Extra>
                            </Item.Content>
                            </Item> </div> 
                            : <NotFoundPage/>}
                          </Grid.Column >

                         <Grid.Column width = {3}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid> 
            </div>
        )
    }

    componentDidMount() {
        this.loadItem();
    }


    loadItem() {
        let item = ItemCollection.findOne({ "_id": this.props.params.id });
        if (item) {
            this.setState({ item: item });
        }
        console.log("items-->", item);
    }
}
