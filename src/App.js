import React, {Component} from 'react';
import Menu from './components/Menu.js';
import Content from './components/Content.js';
import './App.css';
class App extends Component {
    constructor() {
        super();
        this.state = {
            page: 'table',
        };
    }

    changePageFunc(newPage) {
        this.setState({page: newPage})
    }

    render() {
        return (
            <div className="App">
                <Menu page={this.state.page} changePage={this.changePageFunc.bind(this)}/>
                <Content page={this.state.page}/>
            </div>
        );
    }
}

export default App;
