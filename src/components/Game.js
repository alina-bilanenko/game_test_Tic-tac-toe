import React, { Component } from 'react'
import CrossLine from './CrossLine.js'
import PropTypes from 'prop-types'

class Game extends Component {
  static Row = ({ cellData, changeActiveClass, allGame, changeAllGame }) => (
    <tr>
      {cellData.map(({ idx }) => (
        <td onClick={() => changeAllGame(idx)}
          className={changeActiveClass(idx, allGame[idx])}
          key={idx}>
          {allGame[idx]}
        </td>
      ))}
    </tr>
  )

  changeActiveClass = (item, value) => {
    let strClass = ([2, 5].includes(item) ? 'none-border-r'
      : [6, 7].includes(item) ? 'none-border'
        : item === 8 ? 'none-border-r none-border' : '')

    if (value === 'O') {
      strClass += ' activePlayer'
    }

    return strClass
  }

  render () {
    let { allGame, changeAllGame, clearGame, gameArray, changeNewGame } = this.props
    const collection = [
      { cellData: [{ idx: 0 }, { idx: 1 }, { idx: 2 }] },
      { cellData: [{ idx: 3 }, { idx: 4 }, { idx: 5 }] },
      { cellData: [{ idx: 6 }, { idx: 7 }, { idx: 8 }] }
    ]
    return (
      <div className='game'>
        <CrossLine gameArray={gameArray} />
        <table>
          <tbody>
            {collection.map((item, idx) =>
              <Game.Row {...item}
                changeActiveClass={this.changeActiveClass}
                allGame={allGame}
                changeAllGame={changeAllGame}
                key={idx}
              />)}
          </tbody>
        </table>
        <div className='container-buttons'>
          <button onClick={changeNewGame}>Начать заново!</button>
          <button onClick={clearGame}>Сбросить игру!</button>
        </div>
      </div>
    )
  }
}

Game.propTypes = {
  gameArray: PropTypes.array,
  allGame: PropTypes.array,
  changeAllGame: PropTypes.func,
  changeNewGame: PropTypes.func,
  clearGame: PropTypes.func
}

export default Game
