import React ,{ Component } from 'react';

class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            value : ''
        };
        this.onSearchChange = this.onSearchChange.bind(this);

    }

    onSearchChange(event) {
        this.setState({
          query: event.target.value,
        });
      }

      onSignUp() {
        // Grab state
        const query = this.state;
        
        // Post request to backend
        fetch('/search', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            query: query,
          }),
        })
          .then(json => {
            console.log('json', json);
            if (json.success) {
              this.setState({
                results: res.json,
              });
              window.location.reload();
            }
          });
      }

    render(){
        return(
            <form style ={{"padding-right" : "10rem","padding-left" : "22rem"}} onSubmit = {}>
                <div className="input-field">
                    <input id="search" type="search" required  value={query}  onChange={this.onSearchChange} />
                    <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                    <i className="material-icons">close</i>
                </div>
            </form>
        );

    }
}

export default Search;