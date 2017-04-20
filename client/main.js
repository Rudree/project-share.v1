import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Session } from 'meteor/session';

import Home from '../imports/ui/HomePage.jsx';
import Login from '../imports/ui/LoginPage.jsx';
import Register from '../imports/ui/RegistrationPage.jsx';
import ItemPage from '../imports/ui/UploadAnItem.jsx';
import ItemManagementPage from '../imports/manage/ItemAPI.jsx';
import HeadnavBar from '../imports/ui/HeadNavBar.jsx';
import HomeItemGrid from '../imports/ui/HomeItemGrid.jsx';
import developers from '../imports/ui/Developers.jsx';
import ViewAllItems from '../imports/ui/ViewAllItems.jsx';
import FooterNavBar from '../imports/ui/FooterNavBar.jsx';
import Chat from '../imports/ui/Chat.jsx';
import ContactUs from '../imports/ui/ContactUs.jsx';
import Comment from '../imports/manage/MessageAPI.jsx';
import CheckEmailPage from '../imports/ui/CheckEmailPage.jsx';
import VerifiedPage from '../imports/ui/VerifiedPage.jsx';

export const App = ({ children }) => (
  <div>
    <HeadnavBar />
    {children}
    <FooterNavBar />
  </div>
); 

Meteor.startup(() => {
  render(
    <Router history={hashHistory}>
      <Route path="/" component={App}>
      <Route path="home" component={Home} />
      <Route path="register" component={Register} />
      <Route path="login" component={Login} />
      <Route path="uploaditem" component={ItemPage} />
      <Route path="manageitem" component={ItemManagementPage} />
      <Route path="itemgrid" component={HomeItemGrid} />
      <Route path="developers" component={developers} />
      <Route path="viewall" component={ViewAllItems} />
      <Route path="chat" component={Chat} />
      <Route path="contactus" component={ContactUs} />
      <Route path="comment" component={Comment} />
      <Route path="verify-email/:token" onEnter={VerifyEmail} component={Home} />
      <Route path="check-email" component={CheckEmailPage} />
      </Route>
    </Router>, document.getElementById('render-home')
  );
});

export function VerifyEmail(nextState, replace) {
  if (!Accounts.verifyEmail(nextState.params.token)) {
    replace({
      pathname: "/verified",
      state: { nextPathname: nextState.location.pathname }
    });
  }
}