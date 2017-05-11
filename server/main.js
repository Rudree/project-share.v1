import { Meteor } from 'meteor/meteor';
import '../imports/collections/items.js';
import '../imports/collections/messages.js'

Meteor.startup(() => {
  // code to run on server at startup
  //add process.env.MAIL_URL here
  process.env.MAIL_URL = "smtp://postmaster@sandbox60ea7d6f8f844c7795521e2432ecbd6d.mailgun.org:fd369a3ccd980a42e268e373f0f14240@smtp.mailgun.org:587";

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
    if (emailTest.test(user.email) == false) {
      throw new Meteor.Error(403, 'Invalid email address!');
    }

    return true;
  },

  updateUserAvatarUrl: function (avatarUrl, userId, callback) {
    console.log("saving image URl...");
    Meteor.users.update(userId, {
      $set: { "profile.avatarUrl": avatarUrl }
    });
    return true;
  },

  updateUserProfileData: function (user, profile, callback) {
    console.log("saving user profile", user, profile);
 
    Meteor.users.update(user, {
      $set: { "profile": profile }
    });
    return true;
  }

});

Meteor.publish("users", function () {
  return Meteor.users.find({}, { fields: { createdAt: true, profile: true, emails: true, username: true } });
});