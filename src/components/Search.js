import React, { Component } from 'react';
import ElevationList from './ElevationList';
import '../index.css';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newLocation: '',
      locations: [
        "1675 Larimer St, Denver, CO ",
        "33 E Quay Rd, Key West, FL 33040 ",
        "630 Williams St NW, Atlanta, GA "],
      elevations: [],
    };
  }

  addNewLocation = (e) => {
    this.setState({ newLocation: e.target.value });
  }

  addLocation = (e) => {
    e.preventDefault();
    const locations = this.state.locations;
    locations.push(this.state.newLocation);
    this.setState({ newLocation: '', locations });
  }

  search = (e) => {
    e.preventDefault();
    // send request to server.js to hide api keys
    fetch('https://tasman-trackvia-takehome.herokuapp.com/geoCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ locations: this.state.locations })
    }).then(res => {
      console.log(1, res);
      res.json();
      console.log(2, res);
    }).then(r => console.log(3, r))
  }



  render() {
    return (
      <div>
        <form className="form-horizontal well">
          <div className="form-group">
            <div className="col-sm-12">
              <h4>Add Locations to Elevation Search</h4>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-12 control-label">New Location</label>
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-9">
                  <input type="text" className="form-control" onChange={this.addNewLocation} value={this.state.newLocation}/>
                </div>
                <div className="col-sm-3">
                  <button className="btn btn-primary" onClick={this.addLocation}>Add Location</button>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-12 control-label">Added Locations</label>
            <div className="col-sm-12">
              <ul>
                {
                  this.state.locations.map((e, i) => <li key={i}>{e}</li>)
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
        <ElevationList elevations={this.state.elevations} />
      </div>
    );
  }
}

export default Search;
