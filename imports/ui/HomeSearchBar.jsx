import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Input, Modal, Icon, Divider, Image, Header, Button } from 'semantic-ui-react'

import { ItemCollection } from '../collections/items.js';

import Item from '../objects/ItemCardFull.jsx';

class HomeSearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state =
      {
        searchterm: ''
      }

    this.updateStateSearchTerm = this.updateStateSearchTerm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  updateStateSearchTerm(event) { this.setState({ searchterm: event.target.value }); }

  handleSubmit() {
    console.log("Searchterm: " + this.state.searchterm);
    console.log(global);
  }

  renderResults() {
    return this.props.items.map((item) => (
      <Item key={item._id} item={item} />
    ));
  }



  render() {
    return (
      <div>
        <Input size='large' icon={<Icon name='search' circular link />} placeholder='Search...' value={this.state.searchterm} onChange={this.updateStateSearchTerm} />
        <Modal trigger={<Button size='large' onClick={this.handleSubmit}> Search </Button>}>
          <Modal.Header>You searched for : {this.state.searchterm}</Modal.Header>
          <Modal.Content>
            {this.renderResults()}
          </Modal.Content>
        </Modal>

      </div>
    );

  }
}

export default createContainer(() => {
  return {
    items: ItemCollection.find({ Name: 'A' }, { sort: { Name: 1 } }).fetch()

  };
}, HomeSearchBar);
