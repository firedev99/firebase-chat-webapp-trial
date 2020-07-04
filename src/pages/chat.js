import React from 'react'
import { Grid } from "semantic-ui-react";
//redux 
import { connect } from 'react-redux';
//components 
import ColorPanel from '../components/color-panel/ColorPanel';
import Messages from "../components/messages/Messages";
import SidePanel from "../components/side-panel/SidePanel";
import MetaPanel from "../components/meta-panel/MetaPanel";


const Chat = ({ currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor }) => {
    return (
        <Grid className="app" columns="equal" style={{ background: primaryColor }}>
            <ColorPanel currentUser={currentUser} key={currentUser && currentUser.name} />
            <SidePanel 
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                currentUser={currentUser} 
                key={currentUser && currentUser.id}
            />
            <Grid.Column style={{ marginLeft: 320 }}>
                <Messages 
                    key={currentChannel && currentChannel.id }
                    currentChannel={currentChannel}
                    currentUser={currentUser}
                    isPrivateChannel={isPrivateChannel}
                />
            </Grid.Column> 
            <Grid.Column width={4}>
                <MetaPanel 
                    userPosts={userPosts}
                    isPrivateChannel={isPrivateChannel} 
                    key={currentChannel && currentChannel.name} 
                    currentChannel={currentChannel}
                />
            </Grid.Column>
        </Grid>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel,
    isPrivateChannel: state.channel.isPrivateChannel,
    userPosts: state.channel.userPosts,
    primaryColor: state.colors.primaryColor,
    secondaryColor: state.colors.secondaryColor
})

export default connect(mapStateToProps)(Chat);
