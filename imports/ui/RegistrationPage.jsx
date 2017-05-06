import React, { Component, PropTypes } from 'react';
import { hashHistory, Link } from 'react-router';
import { Header, Message, Grid, Card, Input, Icon, Image, Button, Divider, Form, Segment, Modal } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';

export default class RegistrationPage extends Component {

  constructor(props) {
    super(props);

    this.state =
      {
        modalOpen: false,
        message: "",
        error: "",
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
      }
  };

  render() {
    let { firstName, lastName, email, username, password, error, message } = this.state;
    return (
      <div>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as='h2'>
                  <Icon name='save' />
                  <Header.Content>
                    User Registration
            </Header.Content>
                </Header>
              </Segment>

              <Segment.Group horizontal compact>
                <Segment inverted color='green' raised circular>

                  {error.length > 0 ?
                    <Message negative>
                      <Message.Header>Error!</Message.Header>
                      <p>{error}</p>
                    </Message>
                    : ''}

                  <Form inverted size='small'>
                    <Form.Field>
                      <label>First Name</label>
                      <Input type="text" value={this.state.firstName} onChange={this.onFirstNameChange.bind(this)} />
                    </Form.Field>

                    <Divider hidden />

                    <Form.Field>
                      <label>Last Name</label>
                      <Input type="text" value={this.state.lastName} onChange={this.onLastNameChange.bind(this)} />
                    </Form.Field>

                    <Divider hidden />

                    <Form.Field>
                      <label>Email</label>
                      <Input type="text" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                    </Form.Field>

                    <Divider hidden />

                    <Form.Field>
                      <label>Username</label>
                      <Input type="text" value={this.state.username} onChange={this.onUsernameChange.bind(this)} />
                    </Form.Field>

                    <Divider hidden />

                    <Form.Field>
                      <label>Password</label>
                      <Input type="password" value={this.state.Password} onChange={this.onPasswordChange.bind(this)} />
                    </Form.Field>
                  </Form>
                  <Divider hidden />
                  <Button icon='save' color='blue' content='Sign On' onClick={this.onSubmit.bind(this)} />

                </Segment>
              </Segment.Group>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }


  onFirstNameChange(e) {
    let firstName = e.target.value;
    this.setState({ firstName: firstName });
  }

  onLastNameChange(e) {
    let lastName = e.target.value;
    this.setState({ lastName: lastName });
  }

  onEmailChange(e) {
    let email = e.target.value;
    this.setState({ email: email });
  }

  onUsernameChange(e) {
    let username = e.target.value;
    this.setState({ username: username });
  }

  onPasswordChange(e) {
    let password = e.target.value;
    this.setState({ password: password });
  }

  onSubmit(e) {
    e.preventDefault();

    var user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      profile: {
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }
    };

    Meteor.call('serverValidateUser', user, (callback) => {
      if (callback) {
        this.setState({ error: callback.reason });
      } else {
        Accounts.createUser({
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          profile: {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            avatarUrl: 'http://res.cloudinary.com/rudree/image/upload/v1493390709/user/default.png',
            address: "",
            aboutMe: ""
          }
        }, (err) => {
          if (err) {
            this.setState({ error: err.reason });
          } else {
            var userId = Meteor.userId();
            Meteor.call('serverVerifyEmail', this.state.email, userId, (callback) => {
              if (!callback) {
                console.log("Verification Email Sent");
                if (Meteor.user()) {
                  Session.set('user', Meteor.user());
                }
                hashHistory.push('/check-email');
              } else {
                this.setState({ error: callback.reason });
              }
            });
          }
        });
      }
    })


  }
}
