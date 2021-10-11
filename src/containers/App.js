import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
//import robots from './robots';

class App extends Component {
    constructor(){
        super()
        this.state= {          
                robots: [], //'robots'
                searchfield: ' '
        }
    }
    componentDidMount(){  //another realistic way if there are diff. users. (comment this and uncomment robots to have default files)
        fetch('https://jsonplaceholder.typicode.com/users')  // link where users registers
        .then(response=> response.json())
        .then(users => this.setState({robots:users}));
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
        
    }

    render(){
        const {robots, searchfield} = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
            return !robots.length ?
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll> 
                        <ErrorBoundary>
                    <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
                
            );
        } 
    
}
export default App;