import React, { Component, PropTypes } from 'react';
import Message from 'semantic-ui-react';

export default function(props) {
  return (
    <div className="welcome">
        <h1>Verification Email Sent</h1>
        <p>Please check your Email</p>
    </div>
  );
}