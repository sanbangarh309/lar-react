
require('./bootstrap');
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

// import Tree from './components/Tree';
import FileExplorer from './components/FileExplorer';

render(<FileExplorer />, document.getElementById('example'));