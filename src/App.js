import React, { Component } from 'react';
import logo from './icons8-contacts.svg';
import './App.css';

import orderBy from "lodash/orderBy";
import { ContainerEx } from './App.style';
import {getUsers} from './database/database';
import ListPeople from './components/ListPeople';
import AddPeople from './components/AddPeople';


const invertDirection = {
  asc: "desc",
  desc: "asc"
};

class App extends Component {

  constructor() {
    super();

    this.state = ({
      users: [],
      columnToSort: '',
      sortDirection: 'desc'
    });
  }

  async componentDidMount() {
    let tempArray = [].concat(this.state.users);
    await getUsers() 
      .then(results => {
        let userArray = results.results;
        let tempUser = {};
        let id = 0;
        userArray.map(value => {
          let firstName = value.name.first.charAt(0).toUpperCase()+value.name.first.slice(1);
          let lastName = value.name.last.charAt(0).toUpperCase()+value.name.last.slice(1);
          let name = `${firstName} ${lastName}`;
          tempUser = {
            id: id,
            name: name,
            email: value.email,
            phone: value.phone
          }
          id += 1;

          return tempArray.push(tempUser);
          
        });
        this.setState({
          users: tempArray
        });
      });
  }

  AddNew(newPeople) {
    const newArray = [].concat(this.state.users);
    newArray.push(newPeople);
    this.setState({
      users: newArray
    });
  }

  onDelete(thRow) {
    const newArray = [].concat(this.state.users);
    let index = newArray.findIndex(x => x.id === thRow.id);
    newArray.splice(index, 1);
    this.setState({
      users: newArray
    });
  }

  onSave(newValue) {
    const newArray = [].concat(this.state.users);
    let index = newArray.findIndex(x => x.id === newValue.id);
    newArray.splice(index, 1, newValue);
    this.setState({
      peopleData: newArray
    });
  }

  handleSort = columnName => {
    let data=orderBy(
      this.state.users,
      this.state.columnToSort,
      this.state.sortDirection
    );
    
    this.setState(state => ({
      users: data,
      columnToSort: columnName,
      sortDirection:
        state.columnToSort === columnName
          ? invertDirection[state.sortDirection]
          : "asc"
    }));
  };

  render() {
    return (
      <ContainerEx className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">User Software</h1>
        </header>
        <ContainerEx className="content">
          <h3 className="content-title">List of participants</h3>
          <AddPeople 
            newPeople={this.state.users}
            onSave={newPeople => this.AddNew(newPeople)}
          />
          <ListPeople 
            people={this.state.users} 
            onDelete={thRow => this.onDelete(thRow)} 
            onSave={newValue => this.onSave(newValue)}
            columnToSort={this.state.columnToSort}
            sortDirection={this.state.sortDirection}
            handleSort={this.handleSort}
            header={[
              {name: 'Name',
              prop: 'name'},
              {name: 'Email address',
              prop: 'email'},
              {name: 'Phone number',
              prop: 'phone'}
            ]}
          />
        </ContainerEx>
        
      </ContainerEx>
    );
  }
}

export default App;
