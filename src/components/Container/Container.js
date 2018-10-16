import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Container.scss';
import ConItem from '../ConItem/ConItem';

class Container extends Component {
    render() {
        let props = this.props;
        return (
            <div className="container">
                {
                    props.nav_list.map((v, i, a) => {
                    return <ConItem
                                key={i}
                                id={v.id}
                                which_active={props.which_active}
                            />
                    })
                }
            </div>
        )
    }
}

export default Container;