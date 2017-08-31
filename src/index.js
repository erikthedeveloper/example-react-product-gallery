import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/normalize.css/normalize.css';
import App from './App';
import {products, categories} from './data';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App {...{products, categories}} />, document.getElementById('root'));
registerServiceWorker();
