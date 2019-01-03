import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    Link
} from 'react-router-dom';
import './Aside.scss';

class Aside extends Component {
    render() {
        let props = this.props;
        return (
            <nav className="aside">
                {
                    props.nav_list.map((v, i, a) => {
                        return (
                                    <Link
                                        className={"nav-item" + (props.pathname.indexOf(v.id) > -1 ? ' active' : '')}
                                        to={v.id}
                                        key={v.id}
                                        replace
                                    >
                                        {v.text}
                                    </Link>
                                )
                    })
                }
            </nav>
        )
    }
}

export default Aside;