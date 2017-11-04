import React, { Component } from 'react';
import '../index.css';
const geoKey = 'AIzaSyAnY-2g8Lvk8QxLUA9ZzmJPQQCZ40BrQLE';
const elevationKey = 'AIzaSyBs_fxmu5CtvqhO9FKuXXQucXL0urSDq7c';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newLocation: '',
      locations: []
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
    this.state.locations.map(city => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${geoKey}`;

      fetch(url).then(res => res.json()).then(geoCode => {
        console.log(geoCode.results[0].geometry.location);
        const lat = geoCode.results[0].geometry.location.lat;
        const lng = geoCode.results[0].geometry.location.lng;
        console.log(lat, lng);
      });


    });
  }


  render() {
    return (
      <form className="form-horizontal well">
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Add Locations to Elevation Search</h4>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">New Location</label>
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-4">
                <input type="text" className="form-control" onChange={this.addNewLocation} value={this.state.newLocation}/>
              </div>
              <div className="col-sm-2">
                <button className="btn btn-primary" onClick={this.addLocation}>Add Location</button>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Added Locations</label>
          <div className="col-sm-4">
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
    );
  }
}

export default Search;
