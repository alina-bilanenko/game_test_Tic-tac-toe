import React, { Component } from 'react';

class Game extends  Component {
    constructor(props){
        super(props);

        this.changeNewGame = this.changeNewGame.bind(this);
    }

    clickCell(numberCell){
        this.props.changeAllGame(numberCell);
    }

    changeNewGame(){
        this.props.changeNewGame(true);
    }

    render () {
        return (
            <div className='game'>
                <table>
                    <tbody>
                    <tr>
                        <td onClick={this.clickCell.bind(this, 0)}>{this.props.allGame[0]}</td>
                        <td onClick={this.clickCell.bind(this, 1)}>{this.props.allGame[1]}</td>
                        <td onClick={this.clickCell.bind(this, 2)} className='none-border-r'>{this.props.allGame[2]}</td>
                    </tr>
                    <tr>
                        <td onClick={this.clickCell.bind(this, 3)}>{this.props.allGame[3]}</td>
                        <td onClick={this.clickCell.bind(this, 4)}>{this.props.allGame[4]}</td>
                        <td onClick={this.clickCell.bind(this, 5)} className='none-border-r'>{this.props.allGame[5]}</td>
                    </tr>
                    <tr className='none-border'>
                        <td onClick={this.clickCell.bind(this, 6)} className='none-border'>{this.props.allGame[6]}</td>
                        <td onClick={this.clickCell.bind(this, 7)} className='none-border'>{this.props.allGame[7]}</td>
                        <td onClick={this.clickCell.bind(this, 8)} className='none-border-r none-border'>{this.props.allGame[8]}</td>
                    </tr>
                    </tbody>
                </table>
                <button onClick={this.changeNewGame}>Начать заново!</button>
            </div>
        );
    }
}

export default Game;