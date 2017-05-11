import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Input, Label, Menu, Icon, Segment, Header } from 'semantic-ui-react'

import { ItemCollection } from '../collections/items.js';
class HomeSideMenu extends React.Component {


  render() {

    return (

      <Menu size='large' vertical>
        <Menu.Header>
          <Header
            as='h4'
            image='http://www.sitepronews.com/wp-content/uploads/2014/02/logo-icon.png'
            content='Categories'
          />
        </Menu.Header>

        <Menu.Item name='spam' >
          <Label color='red'>C</Label>
          Clothing
        </Menu.Item>

        <Menu.Item name='inbox' >
          <Label color='blue'>E</Label>
          Electronics
        </Menu.Item>

        <Menu.Item name='updates'>
          <Label color='yellow'>A</Label>
          Appliances
        </Menu.Item>

        <Menu.Item name='updates'>
          <Label color='green'>T</Label>
          Gardening
        </Menu.Item>

        <Menu.Item name='updates'>
          <Label color='brown'>F</Label>
          Furnitures
        </Menu.Item>

        <Menu.Item name='updates'>
          <Label color='orange'>M</Label>
          Motors
        </Menu.Item>
      </Menu>
    );
  }
}

export default HomeSideMenu;