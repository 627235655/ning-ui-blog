import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

class ConItem extends Component {
    render() {
        let props = this.props;
        return (
            <div
                className={"con-item" + (props.which_active == props.id ? ' active' : '')}
                id={props.id}
            >
                {(
                    () => {
                        switch(props.id) {
                            case 'text':
                                return <ConText/>;
                            case 'button':
                                return <ConButton/>;
                            case 'utils':
                                return <ConUtils/>;
                            case 'form':
                                return <ConForm/>;
                            case 'table':
                                return <ConTable/>;
                            case 'grid':
                                return <ConGrid/>;
                            case 'layout':
                                return <ConLayout/>;
                            case 'tabs':
                                return <ConTabs/>;
                            case 'mind':
                                return <ConMind/>;
                            case 'icon':
                                return <ConIcon/>;
                            default:
                                return null;
                        }
                    }
                )()}
            </div>
        )
    }
}

export default ConItem;