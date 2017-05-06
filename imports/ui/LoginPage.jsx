import React, { Component, PropTypes } from 'react';
import { hashHistory, Link } from 'react-router';
import { Header, Card, Grid, Input, Icon, Image, Button, Divider, Form, Segment, Message } from 'semantic-ui-react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state =
      {
        error: "",
        username: "",
        password: ""
      }
  };

  render() {
    let { error, username, password } = this.state;
    return (
      <div>
        
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
            </Grid.Column>
            
            <Grid.Column>
             
          <Segment>
            <Header as='h2'>
              <Header.Content>
                User Login
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

    Meteor.loginWithPassword(this.state.username, this.state.password, (err) => {
      console.log("You initiated the login process.");
      console.log(this.state.username, this.state.password);
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.props.currentUser = Meteor.user();
        if (Meteor.user()) {
          Session.set('user', Meteor.user());
        }
        hashHistory.push(`/user/${this.state.username}`);
      }
    });

  }
}
