import React from 'react';
import validator from 'validator';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import FormData from 'form-data';
import { ItemCollection } from '../../collections/items.js';
import { select, Grid, Container, TextArea, Modal, Header, Message, Card, Input, Icon, Image, Button, Divider, Form, Segment } from 'semantic-ui-react'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            item: Object.assign({}, props.item),
            owner: Session.get('user').username,
            location: null
        };
    }

    render() {
        let { item, error } = this.state;
        console.log("form item..", item);

        return (
            <div>
                {item ?
                    <Container text>
                        <Segment inverted color='green' padded="very">
                            <Header as='h3'>
                                <Icon.Group size='large'>
                                    <Icon name='database' />
                                    <Icon corner name='add' />
                                </Icon.Group>
                                Upload Item
                        </Header>

                            <Segment.Group>
                                <Segment compact raised >
                                    <Form size='small'>
                                        <Form.Field>
                                            <label>Name</label>
                                            <Input type="text" placeholder="Item Name" value={item.name} onChange={this.NameChange.bind(this)} required />
                                        </Form.Field>

                                        <label>Attach an image *</label>
                                        <Segment >
                                            <Grid>
                                                <Grid.Row columns={2}>
                                                    <Grid.Column>

                                                        <Dropzone
                                                            onDrop={this.onImageDrop.bind(this)}
                                                            multiple={false}
                                                            accept="image/*">
                                                            <div>Drop an image or click to select a file to upload.</div>
                                                        </Dropzone>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        {item.imageUrl === '' ? null :
                                                            <Image src={item.imageUrl} />}
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Segment>


                                        <Form.Field>
                                            <label>Description</label>
                                            <TextArea placeholder='Enter short description about item.' autoHeight value={item.description} onChange={this.onDescriptionChange.bind(this)} />
                                        </Form.Field>

                                        <Form.Field>
                                            <label>Condition</label>
                                            <Input type="text" placeholder="Condition" value={item.condition} onChange={this.onConditionChange.bind(this)} />
                                        </Form.Field>

                                        <Form.Field>
                                            <label>Price</label>
                                            <Input type="text" placeholder="Price" value={item.price} onChange={this.onPriceChange.bind(this)} />
                                        </Form.Field>

                                        <Form.Field>
                                            <label>Item Category</label>
                                            <select
                                                value={this.state.category}
                                                onChange={this.onCategoryChange.bind(this)} >
                                                <option value='Un-Categorised'>Un-Categorised</option>
                                                <option value='Clothing'>Clothing</option>
                                                <option value='Electronics'>Electronics</option>
                                                <option value='Appliances'>Appliances</option>
                                                <option value='Gardening'>Gardening</option>
                                                <option value='Furnitures'>Furnitures</option>
                                                <option value='Motors'>Motors</option>
                                            </select>
                                        </Form.Field>

                                        <Button icon='save' color='blue' content='Update' onClick={this.onSubmit.bind(this)} />
                                    </Form>
                                </Segment>
                            </Segment.Group>
                        </Segment>
                    </Container>
                    :
                    <p>error</p>
                }
            </div>
        );
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }

    NameChange(e) {
        let name = e.target.value;
        let item = Object.assign({}, this.state.item, { name });
        this.setState({ item: item });
    }

    onDescriptionChange(e) {
        let item = Object.assign({}, this.state.item, { description: e.target.value });
        this.setState({ item: item });
    }

    onConditionChange(e) {
        let item = Object.assign({}, this.state.item, { condition: e.target.value });
        this.setState({ item: item });
    }

    onPriceChange(e) {
        let item = Object.assign({}, this.state.item, { price: e.target.value });
        this.setState({ item: item });
    }

    onCategoryChange(e) {
        let item = Object.assign({}, this.state.item, { category: e.target.value });
        this.setState({ item: item });
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        console.log("prop in load user-->", this.props);
        let user = Meteor.users.findOne({ username: Session.get('user').username });
        //let item = ItemCollection.findOne({ "_id": this.props.params.id });
        if (user) {
            this.setState({ user: user });
            this.setState({ location: user.profile.address });
        } else {
            this.setState({ error: "Error>>>" });
        }
        console.log("user-->", user);
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("owner>", this.state.owner);

        let item = Object.assign({}, this.state.item, { owner: this.state.owner, location: this.state.location });
        //item = Object.assign({}, this.state.item, { location: this.state.location });
        //this.setState({ item: item });
        console.log("submited..", item);
        this.props.onSave(item);
    }

    handleImageUpload(file) {
        console.log("upload img..", this.state);
        const CLOUDINARY_UPLOAD_PRESET = 'rudree_cloud';
        const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/rudree/upload';
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        data.append('folder', 'items');
        const xhr = new XMLHttpRequest();
        xhr.open('POST', CLOUDINARY_UPLOAD_URL, false);
        xhr.send(data);
        const imageResponse = JSON.parse(xhr.responseText);
        if ((imageResponse.secure_url !== '') && (this.state.user !== null)) {
            console.log(imageResponse);
            let item = Object.assign({}, this.state.item, { imageUrl: imageResponse.secure_url });
            this.setState({ item: item });
        }
    }
}