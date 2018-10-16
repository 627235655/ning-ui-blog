import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Aside.scss';

class NavItem extends Component {
    render() {
        let props = this.props;
        return (
            <a
                className={"nav-item" + (props.which_active == props.item.id ? ' active' : '')}
                href={'#' + props.item.id}
                onClick={() => {props.checkActive(props.item.id)}}
            >{props.item.text}</a>
        )
    }
}

class Aside extends Component {
    render() {
        let props = this.props;
        return (
            <nav className="aside">
                {
                    props.nav_list.map((v, i, a) => {
                        return <NavItem
                                key={i}
                                item={v}
                                which_active={props.which_active}
                                checkActive={props.checkActive}
                                />
                    })
                }
            </nav>
        )
    }
}

export default Aside;