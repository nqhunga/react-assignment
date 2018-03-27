import React, {Component} from 'react';
import { FormEx, FormGEx, InputEx, AddNew, Feedback } from './ListPeople.style';

class AddPeople extends Component {
  constructor() {
    super();

    this.state = ({
      id: '',
      name: '',
      email: '',
      phone: '',
      validationMessage: {
        name: '',
        email: '',
        phone: ''
      },
      validField: {
        name: false,
        email: false,
        phone: false
      },
      nameCheck: {
        isValid: false,
        isInvalid: false
      },
      emailCheck: {
        isValid: false,
        isInvalid: false
      },
      phoneCheck: {
        isValid: false,
        isInvalid: false
      },
      formValid: false

    });
    
    this.change = this.change.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  change(e) {
    let id = this.props.newPeople.length;
    const name = e.target.name, 
          value = e.target.value;
    this.setState({
        id: id,
        [name]: value
    }); 
  }

  validateField(e) {
    let name = e.target.name;
    let value = e.target.value;
    let validationMessage = this.state.validationMessage;
    let validateField = this.state.validField;

    switch(name) {
      case 'name':
        validateField.name = value !== '';
        validationMessage.name = validateField.name ? '' : ' is empty!';
        this.checkNameValid(validateField.name);
        break;

      case 'email':
        validateField.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
        validationMessage.email = validateField.email ? '' : ' is not valid email!';
        this.checkEmailValid(validateField.email);
        break;

      case 'phone':
        validateField.phone = value.match(/^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/) !== null;
        validationMessage.phone = validateField.phone ? '' : 'is not valid phone number!';
        this.checkPhoneValid(validateField.phone);
        break;
      default:
        break;
    }

    this.setState({
      validationMessage: validationMessage,
      validateField: validateField
    }, this.validateForm);
  }

  checkNameValid(check) {
    check === true ? this.setState({
      nameCheck: {
        isValid: true,
        isInvalid: false
      } 
    }) : this.setState({
      nameCheck: {
        isValid: false,
        isInvalid: true
      }
    })
  }

  checkEmailValid(check) {
    check === true ? this.setState({
      emailCheck: {
        isValid: true,
        isInvalid: false
      } 
    }) : this.setState({
      emailCheck: {
        isValid: false,
        isInvalid: true
      }
    })
  }

  checkPhoneValid(check) {
    check === true ? this.setState({
      phoneCheck: {
        isValid: true,
        isInvalid: false
      } 
    }) : this.setState({
      phoneCheck: {
        isValid: false,
        isInvalid: true
      }
    })
  }

  validateForm() {
    let check = this.state.validField.name && this.state.validField.email && this.state.validField.phone;

    this.setState({
      formValid: check
    })
  }

  onSave(e) {
    this.props.onSave(this.state);
    this.setState({
      id: '',
      name: '',
      email: '',
      phone: '',
      validationMessage: {
        name: '',
        email: '',
        phone: ''
      },
      validField: {
        name: false,
        email: false,
        phone: false
      },
      nameCheck: {
        isValid: false,
        isInvalid: false
      },
      emailCheck: {
        isValid: false,
        isInvalid: false
      },
      phoneCheck: {
        isValid: false,
        isInvalid: false
      },
      formValid: false
    });
  }

  render() {
    return(
      <FormEx inline>
        <FormGEx className="add-name-block"> 
          <InputEx type="text" name="name" id="NewName" 
          className="add-input"
          value={this.state.name}
          onChange={(e) => this.change(e)}
          onBlur={(e) => this.validateField(e)}
          placeholder="Full Name..." 
          valid={this.state.nameCheck.isValid}
          invalid={this.state.nameCheck.isInvalid}
          />
          <Feedback>{this.state.validationMessage.name}</Feedback>
        </FormGEx>
         
        <FormGEx className="add-email-block">
          <InputEx type="email" name="email" id="NewEmail" 
          className="add-input"
          value={this.state.email}
          onChange={(e) => this.change(e)}
          onBlur={(e) => this.validateField(e)}
          valid={this.state.emailCheck.isValid}
          invalid={this.state.emailCheck.isInvalid}
          placeholder="Email Address" />
          <Feedback>{this.state.validationMessage.email}</Feedback>
        </FormGEx>

        <FormGEx className="add-phone-block">
          <InputEx type="Phone" name="phone" id="NewPhone" 
          className="add-input"
          value={this.state.phone}
          onChange={(e) => this.change(e)}
          onBlur={(e) => this.validateField(e)}
          valid={this.state.phoneCheck.isValid}
          invalid={this.state.phoneCheck.isInvalid}
          placeholder="Phone Number" />
          <Feedback>{this.state.validationMessage.phone}</Feedback>
        </FormGEx>

        <FormGEx>
          <AddNew 
          onClick={(e) => this.onSave(e)}
          disabled={!this.state.formValid}
          >Add New</AddNew>
        </FormGEx>
      </FormEx>
    );
  }
}

export default AddPeople;