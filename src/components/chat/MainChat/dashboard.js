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
      newAddedConversation: null
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
      const url2 = "http://localhost:8765/chat/messages";

      let res = await axios.get(url);
      let res2 = await axios.post(url2, data, config);
      console.log(res.data);
      this.setState({
        chats:  res2.data,
        friends: res.data,
        curTime: 'io'
      });
    } catch (e) {
      console.log(e);
    }
    console.log("+++++++++++++++++++++++++++++++++++++++++++++");
    console.log(this.state.chats);

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


  sendNewChatMessage = async (receiver, content, conversationId) => {
    if (stompClient) {
      let chatMessage = {
        sender: this.state.username,
        receiver: receiver,
        content: content,
        conversationId: conversationId
      };
      // send public message
      stompClient.send("/app/sendPrivateMessage", {}, JSON.stringify(chatMessage));
    }
    const config = {
      headers: {
        "content-type": "application/json"
      }
    };


    //GET ALL MESSAGES
    let user = localStorage.getItem("username");
    const data = JSON.stringify({
      username: user,
    });
    try {
      const url = "http://localhost:8765/chat/messages";
      let res = await axios.post(url, data, config);

      console.log(res.data);
      console.log(res.data.length);
      this.setState({
        chats:  res.data,
        friends: res.data,
        curTime: 'io',
        selectedChat: res.data.length-1
      });

    } catch (e) {
      console.log(e);
    }
  };

  onMessageReceived = (payload) => {

    console.log("I received this upon subscribe to the ws endpoint");
    console.log(payload);
    let message = JSON.parse(payload.body);
    console.log(message);

    let new_chats = this.state.chats;
    console.log(new_chats);
    if (typeof new_chats[message.conversationId] == 'undefined'){
      console.log("is undefined");
      new_chats[message.conversationId] = message;
      console.log(new_chats);
    }
    else {
      console.log("is NOT undefined");
      new_chats[message.conversationId].push(message);
    }
    console.log("new chats");
    console.log(new_chats);

    this.setState({
      chats: new_chats,
      selectedChat: message.conversationId
    });

  };

  onError = (error) => {
    this.setState({
      error: 'Could not connect you to the Chat Room Server. Please refresh this page and try again!'
    })
  };

  render() {

    const { classes } = this.props;

      return(
        <div className='container_chat' id='dashboard-container'>
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
            this.state.selectedChat !== null && !this.state.newChatFormVisible ? <ChatTextBoxComponent userClickedInputFn={this.messageRead} submitMessageFn={this.submitMessage}/> : null
          }
          {
            this.state.newChatFormVisible ? <NewChatComponent goToChatFn={this.goToChat} newChatSubmitFn={this.newChatSubmit}/> : null
          }

        </div>
      );
  }

  submitMessage = (msg) => {
    console.log(this.state.selectedChat);
    console.log(this.state.chats);
    let message = this.state.chats[this.state.selectedChat][0];
    let receiver = (message.sender !== this.state.username) ? message.sender : message.receiver;

    console.log("receiver ");
    console.log(this.state.selectedChat);
    console.log("selected chat");
    // console.log(receiver);
    // console.log(this.state.chats[this.state.selectedChat][0]);
    // console.log(this.state.chats);
    let chatMessage = {
      sender: this.state.username,
      receiver: receiver,
      content: msg,
      conversationId: this.state.chats[this.state.selectedChat][0].conversationId
    };
    // send public message
    console.log(chatMessage);
    stompClient.send("/app/sendPrivateMessage", {}, JSON.stringify(chatMessage));


    let new_chats = this.state.chats;
    new_chats[this.state.selectedChat].push(chatMessage);
    this.setState({
      chats: new_chats
    })
  };

  newChatBtnClicked = () => this.setState({ newChatFormVisible: true, selectedChat: null });

  newChatSubmit = async (chatObj) => {
    console.log(this.state.username);
    this.sendNewChatMessage(chatObj.receiver, chatObj.message, chatObj.newAddedConversation);
    this.setState({ newChatFormVisible: false });
    this.setState({selectedChat:  this.state.chats.length - 1});
    //this.selectChat(this.state.chats.length - 1);
  };

  selectChat = async (chatIndex) => {
    await this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
    //this.messageRead();
  };

  goToChat = async (docKey, msg) => {
    console.log("GO TO CHAT++++++++++=");
    console.log(this.state.chats);
    this.submitMessage(msg);
  };

  messageRead = () => {
  };

  clickedMessageWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.email;

}

export default withStyles(styles)(DashboardComponent);
