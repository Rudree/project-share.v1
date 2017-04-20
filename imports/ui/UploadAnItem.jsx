import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { ItemCollection } from '../collections/items.js';
import { Modal, Header, Message, Card, Input, Icon, Image, Button, Divider, Form, Segment } from 'semantic-ui-react'
import { Session } from 'meteor/session';

class UploadItemPage extends React.Component {

  constructor(props) 
  {
    super(props);

    var CurrentDate = new Date();
    this.state = 
    {
      ItemName: 'Tool Name',
      ItemDescription: 'This is a tool for testing the web app !!',
      ItemPrice : 'Free',
      ItemOwner :Session.get('user').username,
      ItemCondition : 'working',
    }

      this.updateStateItemName = this.updateStateItemName.bind(this);
      this.updateStateItemDescription = this.updateStateItemDescription.bind(this);
      this.updateStateItemPrice = this.updateStateItemPrice.bind(this);
      this.updateStateItemOwner = this.updateStateItemOwner.bind(this);
      this.updateStateItemCondition = this.updateStateItemCondition.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  };


   updateStateItemName(event)        {this.setState({ItemName: event.target.value});}
   updateStateItemDescription(event) {this.setState({ItemDescription: event.target.value});}
   updateStateItemPrice(event)       {this.setState({ItemPrice : event.target.value});}
   updateStateItemOwner(event)       {this.setState({ItemOwner : event.target.value});}
   updateStateItemCondition(event)   {this.setState({ItemCondition: event.target.value});}

   
   handleSubmit() {

      var rand = Math.floor((Math.random() * 8)); 
      var Name = this.state.ItemName;
      var Description = this.state.ItemDescription;
      var Price = this.state.ItemPrice;
      var Owner = this.state.ItemOwner;
      var Condition = this.state.ItemCondition;

    console.log("Name: " + this.state.ItemName);
    console.log("Description: " + this.state.ItemDescription);
    console.log("Price: " + this.state.ItemPrice);
    console.log("Owner: " + this.state.ItemOwner);
    console.log("Condition: " + this.state.Condition);

    ItemCollection.insert({Name, Description, Price, Owner, Condition});
}

   render() {
      return (
         <div>

          <Segment.Group>

          <Segment inverted color='blue'>
          <Header as='h2'>
           <Icon name='send outline' />
            <Header.Content>
              Upload your item to the network
            </Header.Content>
          </Header>
          </Segment>

          <Segment.Group horizontal>
          <Segment compact inverted color='green' raised>
          <Form inverted size='big'>

          <Form.Field>
            <label>Item Name</label>
            <Input icon = "registered" type = "text" value = {this.state.ItemName} onChange = {this.updateStateItemName} />            
          </Form.Field>

          <Form.Field>
           <label>Item Description</label>
            <Input icon = "browser" type = "text" value = {this.state.ItemDescription} onChange = {this.updateStateItemDescription} />
          </Form.Field>
           
          <Form.Field>
           <label>Item Price</label>
            <Input icon = "dollar" type = "text" value = {this.state.ItemPrice}  onChange = {this.updateStateItemPrice} />
          </Form.Field>
          
          <Form.Field>
           <label>Item Owner</label>
            <Input icon = "user" type = "text" value = {this.state.ItemOwner} onChange = {this.updateStateItemOwner} />
          </Form.Field>
                            
          <Form.Field>         
           <label>Item Condition</label>
            <select value = {this.state.ItemCondition} onChange= {this.updateStateItemCondition} >    
            <option value='new'>New</option>
            <option value='used'>Used</option>
            <option value='working'>Working</option>
            <option value='partly-working'>Partly Working</option>
            </select>  
           </Form.Field>   
          </Form>
          <Divider hidden/>
           <Modal size='small' dimmer='inverted' color='blue' trigger={  
          <Button size='large' icon='send' color='blue' content='Submit' 
          onClick = {this.handleSubmit}/>
          }>
          <Modal.Header>
            <Header as='h2' icon>
              <Icon name='send' />
              Upload an item
              <Header.Subheader>
                Your item has been uploaded.
              </Header.Subheader>
            </Header>
          </Modal.Header>
          </Modal>
        
          </Segment>
          
          <Segment basic  compact floated='right' textAlign='center'>
            <header as='h2'>
            <Header.Content>
              Preview 
              <Divider/>
            </Header.Content>
            </header>
           <Card>
            <Image src='https://s-media-cache-ak0.pinimg.com/736x/54/7a/9c/547a9cc6b93e10261f1dd8a8af474e03.jpg' />
            <Card.Content>
              <Card.Header>
              {this.state.ItemName}
              </Card.Header>
              <Card.Description>{this.state.ItemDescription}</Card.Description>
              <Divider/>
           
                <span className='date'>
                  Condition : {this.state.ItemCondition} 
                </span>
                <Divider/>
                <span >
                  Price : {this.state.ItemPrice}
                  </span>
                <Divider/>
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
          </Segment>
          </Segment.Group>
          </Segment.Group>
         </div>
   
   
         );
        }
}

export default UploadItemPage;