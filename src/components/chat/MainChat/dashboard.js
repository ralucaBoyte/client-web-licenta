import React, {Component} from 'react';
import NewChatComponent from '../NewChat/newChat';
import ChatListComponent from '../ChatList/chatList';
import ChatViewComponent from '../ChatView/chatView';
import ChatTextBoxComponent from '../ChatTextBox/chatTextBox';
import styles from './styles';
import { Button, withStyles } from '@material-ui/core';
//const firebase = require("firebase");
import SockJS from "sockjs-client";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import axios from "axios";


let stompClient = null;
let api_ws = `http://localhost:8765/chat`;
class DashboardComponent extends Component {



  constructor() {
    super();
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      friends: [],
      chats: [],
      username: localStorage.getItem("username"),
    };

    this.connect();
  }

  componentDidMount = async () => {

    const config = {
      headers: {
        "content-type": "application/json"
      }
    };

    let user = localStorage.getItem("username");
    const data = JSON.stringify({
      username: user,
    });
    console.log("+++++++++++++++++GET ALL USERS++++++++++++++++");
    try {
      const url = "http://localhost:8765/chat/users";
      const url2 = "http://localhost:8765/chat/custom2";

      let res = await axios.get(url);
      let res2 = await axios.post(url2, data, config);

      this.setState({
        chats:  res2.data,
        friends: res.data,
        curTime: 'io'
      });
    } catch (e) {
      console.log(e);
    }
    console.log("+++++++++++++++++++++++++++++++++++++++++++++");
  };

  componentWillUnmount() {
    stompClient.unsubscribe();
  }

  connect = ()  =>{

    const Stomp = require('stompjs');
    let SockJS = require('sockjs-client');
    SockJS = new SockJS(api_ws + '/ws');
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, this.onConnected, this.onError);
  };

  onConnected = () => {

    this.setState({
      channelConnected: true
    });

    // Subscribing to the public topic
    stompClient.subscribe('/user/' + this.state.username.toString().toLowerCase() + '/reply', this.onMessageReceived);

    // Registering user to server as a public chat user
    stompClient.send(api_ws + "/app/addPrivateUser", {}, JSON.stringify({ username: this.state.username}))

  };
  sendMessage = (receiver, content) => {

    if (stompClient) {
        let chatMessage = {
        sender: this.state.username,
        receiver: receiver,
        content: content
      };
      // send public message
      stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
    }
  };

  onMessageReceived = (payload) => {

    console.log("I received this upon subscribe to the ws endpoint");
    console.log(payload);
    let message = JSON.parse(payload.body);
    console.log(message.receiver);
    console.log(message.sender);
    console.log(message.content);
    console.log(message.conversation_id);

    let new_chats = this.state.chats.slice();

    new_chats[message.conversation_id].push(message);
    console.log("new chats");
    console.log(new_chats);

    this.setState({
      chats: new_chats
    })
  };

  onError = (error) => {
    this.setState({
      error: 'Could not connect you to the Chat Room Server. Please refresh this page and try again!'
    })
  };

  render() {

    const { classes } = this.props;

      return(
        <div className='dashboard-container' id='dashboard-container'>
          <ChatListComponent history={this.props.history}
            userEmail={this.state.email}
            selectChatFn={this.selectChat}
            chats={this.state.chats}
            selectedChatIndex={this.state.selectedChat}
            newChatBtnFn={this.newChatBtnClicked}>
          </ChatListComponent>
          {
            this.state.newChatFormVisible ? null : <ChatViewComponent
              user={this.state.username}
              chat={this.state.chats[this.state.selectedChat]}>
            </ChatViewComponent>
          }
          {
            this.state.selectedChat !== null && !this.state.newChatFormVisible ? <ChatTextBoxComponent userClickedInputFn={this.messageRead} submitMessageFn={this.submitMessage}></ChatTextBoxComponent> : null
          }
          {
            this.state.newChatFormVisible ? <NewChatComponent goToChatFn={this.goToChat} newChatSubmitFn={this.newChatSubmit}></NewChatComponent> : null
          }
          <Button onClick={this.signOut} className={classes.signOutBtn}>Sign Out</Button>
        </div>
      );
  }

  signOut = () => {
  };

  submitMessage = (msg) => {
    console.log(this.state.selectedChat);

    let message = this.state.chats[this.state.selectedChat][0];
    let receiver = (message.sender !== this.state.username) ? message.sender : message.receiver;

    console.log("receiver ");
    console.log(receiver);
    console.log(this.state.chats[this.state.selectedChat][0]);
    let chatMessage = {
      sender: this.state.username,
      receiver: receiver,
      content: msg,
      conversation_id: this.state.selectedChat
    };
    // send public message
    stompClient.send("/app/sendPrivateMessage", {}, JSON.stringify(chatMessage));


    let new_chats = this.state.chats.slice();
    new_chats[this.state.selectedChat].push(chatMessage);
    this.setState({
      chats: new_chats
    })
  };


  // Always in alphabetical order:
  // 'user1:user2'
  buildDocKey = (friend) => [this.state.email, friend].sort().join(':');

  newChatBtnClicked = () => this.setState({ newChatFormVisible: true, selectedChat: null });

  newChatSubmit = async (chatObj) => {
    this.sendMessage(this.state.sender, this.state.message);
    const docKey = this.buildDocKey(chatObj.sendTo);
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.length - 1);
  };

  selectChat = async (chatIndex) => {
    await this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
    this.messageRead();
  };

  goToChat = async (docKey, msg) => {
    console.log("GO TO CHAT++++++++++=");
    console.log(this.state.chats);
    const usersInChat = this.state.friends;
    //const chat = this.state.chats.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)));
    //this.setState({ newChatFormVisible: false });
   // await this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(msg);
  };

  // Chat index could be different than the one we are currently on in the case
  // that we are calling this function from within a loop such as the chatList.
  // So we will set a default value and can overwrite it when necessary.
  messageRead = () => {
    const chatIndex = this.state.selectedChat;
    //const docKey = this.buildDocKey(this.state.chats[chatIndex].users.filter(_usr => _usr !== this.state.email)[0]);
    //if(this.clickedMessageWhereNotSender(chatIndex)) {
      /*firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .update({ receiverHasRead: true });*/
    //} else {
    //  console.log('Clicked message where the user was the sender');
   // }
  };

  clickedMessageWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.email;



  //componentWillMount = () => {
      /*firebase.auth().onAuthStateChanged(async _usr => {
        if(!_usr)
          this.props.history.push('/login');
        else {
          await firebase
            .firestore()
            .collection('chats')
            .where('users', 'array-contains', _usr.email)
            .onSnapshot(async res => {
              const chats = res.docs.map(_doc => _doc.data());
              await this.setState({
                email: _usr.email,
                chats: chats,
                friends: []
              });
            })
        }
    });*/
  //}
}

export default withStyles(styles)(DashboardComponent);
