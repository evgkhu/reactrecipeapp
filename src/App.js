import React, { Component } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/dist/united/bootstrap.css";

import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  { name: "Sandwich", zip: "Sandwich" },
  { name: "Omlet", zip: "Omlet" },
  { name: "Beef", zip: "beef" },
  { name: "Pasta", zip: "pasta" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const URL = "http://food2fork.com/api/search?key=1306fe6053090625bc74a2aba9e7308b&count=1&q=" +zip; 
    fetch(proxyUrl + URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
     
    const recipes = weatherData.recipes;
  
    return (
      <div>
        <h1>
          {this.state.weatherData.recipes[0].title}
          <img src={this.state.weatherData.recipes[0].image_url} alt=''  />
        </h1>
        <p>Current: {this.state.weatherData.count.ingridients}</p>
      
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              React Simple Weather App
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Select a meal</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;