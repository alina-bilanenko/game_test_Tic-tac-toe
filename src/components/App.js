import React, { Component } from 'react';
import LevelGame from './LevelGame.js';
import PlayerPanel from './PlayerPanel.js';
import Game from './Game.js';

class App extends Component {
    constructor(){
        super();
        this.allGameNull = new Array(9).fill(null);
        this.gameArray = new Array(9).fill(null);
        this.player = null;
        this.winningCombinations = [[0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]];


        this.state = {
            auto: false,
            gameOver: false,
            level: "easy",
            currentPlayer: null,
            victory: {
                victoryTimes: 0,
                victoryCircle:0
            },
            newGame: true,
            textForPlayer: "Выберите игрока",
            classForPlayer: {
                playerTimes: "",
                playerCircle: ""
            },
            allGame: this.allGameNull,
        };

        this.changeLevel = this.changeLevel.bind(this);
        this.changePlayer = this.changePlayer.bind(this);
        this.changeVictory = this.changeVictory.bind(this);
        this.changeNewGame = this.changeNewGame.bind(this);
        this.changeTextForPlayer = this.changeTextForPlayer.bind(this);
        this.changeAllGame = this.changeAllGame.bind(this);
        this.checkWin = this.checkWin.bind(this);
        this.automaticMove = this.automaticMove.bind(this);
        this.levelGame = this.levelGame.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({level: newLevel});
    }

    changePlayer(newPlayer) {
        this.setState(prevState => {
            if (prevState.currentPlayer) {
                return prevState;
            } else {
                return {currentPlayer: newPlayer};
            }
        });
        if (!this.player) {
            this.player = newPlayer;
            this.changeTextForPlayer(newPlayer);
        }
    }

    changeVictory(){
        let victoryPlayer = this.state.currentPlayer === "X" ? "victoryTimes":  "victoryCircle";

        let newVictory = Object.assign({}, this.state.victory, {
            [victoryPlayer]: this.state.victory[victoryPlayer] + 1,
        });

        this.setState({victory: newVictory});
    }

    changeNewGame(playNewGame){

        this.gameArray = this.allGameNull;
        this.changeTextForPlayer(this.player);

        this.setState({newGame: playNewGame ? playNewGame : false,
            allGame: this.allGameNull,
            gameOver: false,
            auto: false,
            currentPlayer: this.player});
    }

    changeAllGame(item){

        if(this.state.gameOver || !this.state.currentPlayer || this.state.auto) {return;}
        this.gameArray = this.state.allGame.slice();

        if(this.gameArray[item]) {
            return;
        }
        this.gameArray[item] = this.state.currentPlayer;

        this.setState({allGame: this.gameArray, auto: true}, () => {
            setTimeout(this.automaticMove.bind(this), 2000);
        });
        this.checkWin();

    }


    automaticMove() {

        if (this.state.level === "together" || !this.state.auto || this.state.gameOver) {
            return;
        }

        let gameArrayFilter = [];
        this.gameArray.forEach(function (item, i) {
            if (!item) {
                gameArrayFilter.push(i);
            }
        });

        let rand = Math.floor(Math.random() * gameArrayFilter.length);
        let indexArrayFilter = gameArrayFilter[rand];


        if(this.state.level === "easy") {
            this.gameArray[indexArrayFilter] = this.state.currentPlayer;
        } else if(this.state.level === "medium") {
            this.levelGame(indexArrayFilter, false);
        } else if(this.state.level === "hard") {
            this.levelGame(indexArrayFilter, true);
        }

        this.setState({allGame: this.gameArray, auto: false});
        this.checkWin();
    }

    levelGame(indexArrayFilter, hard) {

        let smallIndex = [];
        let end = false;
        for(let i = 0; i < this.winningCombinations.length; ++i){
            let countGeneralPlayer = 0;
            let countAutoPlayer = 0;
            let index = [];
            this.winningCombinations[i].forEach((j) => {
                switch (this.gameArray[j]) {
                    case this.player:
                        countGeneralPlayer++;
                        break;
                    case null:
                        index.push(j);
                        break;
                    case this.state.currentPlayer:
                        countAutoPlayer++;
                        break;
                    default:
                        break;
                }
            });

            if(!hard){
                if (countGeneralPlayer === 2 && index.length) {
                    this.gameArray[index[0]] = this.state.currentPlayer;
                    end = true;
                    break;
                } else if (countGeneralPlayer === 1 && index.length) {
                    smallIndex.push(...index);
                }
            } else {
                if(countAutoPlayer === 2 && index.length) {
                    this.gameArray[index[0]] = this.state.currentPlayer;
                    end = true;
                    break;
                } else if (countGeneralPlayer === 2 && index.length) {
                    this.gameArray[index[0]] = this.state.currentPlayer;
                    end = true;
                    break;
                } else if (countAutoPlayer === 1 && index.length) {
                    smallIndex.push(...index);
                }
            }

        }

        if(end) {return;}

        if(smallIndex.length > 0) {
            let rand = Math.floor(Math.random() * smallIndex.length);
            this.gameArray[smallIndex[rand]] = this.state.currentPlayer;
        } else {
            this.gameArray[indexArrayFilter] = this.state.currentPlayer;
        }
    }

    checkWin(){
        let win = false;

        this.winningCombinations.forEach((item) => {
            let count = 0;
            item.forEach((j) => {
                if (this.gameArray[j] === this.state.currentPlayer) {
                    count++;
                }
            });
            if (count === 3) {
                win = item;
            }
        });

        if (win) {
            this.changeVictory();
            this.setState({gameOver: win});
        } else {
            let newPlayer = this.state.currentPlayer === "X" ? "O" : "X";
            this.changeTextForPlayer(newPlayer);
            this.setState({currentPlayer: newPlayer});
        }

    }

    changeTextForPlayer(newPlayer){
        this.setState((prevState) => {
            return ({
                textForPlayer: (!prevState.currentPlayer) ? "Выберите игрока" : `Ходит игрок  ${newPlayer}`,
                classForPlayer: {
                    playerTimes: (newPlayer === "X") ? "activePlayer" : "",
                    playerCircle: (newPlayer === "O") ? "activePlayer" : ""
                }
            });
        });
    }

    render() {
        return (
            <div className='main-block'>
                <LevelGame currentLevel={this.state.level} changeLevel={this.changeLevel} />
                <PlayerPanel currentPlayer={this.state.currentPlayer} changePlayer={this.changePlayer}
                             textForPlayer={this.state.textForPlayer} victory={this.state.victory}
                             classForPlayer = {this.state.classForPlayer}/>
                <Game changeNewGame={this.changeNewGame} allGame = {this.state.allGame} changeAllGame={this.changeAllGame}/>
            </div>
        );
    }
}

export default App;
