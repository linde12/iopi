import React, {Component} from 'react';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

export default class ServiceList extends Component {
  render () {
    return (
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Port</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {this.renderServices()}
        </tbody>
      </Table>
    );
  }

  renderServices () {
    return this.props.services.map((s, i) => {
      return (
        <TableRow key={i} justify='between'>
          <td>{s.name}</td>
          <td>{s.type}</td>
          <td>{s.port}</td>
          <td>{s.text.join(', ')}</td>
        </TableRow>
      );
    });
  }
}

ServiceList.propTypes = {
  services: React.PropTypes.array.isRequired
};
