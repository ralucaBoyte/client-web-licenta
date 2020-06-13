import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class ChatViewComponent extends React.Component {

  componentDidMount = () => {
    const container = document.getElementById('chatview-container');
    if(container)
      container.scrollTo(0, container.scrollHeight);
  };
  componentDidUpdate = () => {
    const container = document.getElementById('chatview-container');
    if(container)
      container.scrollTo(0, container.scrollHeight);
  };

  render() {

    const { classes } = this.props;

    console.log(classes);

    if(this.props.chat === undefined) {
      return(<main className={classes.content}></main>);
    } else if(this.props.chat !== undefined) {
      return(
        <div>
          {/*<div className={classes.chatHeader}>*/}
          {/*  Your conversation with {*/}
          {/*  (this.props.chat[0].sender !== this.props.user) ? this.props.chat[0].sender : this.props.chat[0].receiver*/}
          {/*}*/}
          {/*</div>*/}
          <main id='chatview-container' className={classes.content}>
            {
              this.props.chat.map((_msg, _index) => {
                return(
                  <div key={_index} className={_msg.receiver === this.props.user ? classes.userSent : classes.friendSent}>
                    {_msg.content}
                  </div>
                  )
              })

              // this.props.chat.messages.map((_msg, _index) => {
              //   return(
              //   <div key={_index} className={_msg.sender === this.props.user ? classes.userSent : classes.friendSent}>
              //     {_msg.message}
              //   </div>
              //   )
              // })
            }
          </main>
        </div>
      );
    } else {
      return (<div className='chatview-container'>Loading...</div>);
    }
  }
}

export default withStyles(styles)(ChatViewComponent);
