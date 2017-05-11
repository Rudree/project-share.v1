import React, { Component, PropTypes } from 'react';
import { ItemCollection } from '../collections/items.js';
import {Button, Card, Image, Segment, Divider} from 'semantic-ui-react';
  
// Task component - represents a single todo item
export default class ItemCard extends Component {


 toggleChecked() {
    // Set the checked property to the opposite of its current value
    ItemCollection.update(this.props.item._id, {
      $set: { checked: !this.props.item.checked },
    });
  }
 
  removeItem() {
    ItemCollection.remove(this.props.item._id);
  }

  render() {
      const itemClassName = this.props.item.checked ? 'checked' : '';

    return (

           <Card >
            <Image src='https://s-media-cache-ak0.pinimg.com/736x/54/7a/9c/547a9cc6b93e10261f1dd8a8af474e03.jpg' />
            <Card.Content>
              <Card.Header>
              {this.props.item.Name}
              </Card.Header>
              <Card.Description>{this.props.item.Description}</Card.Description>
              <Divider/>
           
                <span className='date'>
                  Condition : {this.props.item.Condition} 
                </span>
                <Divider/>
                <span >
                  Price : {this.props.item.Price}
                  </span>
                <Divider/>
                 <span>
                  Owner : {this.props.item.Owner}
                  </span>
               </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                  <Button icon='add to cart' basic color='green' content='Borrow'></Button>
                  <Button icon='talk outline' basic color='blue' content='Message  Owner'></Button>
                </div>
            </Card.Content>
          </Card>
      );
    }
  }
  
ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};