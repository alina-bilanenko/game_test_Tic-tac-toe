import React, { Component } from 'react';
import CrossLine from "./CrossLine.js";

class Game extends Component {
    constructor(props) {
        super(props);
        this.changeNewGame = this.changeNewGame.bind(this);
        this.clearGame = this.clearGame.bind(this);
        this.clickCell = this.clickCell.bind(this);
        this.changeActiveClass = this.changeActiveClass.bind(this);
    }

    changeActiveClass(item) {

        let strClass = ([2, 5].includes(item) ? "none-border-r":
            [6, 7].includes(item) ? "none-border" :
                item === 8 ? "none-border-r none-border" : "");

        if (this.props.allGame[item] === "O") {
            strClass += " activePlayer";
        }

        return strClass;
    }

    clickCell(numberCell) {
        this.props.changeAllGame(numberCell);
    }

    changeNewGame() {
        this.props.changeNewGame(true);
    }

    clearGame() {
        this.props.clearGame(true);
    }

    render () {
        return (
            <div className ='game'>
                <CrossLine gameArray = {this.props.gameArray}/>
                <table>
                    <tbody>
                    <tr>
                        <td onClick = {() => this.clickCell(0)}
                            className = {this.changeActiveClass(0)}>
                            {this.props.allGame[0]}
                        </td>
                        <td onClick = {() => this.clickCell(1)}
                            className = {this.changeActiveClass(1)}>
                            {this.props.allGame[1]}
                        </td>
                        <td onClick = {() => this.clickCell(2)}
                            className = {this.changeActiveClass(2)}>
                            {this.props.allGame[2]}
                        </td>
                    </tr>
                    <tr>
                        <td onClick = {() => this.clickCell(3)}
                            className = {this.changeActiveClass(3)}>
                            {this.props.allGame[3]}
                        </td>
                        <td onClick = {() => this.clickCell(4)}
                            className = {this.changeActiveClass(4)}>
                            {this.props.allGame[4]}
                        </td>
                        <td onClick = {() => this.clickCell(5)}
                            className = {this.changeActiveClass(5)}>
                            {this.props.allGame[5]}
                        </td>
                    </tr>
                    <tr className ='none-border'>
                        <td onClick = {() => this.clickCell(6)}
                            className = {this.changeActiveClass(6)}>
                            {this.props.allGame[6]}
                        </td>
                        <td onClick = {() => this.clickCell(7)}
                            className = {this.changeActiveClass(7)}>
                            {this.props.allGame[7]}
                        </td>
                        <td onClick = {() => this.clickCell(8)}
                            className = {this.changeActiveClass(8)}>
                            {this.props.allGame[8]}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="container-buttons">
                    <button onClick = {this.changeNewGame}>Начать заново!</button>
                    <button onClick = {this.clearGame}>Сбросить игру!</button>
                </div>
            </div>
        );
    }
}

export default Game;