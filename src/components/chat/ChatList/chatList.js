import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';

class ChatListComponent extends React.Component {

  render() {

    const { classes } = this.props;
    let username = localStorage.getItem("username");
    console.log("+++++++++chat list component ++++++++++++");


    if(this.props.chats) {
      return(
        <div className={classes.root}>
            <Button variant="contained"
              fullWidth
              color='primary'
              onClick={this.newChat}
              className={classes.newChatBtn}>
                New Message
            </Button>
            <List>
              {
                  Object.keys(this.props.chats).map((el, chats) => {
                      console.log(chats);
                  return (
                    <div key={el}>
                      <ListItem onClick={() => this.selectChat(el)}
                        className={classes.listItem}
                        selected={this.props.selectedChatIndex === el}
                        alignItems="flex-start">
                          <ListItemAvatar>

                              <Avatar alt="Remy Sharp">{
                                  (this.props.chats[el][0].sender !== username ) ? this.props.chats[el][0].sender.split('')[0] :  this.props.chats[el][0].receiver.split('')[0]
                              }</Avatar>
                          </ListItemAvatar>

                          <ListItemText
                           primary={
                               (this.props.chats[el][0].sender !== username ) ? this.props.chats[el][0].sender :  this.props.chats[el][0].receiver
                           }
                          secondary={
                            <React.Fragment>
                              <Typography component='span'
                                color='textPrimary'>
                                  {//_chat.messages[_chat.messages.length - 1].message.substring(0, 30) + ' ...'}
                                      this.props.chats[el][0].content.substring(0, 30)
                                  }
                              </Typography>
                            </React.Fragment>
                          }/>
                          {
                              this.props.chats[el].receiverHasRead === false && !this.userIsSender(this.props.chats[el]) ?
                            <ListItemIcon><NotificationImportant className={classes.unreadMessage}/></ListItemIcon> :
                            null
                          }
                      </ListItem>
                      <Divider/>
                    </div>
                  )
                }
                )}

            </List>
        </div>
      );
    } else {
      return(
        <div className={classes.root}>
          <Button variant="contained"
            fullWidth
            color='primary'
            onClick={this.newChat}
            className={classes.newChatBtn}>
              New Message
          </Button>
          <List></List>
        </div>
      );
    }
  }
  userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
  newChat = () => this.props.newChatBtnFn();
  selectChat = (index) => this.props.selectChatFn(index);
}

export default withStyles(styles)(ChatListComponent);













// import React from 'react';
// import './chatList.css';

// class ChatListComponent extends React.Component {
//   render() {
//     if(this.props.chats.length > 0) {
//       return(
//         <div className='chat-list-container'>
//           <button onClick={this.newChat} className='add-new-chat-button'>New Message</button>
//           {
//             this.props.chats.map((_chat, _index) => {
//               return (
//                 <div onClick={() => this.selectChat(_index)} key={_index} className={`individual-chat-container ${this.props.selectedChatIndex === _index ? 'selected-chat' : ''}`}>
//                   <h5>{_chat.users.filter(_user => _user !== this.props.userEmail)[0]}</h5>
//                   <p>{_chat.messages[_chat.messages.length - 1].message.substring(0, 30) + ' ...'}</p>
//                 </div>
//               )
//             })
//           }
//         </div>
//       );
//     } else {
//       return(
//         <div className='chat-list-container'>
//           <button onClick={this.newChat} className='add-new-chat-button'>New Message</button>
//         </div>
//       );
//     }
//   }
//   newChat = () => this.props.newChatBtnFn();
//   selectChat = (index) => this.props.selectChatFn(index);
// }

// export default ChatListComponent;
