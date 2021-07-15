import React from 'react';
import ReactDOM from 'react-dom';
import {AppRoute} from './route/App.route';
// import {createStore} from 'redux'
// import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
// import reducer from './redux/reducer'


// const store = createStore(reducer)

ReactDOM.render(
        <AppRoute />
    ,
    document.getElementById('root'));
