import React from 'react';
import ReactDOM from '../react/build/node_modules/react-dom';
import App from './App';
import './styles/main.scss';

const app = React.createElement(App);

ReactDOM.render(app, document.getElementById('app'));
