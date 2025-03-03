import React, {Component} from 'react';

import Pancake from './Pancake';

export default class Game extends Component {
  state = {
      time: undefined,
      pancakes: [],
      cooked: 0,
      burnt: 0,
      raw: 0
  }

  componentDidMount() {
    this.setCurrentTime()
  }

  setCurrentTime = () => {
    this.setState({ time: new Date(Date.now())});
  }

  addPancake = () => {
    this.setState( prevState => {
      return {
        pancakes: [...prevState.pancakes, Date.now()]
      }
    });
  }

  takeItOff = (id, status) => {
    const { pancakes, cooked, burnt, raw } = this.state;

    this.setState({
      pancakes: pancakes.filter(pancake => !(pancake === id)),
      cooked: status === 'cooked' ? cooked + 1 : cooked,
      burnt: status === 'burnt' ? burnt + 1 : burnt,
      raw: status === 'raw' ? raw + 1 : raw
    });
  }

  render() {
    const { pancakes, burnt, cooked, raw, time } = this.state;
    const cakes = pancakes.map((pancake, index) => <Pancake key={index} id={pancake} takeItOff={this.takeItOff} />);

    return (
      <div className="Game">
        <span>Pancake shop opened at: {time ? time.toString() : ''}</span>
        <div>
          <div className="Game__score --cooked">Cooked: {cooked}</div>
          <div className="Game__score --burnt">Burnt: {burnt}</div>
          <div className="Game__score --raw">Raw: {raw}</div>
        </div>
        <button
          onClick={this.addPancake}
          className="Game__button"
        >
          New pancake!
        </button>
        <div className="Game__pancakes">{cakes}</div>
      </div>
    )
  }
}