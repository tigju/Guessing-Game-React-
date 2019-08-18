import React, {Component} from 'react';
import './App.css';
import Box from './Box'
import Navbar from './Navbar'

const CardState = {
        HIDE: 0,
        SHOW: 1,
        MATCH: 2
    }
    
class App extends Component {
  
  constructor(props) {
    super(props)
    
    let cards = [
      {id: 0, cardState: CardState.HIDE, backgroundColor: "red" },
      {id: 1, cardState: CardState.HIDE, backgroundColor: "red" },
      {id: 2, cardState: CardState.HIDE, backgroundColor: "navy" },
      {id: 3, cardState: CardState.HIDE, backgroundColor: "navy" },
      {id: 4, cardState: CardState.HIDE, backgroundColor: "green" },
      {id: 5, cardState: CardState.HIDE, backgroundColor: "green" },
      {id: 6, cardState: CardState.HIDE, backgroundColor: "yellow" },
      {id: 7, cardState: CardState.HIDE, backgroundColor: "yellow" },
      {id: 8, cardState: CardState.HIDE, backgroundColor: "black" },
      {id: 9, cardState: CardState.HIDE, backgroundColor: "black" },
      {id: 10, cardState: CardState.HIDE, backgroundColor: "purple" },
      {id: 11, cardState: CardState.HIDE, backgroundColor: "purple" },
      {id: 12, cardState: CardState.HIDE, backgroundColor: "pink" },
      {id: 13, cardState: CardState.HIDE, backgroundColor: "pink" },
      {id: 14, cardState: CardState.HIDE, backgroundColor: "lightskyblue" },
      {id: 15, cardState: CardState.HIDE, backgroundColor: "lightskyblue" },
    ];
    
    this.state = {cards: this.shuffle(cards)}
  
  }
  
  shuffle = (array) => {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
  }
  
  handleNewGameClick = () => {
    let cards = this.state.cards.map((card) => ({
      ...card,
      cardState: CardState.HIDE
    }))
    cards = this.shuffle(cards)
    this.setState({cards})
  }
  
  handleClick = (id) => {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map((card) => {
        if(idsToChange.includes(card.id)) {
          return {
            ...card,
            cardState: newCardState
          }
        }
        return card;
      })
    }
    
    const foundCard = this.state.cards.find((card) => card.id === id)
    
    if(this.state.noClick || foundCard.cardState !== CardState.HIDE) {
      return
    }
    
    let noClick = false;
    
    let cards = mapCardState(this.state.cards, [id], CardState.SHOW)
    
    const showingCards = cards.filter((card) => { return card.cardState === CardState.SHOW })
    
    const ids = showingCards.map((card) => { return card.id})
    
    if(showingCards.length === 2 && showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, CardState.MATCH)
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDE)
      
      noClick = true
      
      this.setState({cards, noClick}, () => {
        setTimeout(()=> {
          this.setState({cards: hidingCards, noClick: false})
        }, 1300)
      })
      return
    }
    this.setState({cards, noClick})
  }
  
  render() {
    console.log(this.state)
    const shuffledCards = this.state.cards.map((card, i) => (
        <Box key={card.id} 
        backgroundColor={card.backgroundColor} 
        showing={card.cardState !== CardState.HIDE}
        onClick={() => {this.handleClick(card.id)}}
        />
      ))
    return (
      <div className="App">
        <Navbar onNewGame={this.handleNewGameClick} />
        {shuffledCards}
      </div>
    )
  }
}

export default App;
