import React, { Component } from 'react';

class Game extends Component {
    constructor(props) {
        super(props);
        this.changeNewGame = this.changeNewGame.bind(this);
        this.clearGame = this.clearGame.bind(this);
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
                <table>
                    <tbody>
                    <tr>
                        <td onClick = {this.clickCell.bind(this, 0)} className = {(this.props.allGame[0] === "O") ? "activePlayer" : ""}>{this.props.allGame[0]}</td>
                        <td onClick = {this.clickCell.bind(this, 1)} className = {(this.props.allGame[1] === "O") ? "activePlayer" : ""}>{this.props.allGame[1]}</td>
                        <td onClick = {this.clickCell.bind(this, 2)} className = {`${(this.props.allGame[2] === "O") ? "activePlayer" : ""} none-border-r`}>{this.props.allGame[2]}</td>
                    </tr>
                    <tr>
                        <td onClick = {this.clickCell.bind(this, 3)} className = {(this.props.allGame[3] === "O") ? "activePlayer" : ""}>{this.props.allGame[3]}</td>
                        <td onClick = {this.clickCell.bind(this, 4)} className = {(this.props.allGame[4] === "O") ? "activePlayer" : ""}>{this.props.allGame[4]}</td>
                        <td onClick = {this.clickCell.bind(this, 5)} className = {`${(this.props.allGame[5] === "O") ? "activePlayer" : ""} none-border-r`}>{this.props.allGame[5]}</td>
                    </tr>
                    <tr className ='none-border'>
                        <td onClick = {this.clickCell.bind(this, 6)} className = {`${(this.props.allGame[6] === "O") ? "activePlayer" : ""} none-border`}>{this.props.allGame[6]}</td>
                        <td onClick = {this.clickCell.bind(this, 7)} className = {`${(this.props.allGame[7] === "O") ? "activePlayer" : ""} none-border`}>{this.props.allGame[7]}</td>
                        <td onClick = {this.clickCell.bind(this, 8)} className = {`${(this.props.allGame[8] === "O") ? "activePlayer" : ""} none-border-r none-border`}>{this.props.allGame[8]}</td>
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