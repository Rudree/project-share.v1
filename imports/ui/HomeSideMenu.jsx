import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Input, Label, Menu, Icon } from 'semantic-ui-react'

import { ItemCollection } from '../collections/items.js';

class HomeSideMenu extends React.Component {


  render() {

    return (
      <Menu vertical fluid>
        <Menu.Item name='inbox' >
          <Label color='teal'>1</Label>
          Inbox
        </Menu.Item>

        <Menu.Item name='spam' >
          <Label>51</Label>
          Spam
        </Menu.Item>

        <Menu.Item name='updates'>
          <Label>1</Label>
          Updates
        </Menu.Item>
        <Menu.Item>
          <Input icon='search' placeholder='Search mail...' />
        </Menu.Item>
      </Menu>
    );
  }
}

export default HomeSideMenu;