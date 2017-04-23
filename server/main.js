import { Meteor } from 'meteor/meteor';
import '../imports/collections/items.js';
import '../imports/collections/messages.js'



Meteor.startup(() => {
  // code to run on server at startup
 //add process.env.MAIL_URL here
});

Meteor.methods({
  serverVerifyEmail: function (email, userId, callback) {
    console.log("Email to verify:" + email + " | userId: " + userId);
    // this needs to be done on the server.
    return Accounts.sendVerificationEmail(userId, email);
  },

  serverValidateUser: function (user, callback) {
    if (user.username.length < 5) {
      throw new Meteor.Error(403, 'Your username needs at least 5 characters');
    }

    var passwordTest = new RegExp("(?=.{6,}).*", "g");
    if (passwordTest.test(user.password) == false) {
      throw new Meteor.Error(403, 'Your password is too weak!');
    }

    var emailTest = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
    if(emailTest.test(user.email) == false) {
       throw new Meteor.Error(403, 'Invalid email address!');
    }

    return true;
  }

});
