import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Icon, Segment, Header, Input, TextArea, Button, Form } from 'semantic-ui-react'

class ContactUs extends React.Component {
  render() {
    return (

      <Segment.Group horizontal >

        <Segment inverted color='blue'>
          <h1>DROP US A MESSAGE!</h1>

          <Form>
            <Input size="large" fluid type="text" name="name" value="" placeholder="Name" /> <br />
            <Input size="large" fluid type="text" name="pn" value="" placeholder="Phone Number" /><br />
            <Input size="large" fluid type="text" name="email" value="" placeholder="Email" /><br />
            <TextArea placeholder='Tell us more' /><br /><br />

            <Button fluid positive>Submit</Button>
          </Form>

        </Segment>

        <Segment inverted color='blue'>
          <br />
          <br />
          <br />
          <Header as='h4'>
            <Icon name='phone' />
            61 4112 4345
                    </Header>

          <Header as='h4'>
            <Icon name='fax' />
            +13 1142 4532
                    </Header>

          <Header as='h4'>
            <Icon name='mail' />
            share_admin@projectshare.com
                    </Header>

        </Segment>

      </Segment.Group>

    );
  }
}

export default ContactUs;

