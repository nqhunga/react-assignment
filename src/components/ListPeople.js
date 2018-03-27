import React, { Component } from 'react';
import { TableEx, IconEx } from './ListPeople.style';
import RowContainer from './RowPeople';

import { faCaretUp, faCaretDown } from '@fortawesome/fontawesome-free-solid';

class ListPeople extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: props.people,

    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.people !== nextProps.people) {
      this.setState({data: nextProps.people})
    }
  }

  handleSort(key) {
    this.props.handleSort(key);
  }
  

  render () {
    const {onDelete, onSave} = this.props;
    return (
      <TableEx responsive hover>
        <thead>
          

          <tr>
            {this.props.header.map(value => (
              <th key={value.name} onClick={() => this.handleSort(value.prop)} className={`thead-${value.prop}`}>{value.name}
                {
                  this.props.columnToSort === value.prop ? 
                    (
                      this.props.sortDirection === 'asc' ?
                        (<IconEx icon={faCaretUp} />) :
                        (<IconEx icon={faCaretDown} />)
                    ) : null
                }
              </th>
            ))}
        
            <th className="thead-button"></th>
          </tr>
        </thead>
        <tbody>
          {this.props.people.map(person => (
            <RowContainer key={person.id} data={person} onDelete={onDelete} onSave={onSave}
              />
          ))}
        </tbody>

      </TableEx>
    );
  }
}


export default ListPeople;