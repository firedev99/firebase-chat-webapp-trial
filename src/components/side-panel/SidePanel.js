import React, { Component } from 'react'
import { Menu } from "semantic-ui-react";
//components
import UserPanel from './UserPanel';
import Channels from './Channels';
import DirectMessages from './DirectMessages';
import Starred from './Starred';

class SidePanel extends Component {
    render() {
        const { currentUser, primaryColor, secondaryColor } = this.props;
        return (
            <Menu
                size="large"
                inverted
                fixed="left"
                vertical
                style={{ background: secondaryColor, fontSize: "1.2rem" }}
            >
                <UserPanel secondaryColor={secondaryColor} primaryColor={primaryColor} currentUser={currentUser} />
                <Starred currentUser={currentUser} />
                <Channels currentUser={currentUser}/>
                <DirectMessages currentUser={currentUser} />
            </Menu>
        )
    }
}

export default SidePanel;