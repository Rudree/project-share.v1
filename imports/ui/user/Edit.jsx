import React from 'react';
import { hashHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Modal, Header, Message, Card, Input, Icon, Image, Button, Divider, Form, Segment } from 'semantic-ui-react'
import { Session } from 'meteor/session';
import UserForm from './Form.jsx';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: null,
            profile: null
        };
    }

    render() {
        let { error, user, profile } = this.state;
        console.log("edit user..", this.state);
        return (
            <div>
                {profile ? 
                    <UserForm profile={profile}  onSave={this.onUserUpdate.bind(this)} />
                :<p></p>}
            </div>
        );
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        console.log("prop in load user-->", this.props);
        let user = Meteor.users.findOne({ username: this.props.params.username });
        //let item = ItemCollection.findOne({ "_id": this.props.params.id });
        if (user) {
            this.setState({ user: user });
            this.setState({ profile: user.profile });
        } else {
            this.setState({ error: "Error>>>" });
        }
        console.log("user-->", user);
    }

  
  onUserUpdate(profile) {
      console.log("profile received...",profile);
      console.log(this.state.user);
    //   let profile = {
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         address: user.address,
    //         aboutMe: user.aboutMe,
    //         avatarUrl: user.avatarUrl
    //     }
        console.log("profile>> ", profile);
        Meteor.call('updateUserProfileData', this.state.user._id, profile, (callback) => {
            console.log("callback>> ", callback);
        });
        hashHistory.push(`/dashboard/${this.state.user.username}`);

        // console.log("onItemedit.........",item);
        // ItemCollection.update(item._id,{
        //    name: item.name,
        //    imageUrl : item.imageUrl,
        //    description: item.description,
        //    condition: item.condition,
        //    value: item.value
        // });
        // hashHistory.push(`/dashboard`);
    }
}

