import React, {Component} from 'react';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: ['home', 'table', 'info'],
        }
    }

    changePage(newPage) {
        this.props.changePage(newPage)
    }

    render() {
        let pages = this.state.pages.map((thisLet, index) => {
            return (
                <li key={index} onClick={() => this.changePage(thisLet)}>
                    {thisLet}
                </li>
            )
        })

        return (
            <div className="Menu">
                <div className="Menu-wrapper">
                    <ul>
                        {pages}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Menu;
