import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Formlogin from './form_login';
import RegForm from './regform';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class DisabledTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render(){
		const { value } = this.state;
  	return (
  		<div>
			<Tabs
				value={this.state.value}
				indicatorColor="primary"
				textColor="primary"
				centered='true'
				onChange={this.handleChange}
			>
				<Tab label="Login" />
				<Tab label="Register" />
			</Tabs>

			{value === 0 && <TabContainer><Formlogin /></TabContainer>}
			{value === 1 && <TabContainer><RegForm /></TabContainer>} 
			</div>

  		);
  }
}

export default DisabledTabs;