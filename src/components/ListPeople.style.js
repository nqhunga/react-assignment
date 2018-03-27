import { Table, Input, Button, Form, FormGroup, FormFeedback } from 'reactstrap';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export const TableEx = styled(Table)`
  background-color: #fff !important;
`;

export const IconEx = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #909090;
  height: 24px;
  width: 24px;
  margin: 0 16px 0 16px;
  :hover {
    color: #2C74FD;
  }
`;

export const InputEx = styled(Input)`
  
`;

export const Cancel = styled(Button)`
  background: #EDEDED;
  color: #2C74FD;
  font-size: 16px;
  font-weight: 500;
`;

export const Save = styled(Button)`
  background: #2C74FD;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
`;

export const FormEx = styled(Form)`
  background-color: #fff;
  padding: 16px 8px 16px 8px;
  margin-bottom: 8px;
`;

export const FormGEx = styled(FormGroup)`
  margin: 0 8px 0 8px;
  height: 50px;
`;

export const AddNew = styled(Button)`
  align-self: flex-start;
  color: #828282 !important;
  background-color: #EDEDED !important;
  font-weight: 500 !important;
`;

export const Feedback = styled(FormFeedback)`
  
`;