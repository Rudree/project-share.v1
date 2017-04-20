import React, { Component, PropTypes, Props } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Icon, Menu, Segment, Grid, Message } from 'semantic-ui-react'

class Developers extends React.Component {


  render() {
    return (
      <div>

        <Card>
          <Image src='https://s-media-cache-ak0.pinimg.com/736x/54/7a/9c/547a9cc6b93e10261f1dd8a8af474e03.jpg' />
          <Card.Content>
            <Card.Header>
              {this.state.ItemName}
            </Card.Header>
            <Card.Description>{this.state.ItemDescription}</Card.Description>
            <Divider />

            <span className='date'>
              Condition : {this.state.ItemCondition}
            </span>
            <Divider />
            <span >
              Price : {this.state.ItemPrice}
            </span>
            <Divider />
            <span>
              Owner : {this.state.ItemOwner}
            </span>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button icon='add to cart' basic color='green' content='Borrow'></Button>
              <Button icon='talk outline' basic color='blue' content='Message  Owner'></Button>
            </div>
          </Card.Content>
        </Card>


      </div>
    );
  }
}

export default Developers;









