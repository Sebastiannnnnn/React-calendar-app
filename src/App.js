import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './App.css';

import reducers from './Store';
import Root from './Router';

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

class App extends Component {
    render() {
        return (
            <div className="App">
                <Provider store={store}>
                    <Root/>
                </Provider>
            </div>
        );
    }
}

export default App;
