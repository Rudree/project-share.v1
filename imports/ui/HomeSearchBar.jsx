import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Grid,Input, Modal, Icon, Divider, Image, Header, Button, Container } from 'semantic-ui-react'

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
      <Container text>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Input size='large' icon={<Icon name='search' circular link />} placeholder='Search...' value={this.state.searchterm} onChange={this.updateStateSearchTerm.bind(this)} />
              </Grid.Column>
              <Grid.Column>
              <Modal trigger={<Button size='medium' color='green' > Search </Button>}>
                <Modal.Header>You searched for : {this.state.searchterm}</Modal.Header>
                <Modal.Content>
                  {this.renderResults()}
                </Modal.Content>
              </Modal>
              </Grid.Column>
              </Grid.Row>
              </Grid>          
      </Container>
            );

  }
}

export default createContainer(() => {
  return {
              items: ItemCollection.find({Name: 'A' }, {sort: {Name: 1 } }).fetch()

  };
}, HomeSearchBar);


/*    <div>
              <Input size='large' icon={<Icon name='search' circular link />} placeholder='Search...' value={this.state.searchterm} onChange={this.updateStateSearchTerm} />
              <Modal trigger={<Button size='large' onClick={this.handleSubmit}> Search </Button>}>
                <Modal.Header>You searched for : {this.state.searchterm}</Modal.Header>
                <Modal.Content>
                  {this.renderResults()}
                </Modal.Content>
              </Modal>

            </div>*/