import React, { Component } from 'react';
import ElevationList from './ElevationList.jsx';
import '../index.css';
const key = 'AIzaSyCR170bZ7FgpB7JdxPwS2hzAUSmyfEhS64';

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
    if (this.state.elevations.length) {
      this.setState({ elevations: [] });
    }
    this.state.locations.map(city => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${key}`;

      fetch(url).then(res => res.json()).then(geoCode => {
        const lat = geoCode.results[0].geometry.location.lat;
        const lng = geoCode.results[0].geometry.location.lng;
        const url2 = `https://maps.googleapis.com/maps/api/elevation/json?locations=${lat},${lng}&key=${key}`;
        console.log(1);

        // fetch(url2).then(response => response.json()).then(elev => {
        //   const elevations = this.state.elevations;
        //   const elevation = elev.results[0].elevation;
        //   elevations.push([city, elevation]);
        //   this.setState({ elevations });
        // });
      });


    });
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
