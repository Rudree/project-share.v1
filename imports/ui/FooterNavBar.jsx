import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Divider, Icon, Image, Segment } from 'semantic-ui-react'

class FooterNavBar extends React.Component {
  render() {
    return (

      <div>
        <Divider hidden />
        <Segment textAlign='center' color='green' raised inverted>
          <Icon circular inverted color='blue' size="large" name='facebook f' /> |
    <Icon circular inverted color='blue' size="large" name='twitter' />  |
    <Icon circular inverted color='blue' size="large" name='instagram' />  |
    <Icon circular inverted color='blue' size="large" name='google plus' /> |
    <Icon circular inverted color='blue' size="large" name='pinterest' /> |
    <Icon circular inverted color='blue' size="large" name='youtube' /> |
   <h4 color="green">
            SHARE IS A PLATFORM FOR REDUCING RESOURCE USAGE AND RAISING DONATION FOR CHARITY
    </h4>
          <h6>Contact Us | Feedback | Review</h6>
        </Segment>
      </div>

    );
  }
}

export default FooterNavBar;

