import React, { Component, PropTypes } from 'react';
import { Grid, Message } from 'semantic-ui-react';

export default function (props) {
  return (
    <div className="verify-email">
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column>
          </Grid.Column>
          <Grid.Column>
            <Message floating>
              <h1>Thank you!</h1>
              <p>your account is varified now.</p>
            </Message>
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}