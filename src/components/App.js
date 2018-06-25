import React, { Component } from 'react'
import LevelGame from './LevelGame.js'
import PlayerPanel from './PlayerPanel.js'
import Game from './Game.js'
import ErrorBoundary from './ErrorBoundary.js'

class App extends Component {
  constructor () {
    super()
    this.allGameNull = new Array(9).fill(null)
    this.gameArray = [...this.allGameNull]
    this.player = null
    this.winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    this.state = {
      auto: false,
      gameOver: [],
      level: 'easy',
      currentPlayer: null,
      victory: {
        victoryTimes: 0,
        victoryCircle:0
      },
      newGame: true,
      textForPlayer: 'Выберите игрока',
      classForPlayer: {
        playerTimes: '',
        playerCircle: ''
      },
      allGame: [...this.allGameNull],
      disabledSelect: false
    }
  }

  changeLevel = (newLevel) => { this.setState({ level: newLevel }) }

  changePlayer = (newPlayer) => {
    this.setState(prevState => {
      return (prevState.currentPlayer)
        ? prevState
        : { currentPlayer: newPlayer }
    })
    if (!this.player) {
      this.player = newPlayer
      this.changeTextForPlayer(newPlayer)
    }
  }

  changeVictory () {
    let victoryPlayer = this.state.currentPlayer === 'X'
      ? 'victoryTimes'
      : 'victoryCircle'

    let newVictory = Object.assign({}, this.state.victory, {
      [victoryPlayer]: this.state.victory[victoryPlayer] + 1
    })

    this.setState({ victory: newVictory })
  }

  changeNewGame = () => {
    this.gameArray = [...this.allGameNull]
    this.changeTextForPlayer(this.player)

    this.setState({
      newGame: true,
      allGame: [...this.allGameNull],
      gameOver: [],
      auto: false,
      currentPlayer: this.player,
      disabledSelect: false
    })
  }

  clearGame = () => {
    this.gameArray = [...this.allGameNull]
    this.player = null

    this.setState({
      auto: false,
      gameOver: [],
      level: 'easy',
      currentPlayer: null,
      victory: {
        victoryTimes: 0,
        victoryCircle:0
      },
      newGame: true,
      textForPlayer: 'Выберите игрока',
      classForPlayer: {
        playerTimes: '',
        playerCircle: ''
      },
      allGame: [...this.allGameNull],
      disabledSelect: false
    })
  }

  changeAllGame = (item) => {
    if (
      this.state.gameOver.length > 0 ||
      (this.state.currentPlayer !== this.player && this.state.level !== 'together') ||
      (this.state.auto && this.state.level !== 'together')
    ) { return }

    this.gameArray = [...this.state.allGame]

    if (this.gameArray[item]) {
      return
    }
    this.gameArray[item] = this.state.currentPlayer

    this.setState({ allGame: [...this.gameArray], auto: true, disabledSelect: !!this.player }, () => {
      setTimeout(this.automaticMove.bind(this), 1000)
    })
    this.checkWin()
  }

  automaticMove () {
    if (this.state.level === 'together' || !this.state.auto || this.state.gameOver.length > 0) {
      return
    }

    let gameArrayFilter = []
    this.gameArray.forEach(function (item, i) {
      if (!item) {
        gameArrayFilter.push(i)
      }
    })

    let rand = Math.floor(Math.random() * gameArrayFilter.length)
    let indexArrayFilter = gameArrayFilter[rand]

    switch (this.state.level) {
      case 'easy':
        this.gameArray[indexArrayFilter] = this.state.currentPlayer
        break
      case 'medium':
        this.levelGame(indexArrayFilter, false)
        break
      case 'hard':
        this.levelGame(indexArrayFilter, true)
        break
      default:
        break
    }

    this.setState({ allGame: [...this.gameArray], auto: false })
    this.checkWin()
  }

  levelGame = (indexArrayFilter, hard) => {
    let smallIndex = []
    let end = false
    let hardBlockMove = []

    for (let i = 0; i < this.winningCombinations.length; ++i) {
      let countGeneralPlayer = 0
      let countAutoPlayer = 0
      let index = []

      this.winningCombinations[i].forEach((j) => {
        switch (this.gameArray[j]) {
          case this.player:
            countGeneralPlayer++
            break
          case null:
            index.push(j)
            break
          case this.state.currentPlayer:
            countAutoPlayer++
            break
          default:
            break
        }
      })

      if (!hard && countGeneralPlayer === 2 && index.length) {
        this.gameArray[index[0]] = this.state.currentPlayer
        end = true
        break
      } else
      if (!hard && countGeneralPlayer === 1 && index.length) {
        smallIndex.push(...index)
      } else
      if (hard && countAutoPlayer === 2 && index.length) {
        this.gameArray[index[0]] = this.state.currentPlayer
        end = true
        break
      } else
      if (hard && countGeneralPlayer === 2 && index.length) {
        hardBlockMove.push(index[0])
      } else
      if (hard && countAutoPlayer === 1 && index.length) {
        smallIndex.push(...index)
      }
    }

    if (end) { return }

    if (hardBlockMove.length > 0) {
      let randHard = Math.floor(Math.random() * hardBlockMove.length)
      this.gameArray[hardBlockMove[randHard]] = this.state.currentPlayer
    } else if (smallIndex.length > 0) {
      let rand = Math.floor(Math.random() * smallIndex.length)
      this.gameArray[smallIndex[rand]] = this.state.currentPlayer
    } else {
      this.gameArray[indexArrayFilter] = this.state.currentPlayer
    }
  }

  checkWin () {
    if (!this.state.currentPlayer) { return }
    let win = false
    this.winningCombinations.forEach((item) => {
      let count = 0
      item.forEach((j) => {
        if (this.gameArray[j] === this.state.currentPlayer) {
          count++
        }
      })
      if (count === 3) {
        win = item
      }
    })

    if (win) {
      this.changeVictory()
      this.setState({ gameOver: win })
      this.changeTextForPlayer(this.state.currentPlayer)
    } else {
      let newPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X'
      this.changeTextForPlayer(newPlayer)
      this.setState({ currentPlayer: newPlayer })
    }
  }

  changeTextForPlayer (newPlayer) {
    this.setState((prevState) => {
      return ({
        textForPlayer: (!prevState.currentPlayer)
          ? 'Выберите игрока'
          : (prevState.gameOver.length > 0)
            ? `ПОБЕДИЛ ИГРОК ${newPlayer}`
            : `Ходит игрок  ${newPlayer}`,
        classForPlayer: {
          playerTimes: (newPlayer === 'X') ? 'activePlayer' : '',
          playerCircle: (newPlayer === 'O') ? 'activePlayer' : ''
        }
      })
    })
  }

  render () {
    let {level, gameOver, disabledSelect, currentPlayer, textForPlayer, victory, classForPlayer, allGame} = this.state
    return (
      <ErrorBoundary>
        <div className='main-block'>
          <LevelGame currentLevel={level}
                     changeLevel={this.changeLevel}
                     gameOver={gameOver}
                     disabledSelect={disabledSelect}
          />
          <PlayerPanel currentPlayer={currentPlayer}
                       changePlayer={this.changePlayer}
                       textForPlayer={textForPlayer}
                       victory={victory}
                       classForPlayer={classForPlayer}
          />
          <Game changeNewGame={this.changeNewGame}
                allGame={allGame}
                changeAllGame={this.changeAllGame}
                clearGame={this.clearGame}
                gameArray={gameOver}
          />
        </div>
      </ErrorBoundary>
    )
  }
}

export default App
