import React, { Component } from 'react';
import '../index.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCity: '',
      cities: []
    };
  }

  addNewCity = (e) => {
    this.setState({ newCity: e.target.value });
  }

  addCity = (e) => {
    e.preventDefault();
    const cities = this.state.cities;
    cities.push(this.state.newCity);
    this.setState({ newCity: '', cities });
  }

  search = (e) => {
    e.preventDefault();
    this.state.cities.map(city => {
      city.replace(' ', '+');
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${key}`

      fetch(url);


    });
  }


  render() {
    return (
      <form className="form-horizontal well">
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Add Cities to Elevation Search</h4>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">New City</label>
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-4">
                <input type="text" className="form-control" id="newCity" name="newCity" onChange={this.addNewCity} value={this.state.newCity}/>
              </div>
              <div className="col-sm-2">
                <button className="btn btn-primary" onClick={this.addCity}>Add City</button>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Added Cities</label>
          <div className="col-sm-4">
            <ul>
              {
                this.state.cities.map((e, i) => <li key={i}>{e}</li>)
              }
            </ul>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8">
            <input type="submit" value="Search Elevations" className="btn btn-primary" onClick={this.search}/>
          </div>
        </div>
      </form>
    );
  }
}

export default Search;
