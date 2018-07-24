import React, { Component } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/dist/sketchy/bootstrap.css";

import { Image, Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const Meals = [
  { name: "Sandwich", rid: "35382" },
  { name: "Pizza", rid: "47746" },
  { name: "Beef", rid: "49640" },
  { name: "Pasta", rid: "47025" }
];


class MealsDisplay extends Component {
  constructor() {
    super();
    this.state = {
      mealsData: null
    };
    
  }
  
  componentDidMount= () =>{
    const rid = this.props.rid;
    const URL = "http://food2fork.com/api/get?key=1306fe6053090625bc74a2aba9e7308b&rId=" +rid; 
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
     fetch(proxyUrl+URL)
      .then(response => response.json())
      .then(mealsData => this.setState({ mealsData }));
    }
   
  render() {
    const mealsData = this.state.mealsData;
    if (!mealsData) return <div>Loading</div>;
     
    const recipes = mealsData.recipe;
    const ingredients = mealsData.recipe.ingredients.map((data) => {
  return (
    <li>{data}</li>
        );
      });
   
   
    return (
      <div>
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
             <h1> {recipes.title} </h1>
          </Col>
  
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <Image src={recipes.image_url} responsive  rounded />
          </Col>
        </Row> 
        <br />
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <p>Ingredients</p> {ingredients}
          </Col>
        </Row>
      </Grid>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeMeal: 0
    };
  }
  render() {
    const activeMeal = this.state.activeMeal;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              React Recipes App
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
                activeKey={activeMeal}
                onSelect={index => {
                  this.setState({ activeMeal: index });
                }}
              >
                {Meals.map((meal, index) => (
                  <NavItem key={index} eventKey={index}>{meal.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <MealsDisplay key={activeMeal} rid={Meals[activeMeal].rid} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;