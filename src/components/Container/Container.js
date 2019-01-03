import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    Route
} from 'react-router-dom';
import ConText from '../ConText/ConText';
import ConButton from '../ConButton/ConButton';
import ConUtils from '../ConUtils/ConUtils';
import ConForm from '../ConForm/ConForm';
import ConTable from '../ConTable/ConTable';
import ConGrid from '../ConGrid/ConGrid';
import ConLayout from '../ConLayout/ConLayout';
import ConTabs from '../ConTabs/ConTabs';
import ConMind from '../ConMind/ConMind';
import ConIcon from '../ConIcon/ConIcon';

const component_config = {
    mind: ConMind,
    text: ConText,
    button: ConButton,
    grid: ConGrid,
    utils: ConUtils,
    form: ConForm,
    layout: ConLayout,
    tabs: ConTabs,
    icon: ConIcon,
    table: ConTable,
}

class Container extends Component {
    render() {
        let props = this.props;
        return (
            <div className="container">
                {
                    props.nav_list.map((v, i, a) => {
                    return  (
                                <div
                                    className={'con-item' + (props.pathname.indexOf(v.id) > -1 ? ' active' : '')}
                                    key={i}
                                    id={v.id}
                                >
                                    <Route path={'/index/ning-ui/' + v.id} component={component_config[v.id]}/>
                                </div>
                            )
                    })
                }
            </div>
        )
    }
}

export default Container;