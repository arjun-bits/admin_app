import React ,{ Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import DisabledTabs from './tabs';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import  { Redirect } from 'react-router-dom'; 
import createHashHistory from 'history/createBrowserHistory';

const styles = {
  div: {
  	display: 'flex',
  	backgroundColor: '#eeeeee',
  	height: 650,
  	justify: 'center',
  	alignItems :'center'

  },
  card: {
    minWidth: 275,
    width : 400,
    top:0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  FormControl: {
  	margin :0,
  	display : 'flex',
  	width: 275
  }
};


class SimpleCard extends Component {
  state = {
    redirect : false
  }
  renderContent(){
    switch(this.props.auth){
      case null:
        return ;
      case false:
        return (<div style = {styles.div}>
          <Card style={styles.card}>
            <CardContent>
          <Typography style={styles.title} color="textSecondary">
          Admin App 
          </ Typography>
          <DisabledTabs  />
    
            </CardContent>
          </ Card>
        </ div>);
      default:
        return this.setState({ redirect: true }) ,this.forceUpdate();

    }
  }
  render() {
    const { redirect } = this.state;
    if(redirect){
      return <Redirect to='/dashboard'/>;
    } else{
      return (
        <div>
          {this.renderContent()}
        </div>);
    }
  };
}

function mapStateToProps(state){
  return {auth : state.auth};
}


export default connect(mapStateToProps)(SimpleCard);