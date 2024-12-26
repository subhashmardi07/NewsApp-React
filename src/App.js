import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News' 
import { BrowserRouter as Router,
   Route,
   Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  pageSizes=5;
  
  state={
    progress:0
  }

  setProgress =(progress) =>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar/>
            <LoadingBar
                 color="#f11946"
                 progress={this.state.progress}
              />
            <Routes>
                <Route path='/' element={<News setProgress={this.setProgress}  key='general' pageSizes={this.pageSizes} country='us' category='general'/>} />
                <Route path='/business' element={<News setProgress={this.setProgress}  key='business' pageSizes={this.pageSizes} country='us' category='business'/>} />
                <Route path='/entertainment' element={<News setProgress={this.setProgress}  key='entertainment' pageSizes={this.pageSizes} country='us' category='entertainment'/>} />
                <Route path='/general' element={<News setProgress={this.setProgress}  key='general' pageSizes={this.pageSizes} country='us' category='general'/>} />
                <Route path='/health' element={<News setProgress={this.setProgress}  key='health' pageSizes={this.pageSizes} country='us' category='health'/>} />
                <Route path='/science' element={<News setProgress={this.setProgress}  key='science' pageSizes={this.pageSizes} country='us' category='science'/>} />
                <Route path='/sports' element={<News setProgress={this.setProgress}  key='sports' pageSizes={this.pageSizes} country='us' category='sports'/>} />
                <Route path='/technology' element={<News setProgress={this.setProgress}  key='technology' pageSizes={this.pageSizes} country='us' category='technology'/>} />
            </Routes>
    
        </Router>
      </div>
    );
  }
}
