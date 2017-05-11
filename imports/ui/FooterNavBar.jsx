import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Divider, Icon, Image, Segment } from 'semantic-ui-react'

class FooterNavBar extends React.Component {
  render() {
    return (

      <div>
        <Divider hidden />
        <Segment textAlign='center' color="green" raised>
          <h4 color="green">
            SHARE IS A PLATFORM FOR REDUCING RESOURCE USAGE AND RAISING DONATION FOR CHARITY
    </h4>
       <h5 color="green"><a href='#/contactus' >Contact Us</a></h5>
        </Segment>
      </div>

    );
  }
}

export default FooterNavBar;

