import React, {Component} from 'react';
import '../App.css';

class ElevationList extends Component {
  elevationSort = () => {
    // set elevations equal to the result of the sorted array
    const elevations = mergeSort(this.props.elevations);

    // I use a merge sort to reduce the BigO to nlogn
    function mergeSort(array) {
      if (array.length > 1) {
        // split the array in half, continue until each array contains one item
        const array1 = array.slice(0, Math.ceil(array.length / 2));
        const array2 = array.slice(Math.ceil(array.length / 2), array.length);

        // return the helper function that combines two given arrays
        return merge(mergeSort(array1), mergeSort(array2));
      } else {
        // exit condition for recursive function when the length of each array is 1
        return array;
      }
    }

    function merge(array1, array2) {
      // new array that the other arrays will merge into
      const newArray = [];
      // while loop to continue for an unknown length
      while (array1.length || array2.length) {
        // if either array is empty push elements from the other array
        if (array1.length && !array2.length) {
         newArray.push(array1.shift());
       } else if (array2.length && !array1.length) {
         newArray.push(array2.shift());
       }
       // Check to see which city has a larger elevation, then push that array
       else if (array1[0][1] >= array2[0][1]) {
          newArray.push(array1.shift());
        } else if (array2[0][1] >= array1[0][1]) {
          newArray.push(array2.shift());
        }
      }
      // return the sorted array, so that it can be merged with other arrays
      return newArray;
    }

    // return the sorted array of cities to map over in the component
    return elevations;
  }

  render() {
    return (
      <div className="col-sm-12">
        {
          // first sort the array of elevations, then map over it and display it
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
