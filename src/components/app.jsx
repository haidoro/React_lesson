import React, { Component } from 'react';
import axios from 'axios';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  handlePlaceSubmit(place){
    axios.get(GEOCODE_ENDPOINT,{ params: {address: place} })
    .then((results) =>{
      console.log(results);
      const data = results.data;
      const result = results.data.results[0];
      if(data.status === 'OK'){
        const location = result.geometry.location;
        this.setState({
        address: result.formatted_address,
        lat: location.lat,
        lng: location.lng,
      })
      }else if(data.status === 'ZERO_RESULTS'){
        this.setState({
        address: '結果が見つかりませんでした',
        lat: '***',
        lng: '***',
      })
      }else{
        this.setState({
        address: 'エラーです',
        lat: '***',
        lng: '***',
      })
      }
  })
  .catch((error) => {
    this.setState({
      address: '通信エラーです',
      lat: '***',
      lng: '***',
    })
  })
  }

  render() {
    return (
      <div>
        <h1>緯度経度検索</h1>
        <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
        <GeocodeResult address={this.state.address} lat={this.state.lat} lng={this.state.lng} />
      </div>
    );
  }
}

export default App;
