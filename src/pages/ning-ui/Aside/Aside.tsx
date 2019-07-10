import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    Link
} from 'react-router-dom';
import './Aside.scss';

interface IProps{
    pathname: string;
    nav_list: Array<any>;
}

class Aside extends React.Component<IProps> {
    render() {
        let props = this.props;
        return (
            <nav className="aside">
                {
                    props.nav_list.map((v, i) => {
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