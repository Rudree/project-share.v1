import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import FormData from 'form-data';
import { ItemCollection } from '../../collections/items.js';
import {label, Grid, Container, TextArea, Modal, Header, Message, Card, Input, Icon, Image, Button, Divider, Form, Segment } from 'semantic-ui-react'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            //user: Object.assign({}, props.user),
            profile: Object.assign({}, props.profile)
        };
    }

    render() {
        let { profile, error } = this.state;
        console.log("form user..", this.state);
        //let { profile } = this.props.user.profile;
        console.log("--->", profile);
        return (
            <div>
                {profile ?
                    <Container text>
                        <Segment inverted color='green' padded="very">
                            <Header as='h3'>
                                <Icon.Group size='large'>
                                    <Icon name='user' />
                                    <Icon corner name='add' />
                                </Icon.Group>
                                User Profile
                        </Header>

                            <Segment.Group>
                                <Segment compact raised >
                                    <Form size='small'>
                                        <label>User Avatar</label>
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
                                                        {profile.avatarUrl === '' ? null :
                                                            <Image src={profile.avatarUrl} size="medium" />}
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Segment>

                                        <Form.Field>
                                            <label>First Name</label>
                                            <Input type="text" placeholder="First Name" value={profile.firstName} onChange={this.onFirstNameChange.bind(this)} />
                                        </Form.Field>

                                        <Form.Field>
                                            <label>Last Name</label>
                                            <Input type="text" placeholder="Last Name" value={profile.lastName} onChange={this.onLastNameChange.bind(this)} />
                                        </Form.Field>

                                        <Form.Field>
                                            <label>Address</label>                  
                                            <Input type="text" placeholder="Suburb" value={profile.address} onChange={this.onAddressChange.bind(this)} />
                                        </Form.Field>

                                        <Form.Field>
                                            <label>About me</label>
                                            <TextArea placeholder='Enter short description about item.' autoHeight value={profile.aboutMe} onChange={this.onAboutMeChange.bind(this)} />
                                        </Form.Field>

                                        <Button icon='save' color='blue' content='Save' onClick={this.onSubmit.bind(this)} />
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


    onFirstNameChange(e) {
        let firstName = e.target.value;
        let profile = Object.assign({}, this.state.profile, { firstName });
        this.setState({ profile: profile });
    }

    onLastNameChange(e) {
        let lastName = e.target.value;
        let profile = Object.assign({}, this.state.profile, { lastName });
        this.setState({ profile: profile });
    }

    onAddressChange(e) {
        let address = e.target.value;
        let profile = Object.assign({}, this.state.profile, { address });
        this.setState({ profile: profile });
    }

    onAboutMeChange(e) {
        let aboutMe = e.target.value;
        let profile = Object.assign({}, this.state.user, { aboutMe });
        this.setState({ profile: profile });
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }


    onSubmit(e) {
        e.preventDefault();
        //this.setState({ profile });
        //let user = Object.assign({}, this.state.user, { profile :this.state.profile} );
        console.log("submited..", this.state);
        this.props.onSave(this.state.profile);
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
            let profile = Object.assign({}, this.state.profile, { avatarUrl: imageResponse.secure_url });
            this.setState({ profile: profile });
        }
    }
}