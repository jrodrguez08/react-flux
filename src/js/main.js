import React from 'react';
import ReactDOM from 'react-dom';

import Home from './components/home/homepage';
import About from './components/about/aboutpage';
import Header from './components/global/header';
import Results from './components/results/resultspage';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Home/>
                <Results/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));