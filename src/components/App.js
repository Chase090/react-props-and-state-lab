import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (breed) => {
   this.setState({
     filters: {type: breed}
   })

  }

  onFindPetsClick = () => { 
    let endPoint = "/api/pets"

    if (this.state.filters.type !== 'all'){
      endPoint += `?type=${this.state.filters.type}`
    }

    // filtered end point  "/api/pets?=type=cat"
    fetch(endPoint)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        pets: data
      })
    })
  }

  onAdoptPet = (petId) => {
    const updatedPets = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true } : pet
    })
    this.setState({
      pets: updatedPets
    })
    // this callback should take in an id for a pet, find the matching pet in state.pet, and set the isAdopted property to true
  }

  // componentDidMount(){
  //   this.onFindPetsClick()
  // }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}

              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
