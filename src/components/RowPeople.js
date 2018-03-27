import React, {Component} from 'react';
import {IconEx, InputEx, Cancel, Save} from './ListPeople.style';
import { faPencilAlt, faTrash } from '@fortawesome/fontawesome-free-solid';

class RowContainer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      id: this.props.data.id,
      name: this.props.data.name,
      email: this.props.data.email,
      phone: this.props.data.phone,
      isEditing: false
    }
    this.change = this.change.bind(this);
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onEdit(e) {
    this.setState({
      isEditing: true
    })
  }

  onCancel(e) {
    this.setState({
      isEditing: false
    })
  }

  onDelete(e) {
    this.props.onDelete(this.state);
  }

  onSave(e) {
    this.props.onSave(this.state);
    this.setState({
      isEditing: false
    });
  }

renderRow(isEditing) {

  switch(isEditing) {
    case true:
      return(
        [
          <td key="name">
            <InputEx 
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={e => this.change(e)}  
            ></InputEx>
          </td>,
          <td key="email">
            <InputEx 
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={e => this.change(e)}  
            ></InputEx>
          </td>,
          <td key="phone">
            <InputEx 
              type="phone"
              name="phone"
              id="phone"
              value={this.state.phone}
              onChange={e => this.change(e)}  
            ></InputEx>
          </td>,
          <td key="btnEdit">
            <Cancel onClick={(e) => this.onCancel(e)} className="cancel-btn">Cancel</Cancel>
            <Save onClick={(e) => this.onSave(e)} className="save-btn">Save</Save>
          </td>
        ]
      )


    case false:
      return(
        [
          <td key="name">{this.state.name}</td>,
          <td key="email">{this.state.email}</td>,
          <td key="phone">{this.state.phone}</td>,
          <td key="btnEdit">
            <IconEx icon={faPencilAlt} onClick={(e) => this.onEdit(e)}/>
            <IconEx icon={faTrash} onClick={(e) => this.onDelete(e)}/>
          </td>
        ]
      )

      default:
        break;

  }
}

  render () {
    return (
      <tr key={this.state.id} className="row-container">
        {this.renderRow(this.state.isEditing)}
      </tr>
    );
  }
}


export default RowContainer;