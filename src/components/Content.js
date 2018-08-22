import React, {Component} from 'react';
import Home from './pages/Home.js';
import Info from './pages/Info.js';
import Table from './pages/Table.js';

class Content extends Component {
    render() {
        let currentPage
        if (this.props.page === 'home') {
            currentPage = <Home />
        }
        else if (this.props.page === 'table') {
            currentPage = <Table />
        }
        else if (this.props.page === 'info') {
            currentPage = <Info />
        }
        return (
            <div className="Content">
                <div className="Content-wrapper">
                    {currentPage}
                </div>
            </div>
        );
    }
}

export default Content;
