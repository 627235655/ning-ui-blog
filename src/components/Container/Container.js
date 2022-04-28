import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ConAnimation from '../ConAnimation/ConAnimation';
import ConButton from '../ConButton/ConButton';
import ConForm from '../ConForm/ConForm';
import ConGrid from '../ConGrid/ConGrid';
import ConIcon from '../ConIcon/ConIcon';
import ConLayout from '../ConLayout/ConLayout';
import ConMind from '../ConMind/ConMind';
import ConModal from '../ConModal/ConModal';
import ConTable from '../ConTable/ConTable';
import ConTabs from '../ConTabs/ConTabs';
import ConText from '../ConText/ConText';
import ConUtils from '../ConUtils/ConUtils';

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
  modal: ConModal,
  animation: ConAnimation,
};

class Container extends Component {
  render() {
    let props = this.props;
    return (
      <div className="container">
        {props.nav_list.map((v, i, a) => {
          return (
            <div
              className={
                'con-item' +
                (props.pathname.indexOf(v.id) > -1 ? ' active' : '')
              }
              key={i}
              id={v.id}
            >
              <Route
                path={'/index/ning-ui/' + v.id}
                component={component_config[v.id]}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Container;
