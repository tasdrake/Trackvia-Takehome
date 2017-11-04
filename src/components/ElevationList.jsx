import React, {Component} from 'react';
import '../App.css'
class ElevationList extends Component {
  elevationSort = () => {
    const elevations = mergeSort(this.props.elevations);

    function mergeSort(array) {
      if (array.length > 1) {
        const array1 = array.slice(0, Math.ceil(array.length / 2));
        const array2 = array.slice(Math.ceil(array.length / 2), array.length);
        return merge(mergeSort(array1), mergeSort(array2));
      } else {
        return array;
      }
    }

    function merge(array1, array2) {
      const newArray = [];
      while (array1.length || array2.length) {
        if (array1.length && !array2.length) {
         newArray.push(array1.shift());
       } else if (array2.length && !array1.length) {
         newArray.push(array2.shift());
       } else if (array1[0][1] >= array2[0][1]) {
          newArray.push(array1.shift());
        } else if (array2[0][1] >= array1[0][1]) {
          newArray.push(array2.shift());
        }
      }
      return newArray;
    }
    return elevations;
  }

  render() {
    return (
      <div className="col-sm-12">
        {
          this.elevationSort().map((e, i) => {
            return (
              <div key={i} className="list">
                <p>{e[0]}</p><p>{e[1]}</p>
              </div>
            );
          })
        }
      </div>
  );
  }
}

export default ElevationList;
