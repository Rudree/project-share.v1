import React, { Component, PropTypes, Props } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Icon, Menu, Segment, Grid, Dropdown, Item, Image, Container } from 'semantic-ui-react';
import { Session } from 'meteor/session';

class HeadNavBar extends React.Component {

  constructor() {
    super();
    this.RedirectHome = this.RedirectHome.bind(this);
    this.RedirectLogin = this.RedirectLogin.bind(this);
    this.RedirectRegister = this.RedirectRegister.bind(this);
    this.RedirectUploaditem = this.RedirectUploaditem.bind(this);
    this.RedirectManageitem = this.RedirectManageitem.bind(this);
    this.RedirectItemGrid = this.RedirectItemGrid.bind(this);
    this.RedirectContactUs = this.RedirectContactUs.bind(this);
    this.RedirectLogout = this.RedirectLogout.bind(this);
  }

  RedirectHome(event, { name }) {
    event.preventDefault();
    this.props.history.push('/home');
  }

  RedirectLogin(event, { name }) {
    event.preventDefault();
    this.props.history.push('/login');
  }

  RedirectRegister(event, { name }) {
    event.preventDefault();
    this.props.history.push('/register');
  }

  RedirectUploaditem(event, { name }) {
    event.preventDefault();
    this.props.history.push('/uploaditem');
  }

  RedirectManageitem(event, { name }) {
    event.preventDefault();
    this.props.history.push('/manageitem');
  }

  RedirectItemGrid(event, { name }) {
    event.preventDefault();
    this.props.history.push('/itemgrid');
  }

  RedirectContactUs(event, { name }) {
    event.preventDefault();
    this.props.history.push('/contactus');
  }

  RedirectLogout(event, { name }) {
    event.preventDefault();
    Meteor.logout();
    Session.set("user", null);
    hashHistory.push('/home');
  }

  render() {
    var user = Session.get('user');
    return (
      <Grid>
        <Grid.Column width={2} textAlign='center'>
          <Image src='https://image.ibb.co/hb0nQk/share_logo.png' size='small' />
        </Grid.Column>
        <Grid.Column width={14}>
          <Menu size='huge' color='green' inverted>
            <Menu.Item name='Home' href="#/home"  >
              <Icon name='home' />
              Home
              </Menu.Item>

            {!user ?
              <Menu.Menu position='right'>
                <Menu.Item name="user" href="#/login">
                  <Icon name='sign in' />
                  Login
                </Menu.Item>

                <Menu.Item name='Register' href="#/register">
                  <Icon name='users' />
                  Register
              </Menu.Item>
              </Menu.Menu>
              : ""}

            {user ?
              <Menu.Menu position='right'>
                <Dropdown item text={user.username}>
                  <Dropdown.Menu>
                    <Dropdown.Item name='Logout' onClick={this.RedirectLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
              : ""}
          </Menu>
        </Grid.Column>
      </Grid>
    );
  }
}

export default HeadNavBar;









