import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Table from './Table';
import SearchFilters from './SearchFilters';


var data = [
    {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "userId": 1,
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    }
  ]


class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            query : '',
            results :[],
            done: false
        };
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onSearchChange(event) {
        this.setState({
          query: event.target.value,
        });
      }
      onSearch(event) {
        // Grab state
        console.log('YOOOOOOOOOOOOOOOOOOOOO');
        const {query,results} = this.state;
        
        // get request to backend
        
        axios.get('http://localhost:5000/search', { params: { query: query } })
                .then(response => {
                    this.setState({results: response.data});
                  })
                  .catch((error)=>{
                    console.log(error);
                 });
        event.preventDefault(); // Let's stop this event.
        event.stopPropagation(); // Really this time.
      }
    rendercontent() {
        const {
            results,
            query
        }=this.state;
        switch (this.props.auth) {
            case false:
                return (<p> Not logged in </p>)
            default:
                return (
                    <div className="nav-wrapper" style={{ "text-align": "left" }}>
                        <a href="#" className="brand-logo" style={{ "text-align": "left", "padding-left": "2%" }}>Logo</a>
                        <form style={{ "padding-right": "10rem", "padding-left": "22rem" }} onSubmit = {this.onSearch}>
                            <div className="input-field">
                                <input id="search" type="search" required value = {query} onChange={this.onSearchChange}  />
                                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                <i className="material-icons">close</i>
                            </div>
                        </form > 
                    </div>

                );
        }
    }

    rendertable(){
        const {
            results,
            query
        }=this.state;

        if(results === [{}]){
            console.log(results);
            return
        }
        else {
            console.log(results);
            return <Table data = {results} />
        }
    }
    render() {
        const {
            results,
            query
        }=this.state;

        console.log(this.state.results);
        
        return (
            <div>
                <div className="wrapper" >
                    <nav style={{ "background-color": "#ae275f" }}>
                        {this.rendercontent()}
                    </nav>
                </div>
                <ul id="slide-out" className="sidenav sidenav-fixed" style={{ "top": "auto" }}>
                    <li><div className="user-view">
                        <div className="background">
                            <img src='office.jpg' />
                        </div>
                        <a href="#user"><img className="circle" src="user.png" /></a>
                        <a href="#email"><span className="white-text email">{this.props.auth}</span></a>
                    </div></li>
                    <li><a href="#!">Dasboard</a></li>
                    <li><a href="#!">Search Filters</a></li>
                </ul>
                <SearchFilters />
                {this.rendertable()}               
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Dashboard);