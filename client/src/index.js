import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore , applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import materializeCSS from 'materialize-css/dist/css/materialize.min.css';
import reducers from './reducers';
import $ from 'jquery';


const store = createStore(reducers,{}, applyMiddleware(reduxThunk));

ReactDOM.render(
<Provider store = {store}><App /></ Provider>, 
document.getElementById('root'));

registerServiceWorker();
