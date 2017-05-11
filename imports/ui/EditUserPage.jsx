import React from 'react';
import { Image, Grid, Message, Button, Header, Icon, Modal, Form, Input, TextArea, Divider, Segment } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import FormData from 'form-data';
import NotFoundPage from './NotFoundPage.jsx';

export default class UserEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: null,
            profile: null,
            uploadedFile: null,
            uploadedFileCloudinaryUrl: "",
            droppedImage: null,
            modalOpen: false,
            aboutMe: "",
            firstName: "",
            lastName: "",
            address: ""
        };
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        console.log("file>> ", files[0]);
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        const CLOUDINARY_UPLOAD_PRESET = 'rudree_cloud';
        const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/rudree/upload';
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        data.append('folder', 'user');
        const xhr = new XMLHttpRequest();
        xhr.open('POST', CLOUDINARY_UPLOAD_URL, false);
        xhr.send(data);
        const imageResponse = JSON.parse(xhr.responseText);
        if ((imageResponse.secure_url !== '') && (this.state.user !== null)) {

            this.setState({
                uploadedFileCloudinaryUrl: imageResponse.secure_url
            });
            this.setState({
                droppedImage: imageResponse.secure_url
            });
            Meteor.call("updateUserAvatarUrl", imageResponse.secure_url, this.state.user._id, (callback) => {
                console.log(callback);
            });
            this.loadUser();
        }
    }


    render() {
        let { address, firstName, lastName, aboutMe, user, error, profile, uploadedFile, uploadedFileCloudinaryUrl, hover, modalOpen, droppedImage } = this.state;
        console.log(this.state);
        return (
            <div>
                {user ?
                    <Grid>
                        <Grid.Row columns={4}>
                            <Grid.Column>
                            </Grid.Column>

                            <Grid.Column>
                                <Segment padded='very'>
                                    <Image src={this.state.uploadedFileCloudinaryUrl} />
                                    <Modal trigger={<Button icon='edit' color='blue' onClick={this.handleOpen.bind(this)} />} basic size='small' open={this.state.modalOpen} onClose={this.handleClose}>
                                        <Modal.Header>Select a Photo</Modal.Header>
                                        <Modal.Content image>
                                            <Grid>
                                                <Grid.Row columns={3}>
                                                    <Grid.Column>
                                                        <Dropzone
                                                            onDrop={this.onImageDrop.bind(this)}
                                                            multiple={false}
                                                            accept="image/*">
                                                            <div>Drop an image or click to select a file to upload.</div>
                                                        </Dropzone>
                                                    </Grid.Column>

                                                    <Grid.Column>
                                                    </Grid.Column>
                                                    <Grid.Column>

                                                        {this.state.droppedImage ?
                                                            <div>
                                                                <Image wrapped size='medium' src={this.state.droppedImage} />
                                                            </div>
                                                            : <p></p>}
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='green' inverted onClick={this.handleClose.bind(this)}>
                                                <Icon name='checkmark' /> Update </Button>
                                        </Modal.Actions>
                                    </Modal>
                                </Segment>
                            </Grid.Column>

                            <Grid.Column>
                                <Form size='small'>
                                    <Form.Field>
                                        <label>First Name</label>
                                        <Input type="text" placeholder="First Name" value={this.state.firstName} onChange={this.onFirstNameChange.bind(this)} />
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Last Name</label>
                                        <Input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.onLastNameChange.bind(this)} />
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Address</label>
                                        <Input type="text" placeholder="Suburb" value={this.state.address} onChange={this.onAddressChange.bind(this)} />
                                    </Form.Field>

                                    <Form.Field>
                                        <label>About Me</label>
                                        <TextArea placeholder='Enter short description about yourself.' autoHeight value={this.state.aboutMe} onChange={this.onAboutMeChange.bind(this)} />
                                    </Form.Field>

                                    <Button icon='save' color='blue' content='Update' onClick={this.onSubmit.bind(this)} />
                                </Form>
                            </Grid.Column>

                            <Grid.Column>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                    : <NotFoundPage />}}
               </div>
        )
    }

    onFirstNameChange(e) {
        this.setState({ firstName: e.target.value });
    }

    onLastNameChange(e) {
        this.setState({ lastName: e.target.value });
    }

    onAddressChange(e) {
        this.setState({ address: e.target.value });
    }

    onAboutMeChange(e) {
        this.setState({ aboutMe: e.target.value });
    }

    handleOpen(e) {
        this.setState({ modalOpen: true });
    }

    handleClose(e) {
        this.setState({ modalOpen: false });
        if (this.state.droppedImage != null) {
            this.setState({ uploadedFileCloudinaryUrl: this.state.droppedImage });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        let profile = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            aboutMe: this.state.aboutMe,
        }
        console.log("profile>> ", profile);
        Meteor.call('updateUserProfileData', this.state.user._id, profile, (callback) => {
            console.log("callback>> ", callback);
        });

    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        let user = Meteor.users.findOne({ username: this.props.params.username });
        if (user) {
            let profile = user.profile;
            this.setState({ user: user });
            this.setState({ profile: user.profile });
            this.setState({ firstName: profile.firstName });
            this.setState({ lastName: profile.lastName });
            this.setState({ uploadedFileCloudinaryUrl: profile.avatarUrl });
        } else {
            this.setState({ error: "Error>>>" });
        }
    }
}