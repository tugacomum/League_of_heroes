import React, { Component } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import './App.css';

import {
  BrowserRouter,
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      my_name: 'Bruno Piloto',
      project_name: 'League of Heroes'
    }
  }


  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header my_name={this.state.my_name} project_name={this.state.project_name} />
            <Content />
            <Footer my_name={this.state.my_name} project_name={this.state.project_name} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;