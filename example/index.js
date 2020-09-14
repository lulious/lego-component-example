import React from 'react';
import ReactDOM from 'react-dom';

import './utils/import';

import AsyncComponent from './asyncComponent';

ReactDOM.render(<AsyncComponent type="{{componentName}}" />, document.getElementById('react-cnt'));
