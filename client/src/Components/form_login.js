import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import 'whatwg-fetch';
import axios from 'axios';

const styles = {
    div: {
        display: 'flex',
        justify: 'center',
        alignItems :'center',
        flexdirection: "column"
    },
    Button: {
      display: 'flex',
      justifyContent: 'center'
    }
  };

class Formlogin extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
          signInEmail: '',
          signInPassword: ''
        };
    
        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
        this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onOutlook=this.onOutlook.bind(this);

      }
    
    
      onTextboxChangeSignInEmail(event) {
        this.setState({
          signInEmail: event.target.value,
        });
      }
    
      onTextboxChangeSignInPassword(event) {
        this.setState({
          signInPassword: event.target.value,
        });
      }
      onSignIn() {
        
        // Grab state
        const {
          signInEmail,
          signInPassword,
        } = this.state;
    
        // Post request to backend
        fetch('/signin', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: "same-origin",
          body: JSON.stringify({
            email: signInEmail,
            password: signInPassword,
          }),
        })
          .then(json => {
            console.log('json', json);
            if (json.status === 200) {
              this.setState({
                signInPassword: '',
                signInEmail: '',
              });
              window.location.reload();  
            }
          });
      }

      onOutlook(){
        axios.get('/auth/outlook')
          .then(response => {
            window.location.reload();
          })
      }

    render(){
        const classes = styles;
        const {

            signInEmail,
            signInPassword,
          } = this.state;
        return(
            <div className= {classes.div}>
            <Grid item xs={12}>
            <FormControl className = {classes.FormControl} >
          		<InputLabel htmlFor="name-simple">Email</InputLabel>
          		<Input id="name-simple" value={signInEmail} onChange={this.onTextboxChangeSignInEmail}/>
        	</FormControl>
            </Grid>
            <Grid>
          <FormControl className = {classes.FormControl} >
          		<InputLabel htmlFor="name-simple">Password</InputLabel>
          		<Input id="name-simple" value={signInPassword} onChange={this.onTextboxChangeSignInPassword}/>
            </FormControl>
            </Grid>
            <Grid className = {classes.Button}>
            <CardActions style = {classes.Button}>
                <Button size="large" style = {{"background-color":"#6356be","color": "#f0f0f0","margin-top": "20px"}} onClick={this.onSignIn}>Login</ Button>
            </ CardActions>
            </Grid>
            <Grid className = {classes.Button}>
            <CardActions style = {classes.Button}>
                <Button size="large" style = {{"background-color":"#6356be","color": "#f0f0f0","margin-top": "20px"}}><a href = '/auth/outlook'>Outlook</a></ Button>
            </ CardActions>
            </Grid>
            </div>

        );
    }
}

export default withStyles(styles)(Formlogin);