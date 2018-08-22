import React, {Component} from 'react';
import './Table.css';

const axios = require('axios');

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: null,
            readyRecords: null,
            errorLoad: false,
            limitNumber: 10,
            limit: '',
            pageNumber: '?_page=1',
            maxCount: 100
        }
    }

    componentDidMount() {
        this.limitRecords(10)
    }

    limitRecords(thisLimit) {
        let self = this
        // http://jsonplaceholder.typicode.com/posts?_page=2&_limit=5
        this.setState({limitNumber: thisLimit, limit: '&_limit=' + thisLimit})
        setTimeout(function () {
            localStorage.setItem("countTable", JSON.stringify({countTable:thisLimit}));
            self.getInfo()
        }, 300)
    }

    changePaginationPage(thisPage) {
        let self = this
        this.setState({pageNumber: '?_page=' + thisPage})
        setTimeout(function () {
            self.getInfo()
        }, 300)
    }

    getInfo() {
        let self = this
        self.setState({errorLoad: 'inProgress'})
        axios.get('http://jsonplaceholder.typicode.com/posts' + self.state.pageNumber + self.state.limit)
            .then(function (response) {
                self.setState({maxCount: parseInt(response.headers['x-total-count']) - 1})
                self.setState({
                    records: response.data, errorLoad: false, readyRecords: response.data.map((thisLet, index) => {
                        return (
                            <tr key={index}>
                                <td>{thisLet.id}</td>
                                <td>{thisLet.title}</td>
                            </tr>
                        )
                    })
                })
            })
            .catch(function (error) {
                self.setState({maxCount: null})
                self.setState({records: null, readyRecords: null, errorLoad: true})
            })
    }

    render() {
        let tableStatus
        if (this.state.errorLoad === true) {
            tableStatus = <h3>Error suka</h3>
        }
        else if (this.state.errorLoad === false) {
            tableStatus = <table>
                <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                </tr>
                </thead>
                <tbody>
                {this.state.readyRecords}
                </tbody>
            </table>
        }
        else if (this.state.errorLoad === 'inProgress') {
            tableStatus = <h3>LOADING</h3>
        }

        let numbersPagination = this.state.maxCount / this.state.limitNumber
        let lis = [];

        for (let i = 0; i < numbersPagination; i++) {
            lis.push(<li key={i}>
                <button onClick={() => this.changePaginationPage(i + 1)}>{i + 1}</button>
            </li>);
        }
        return (
            <div className="Table">
                <div className="Table-wrapper">
                    <h2>TABLE PAGE</h2>
                    <button onClick={() => this.limitRecords(10)}>10</button>
                    <button onClick={() => this.limitRecords(25)}>25</button>
                    <button onClick={() => this.limitRecords(50)}>50</button>
                    <ul className="Table-pagination">
                        {lis}
                    </ul>
                    {tableStatus}
                </div>
            </div>
        );
    }
}

export default Table;
