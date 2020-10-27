import ReactDOM from '../react/build/node_modules/react-dom/cjs/react-dom.development.js';
import React from '../react/build/node_modules/react/cjs/react.development.js';
import App from './App';
import './styles/main.scss';

const app = React.createElement(App);

ReactDOM.render(app, document.getElementById('app'));
