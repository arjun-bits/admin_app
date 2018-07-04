import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import 'whatwg-fetch';


const styles = {
    div: {
        display: 'flex',
        justify: 'center',
        alignItems :'center'
  
    },
    FormControl: {
        margin :0,
        width: 275
    },
    Button: {
      display: 'flex',
      justifyContent: 'center'
    }
  };

class RegForm extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          signUpEmail: '',
          signUpPassword: '',
          signUpConfPassword : ''
        };
    
        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
        this.onTextboxChangeSignUpConfPassword = this.onTextboxChangeSignUpConfPassword.bind(this);
        
        this.onSignUp = this.onSignUp.bind(this);
      }
      
      onTextboxChangeSignUpEmail(event) {
        this.setState({
          signUpEmail: event.target.value,
        });
      }
    
      onTextboxChangeSignUpPassword(event) {
        this.setState({
          signUpPassword: event.target.value,
        });
      }

      onTextboxChangeSignUpConfPassword(event) {
        this.setState({
          signUpConfPassword: event.target.value,
        });
      }

      onSignUp() {
        // Grab state
        const {
          signUpEmail,
          signUpPassword,
          signUpConfPassword,
        } = this.state;
        
        // Post request to backend
        fetch('/signup', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            email: signUpEmail,
            password: signUpPassword,
            passwordConf : signUpConfPassword
          }),
        })
          .then(json => {
            console.log('json', json);
            if (json.success) {
              this.setState({
                signUpEmail: '',
                signUpPassword: '',
              });
              window.location.reload();
            }
          });
      }

    render(){
        const classes = styles;
        const {
            signUpEmail,
            signUpPassword,
            signUpConfPassword,
          } = this.state;
        return(
            
            <div className= {classes.div}>
            <FormControl className = {classes.FormControl} >
          		<InputLabel htmlFor="name-simple">Email</InputLabel>
          		<Input id="name-simple" value={signUpEmail} onChange={this.onTextboxChangeSignUpEmail} />
        	</FormControl>
        	<FormControl className = {classes.FormControl} >
          		<InputLabel htmlFor="name-simple">Password</InputLabel>
          		<Input id="name-simple" value={signUpPassword}  onChange={this.onTextboxChangeSignUpPassword}/>
            </FormControl>
            <FormControl className = {classes.FormControl} >
          		<InputLabel htmlFor="name-simple">Repeat Password</InputLabel>
          		<Input id="name-simple" value={signUpConfPassword}  onChange={this.onTextboxChangeSignUpConfPassword}/>
            </FormControl>
            <CardActions style = {classes.Button}>
                <Button size="large" style = {{"background-color":"#6356be","color": "#f0f0f0","margin-top": "20px"}} onClick={this.onSignUp}>Register</ Button>
            </ CardActions>
            </div>

        );
    }
}

export default withStyles(styles)(RegForm);