import React, { Component, PropTypes } from 'react';
import { Grid, Message } from 'semantic-ui-react';

export default function (props) {
  return (
    <div className="not-found">
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column>
          </Grid.Column>
          <Grid.Column>
            <Message floating negative>
              <h1>Page not found!</h1>
              <p></p>
            </Message>
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}