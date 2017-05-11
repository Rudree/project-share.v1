import React, { Component } from 'react';
import { Grid, Menu, Segment, Header, Card, Icon, Image, Input, Button, List, Item, ItemContent } from 'semantic-ui-react';
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
            user: null,
            items: null,
            profile: null,
            error: null,
            activeItem: 'bio'
        };
    };

handleItemClick(e,{ name }) {
    this.setState({ activeItem: name });
}

    render() {
        let { user, error, profile, items, activeItem } = this.state;
        console.log("state>>", this.state);
        return (
            <div>
                <Grid>
                    <Grid.Column width={4}>
                        <Menu fluid vertical tabular>
                            <Menu.Item name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick.bind(this)}  />
                            <Menu.Item name='pics' active={activeItem === 'pics'} onClick={this.handleItemClick.bind(this)} />
                            <Menu.Item name='companies' active={activeItem === 'companies'} onClick={this.handleItemClick.bind(this)} />
                            <Menu.Item name='links' active={activeItem === 'links'} onClick={this.handleItemClick.bind(this)} />
                        </Menu>
        </Grid.Column>

                    <Grid.Column stretched width={12}>
                        <Segment>
                            This is an stretched grid column. This segment will always match the tab height
          </Segment>
                    </Grid.Column>
                </Grid>
                <Grid>
                    <Grid.Row columns={4}>
                        <Grid.Column>
                        </Grid.Column>
                        <Grid.Column>
                            {user ?
                                <Segment padded='very'>
                                    <Header as='h2'>
                                        {profile.avatarUrl ?
                                            <Image avatar src={profile.avatarUrl} />
                                            : <Icon name="user" />}
                                        <Header.Content>
                                            Profile
                                        </Header.Content>
                                    </Header>
                                    <Card>
                                        <div>
                                            {profile.avatarUrl ?
                                                <Image src={profile.avatarUrl} />
                                                :
                                                <Image src='http://res.cloudinary.com/rudree/image/upload/v1493390709/user/default.png' />}
                                            <Button icon='edit' color='blue' content='Edit' href={`#/user/${user.username}/edit`} />
                                        </div>
                                        <Card.Content>
                                            <Card.Header>{user.username}</Card.Header>
                                            <Card.Meta>Joined in 2016</Card.Meta>
                                            <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <a><Icon name='user' />10 Friends</a>
                                        </Card.Content>
                                    </Card>
                                </Segment>
                                : <NotFoundPage />}
                        </Grid.Column>
                        <Grid.Column>
                            {items ?
                                <Segment padded='very'>
                                    <Header as='h2'>
                                        <Icon name='star' />
                                        <Header.Content>
                                            Items
                                        </Header.Content>
                                    </Header>
                                    <List divided>
                                        {items.map(item => this.renderItems(item))}
                                    </List>
                                </Segment>
                                : <p> Items not found </p>}
                        </Grid.Column>
                        <Grid.Column>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

    componentDidMount() {
        this.loadUser();
        this.loadItems();
    }

    loadUser() {
        let user = Meteor.users.findOne({ username: this.props.params.username });
        if (user) {
            this.setState({ user: user });
            this.setState({ profile: user.profile });
        } else {
            this.setState({ error: "Error>>>" });
        }
    }

    loadItems() {
        let items = ItemCollection.find({ "Owner": this.props.params.username }).fetch();
        if (items) {
            this.setState({ items: items });
        }
        console.log("items-->", items);
    }

    renderItems(item) {
        //var ItemNode = this.state.items.map(function (itemData) {
        /*<div key={item._id}>
            <p>{item.name}</p>
        </div>*/
        return (
            <Grid key={item._id}>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <ItemContent>
                            <a href={`#/item/${item._id}`}>{item.Name}</a>
                        </ItemContent>
                    </Grid.Column>
                    <Grid.Column>
                        <a href={`#/items/${item._id}/edit`}><Icon name="edit" /></a>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
        //});
        // let items = ItemCollection.findOne({"Owner": this.props.params.username })
        // return items.map((item) => (
        //     <p>{item.name}</p>
        // ));
    }
}
