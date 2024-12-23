import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router,
   Route,
   Routes } from 'react-router-dom'


export default class App extends Component {
  pageSizes=5;
  render() {
    return (
      <div>
      <Router>
          <Navbar/>
            <Routes>
                <Route exact path='/' element={<News key='general' pageSizes={this.pageSizes} country='us' category='general'/>} />
                <Route exact path='/business' element={<News key='business' pageSizes={this.pageSizes} country='us' category='business'/>} />
                <Route exact path='/entertainment' element={<News key='entertainment' pageSizes={this.pageSizes} country='us' category='entertainment'/>} />
                <Route exact path='/general' element={<News key='general' pageSizes={this.pageSizes} country='us' category='general'/>} />
                <Route exact path='/health' element={<News key='health' pageSizes={this.pageSizes} country='us' category='health'/>} />
                <Route exact path='/science' element={<News key='science' pageSizes={this.pageSizes} country='us' category='science'/>} />
                <Route exact path='/sports' element={<News key='sports' pageSizes={this.pageSizes} country='us' category='sports'/>} />
                <Route exact path='/technology' element={<News key='technology' pageSizes={this.pageSizes} country='us' category='technology'/>} />
            </Routes>
      </Router>
      </div>
    )
  }
}
