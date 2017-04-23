import React, { Component, PropTypes } from 'react';
import { Grid, Message } from 'semantic-ui-react';

export default function(props) {
  return (
    <div className="check-email">
      <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
            </Grid.Column>           
            <Grid.Column>
              <Message floating>
        <h1>Verification Email Sent</h1>
        <p>Please check your Email</p>
        </Message>
         </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    </div>
  );
}