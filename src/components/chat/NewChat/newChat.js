import React from 'react';
import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography } from '@material-ui/core';
import styles from './styles';
import axios from "axios";
//const firebase = require("firebase");

class NewChatComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      sender: null,
      message: null,
      receiver: null,
      newAddedConversation: null
    };
  }

  render() {

    const {classes} = this.props;

    return (
        <main className={classes.main}>
          <CssBaseline/>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">Send A Message!</Typography>
            <form className={classes.form} onSubmit={(e) => this.submitNewChat(e)}>
              <FormControl fullWidth>
                <InputLabel htmlFor='new-chat-username'>
                  Enter a professors's username
                </InputLabel>
                <Input required
                       className={classes.input}
                       autoFocus
                       onChange={(e) => this.userTyping('receiver', e)}
                       id='new-chat-username'>
                </Input>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='new-chat-message'>
                  Enter Your Message
                </InputLabel>
                <Input required
                       className={classes.input}
                       onChange={(e) => this.userTyping('message', e)}
                       id='new-chat-message'>
                </Input>
              </FormControl>
              <Button fullWidth variant='contained' color='primary' className={classes.submit}
                      type='submit'>Send</Button>
            </form>
            {
              this.state.serverError ?
                  <Typography component='h5' variant='h6' className={classes.errorText}>
                    Unable to locate the user
                  </Typography> :
                  null
            }
          </Paper>
        </main>
    );
  }

  componentWillMount() {
    let userSender = localStorage.getItem("username");
    this.setState({sender: userSender});
    console.log("NEW CHAT COMPOENT");
    console.log(this.state.sender);
  }

  userTyping = (inputType, e) => {
    switch (inputType) {
      case 'receiver':
        this.setState({receiver: e.target.value});
        break;

      case 'message':
        this.setState({message: e.target.value});
        break;

      default:
        break;
    }
  };

  submitNewChat = async (e) => {
    e.preventDefault();
    console.log(this.state.username);
    const existsUser = await this.userExists(this.state.receiver);
    console.log("+++++++++NEW CHAT COMPONENT +++++++++++++");
    console.log(existsUser);
    if (existsUser) {
    //  const chatExists = await this.chatExists();
    // chatExists ? this.goToChat() : this.createChat();
    let addNewConversation = await this.addConversation();
    this.createChat();
    }
    //this.createChat();
  };

  createChat = () => {
    console.log(this.state.sender);
    console.log(this.state.receiver);
    console.log(this.state.message);
    console.log(this.state.newAddedConversation);
    this.props.newChatSubmitFn({
      receiver: this.state.receiver,
      message: this.state.message,
      newAddedConversation: this.state.newAddedConversation
    });
  };
  userExists = async (user) => {
    const config = {
      headers: {
        "content-type": "application/json"
      }
    };
    const data = JSON.stringify({
      username: user,
    });
    console.log("+++++++++++++++++CHECK IF USER EXISTS++++++++++++++++");
    try {
      const url = "http://localhost:8765/chat/exists";
      let exists = await axios.post(url, data, config);

      console.log(exists.data);
      return exists.data.exists;
      //this.setState({ serverError: !exists });
    } catch (err) {
      this.setState({ serverError: "Error" });
      return 0;
    }
  };

  goToChat = () => this.props.goToChatFn(this.buildDocKey(), this.state.message);

  addConversation = async () => {
    const config = {
      headers: {
        "content-type": "application/json"
      }
    };
    const data = JSON.stringify({
      sender: this.state.sender,
      receiver: this.state.receiver
    });
    console.log("+++++++++++++++++ADD NEW CONVERSATION ++++++++++++++++");
    try {
      const url = "http://localhost:8765/chat/exists-chat";
      let exists = await axios.post(url, data, config);

      console.log(exists.data);
      this.setState({newAddedConversation: exists.data.exists});
      return exists.data.exists;
    } catch (err) {
      this.setState({ serverError: "Error" });
      return 0;
    }
  };
}

export default withStyles(styles)(NewChatComponent);
