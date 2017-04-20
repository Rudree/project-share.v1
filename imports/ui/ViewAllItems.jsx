import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Image, Table, CardGroup, Segment, Statistic } from 'semantic-ui-react'

import { ItemCollection } from '../collections/items.js';

import Item from '../objects/ItemCardFull.jsx';

class ItemViewAll extends React.Component {

    renderItemsList() {
        return this.props.items.map((item) => (
            <Item key={item._id} item={item} />
        ));

        //new Counter('Count', ItemCollection.find());

    }

    render() {
        return (
            <div>
                <Segment raised>
                    <Segment>
                        <Statistic.Group>
                            <Statistic>
                                <Statistic.Value>
                                    <Image src='https://www.moh.io/box/mohiomap-boxbeta/images/privacy/database.svg' className='circular inline' />
                                    {ItemCollection.find().count()}
                                </Statistic.Value>
                                <Statistic.Label>Items On The Network</Statistic.Label>
                            </Statistic>
                            <Statistic>
                                <Statistic.Value>
                                    <Image src='https://www.moh.io/box/mohiomap-boxbeta/images/privacy/database.svg' className='circular inline' />
                                    {ItemCollection.find({ Price: 'Free' }).count()}
                                </Statistic.Value>
                                <Statistic.Label>Items Are Free</Statistic.Label>
                            </Statistic>
                            <Statistic>
                                <Statistic.Value>
                                    <Image src='https://www.moh.io/box/mohiomap-boxbeta/images/privacy/database.svg' className='circular inline' />
                                    {ItemCollection.find({ Condition: 'working' }).count()}
                                </Statistic.Value>
                                <Statistic.Label>Items Are in <div> working Condition </div></Statistic.Label>
                            </Statistic>
                        </Statistic.Group>
                    </Segment>
                    <Segment >
                        <CardGroup>
                            {this.renderItemsList()}
                        </CardGroup>
                    </Segment>
                </Segment>
            </div>
        );
    }

}

ItemViewAll.propTypes = {
    items: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        items: ItemCollection.find({}, { sort: { Name: 1 } }).fetch()
    };
}, ItemViewAll);