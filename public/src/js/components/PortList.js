import React, {Component} from 'react';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

export default class PortList extends Component {
  render () {
    return (
      <List>{this.renderPorts()}</List>
    );
  }

  renderPorts () {
    return this.props.ports.map((p) => {
      let state = p.current_state === 1 ? 'High' : 'Low';
      return (
        <ListItem key={p.id} justify='between'>
          <span>
            {p.name}
          </span>
          <span className={state === 'High' ? 'primary' : 'secondary'}>{state}</span>
        </ListItem>
      );
    });
  }
}

PortList.propTypes = {
  ports: React.PropTypes.array.isRequired
};
