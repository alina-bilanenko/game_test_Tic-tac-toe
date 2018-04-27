import React, { Component } from 'react';

class PlayerPanel extends  Component {
    constructor (props) {
        super(props);
        this.selectPlayer = this.selectPlayer.bind(this);
    }

    selectPlayer(player) {
        this.props.changePlayer(player);
    }


    render () {
        return (
            <div className = 'player-panel'>
                <div className = 'icon'>
                    <div onClick = {() => this.selectPlayer("X")}>
                        <p className = {this.props.classForPlayer.playerTimes}>X</p>
                        <p>{this.props.victory.victoryTimes}</p>
                    </div>
                    <div onClick = {() => this.selectPlayer("O")}>
                        <p className = {this.props.classForPlayer.playerCircle}>O</p>
                        <p>{this.props.victory.victoryCircle}</p>
                    </div>
                </div>
                <p>{this.props.textForPlayer}</p>
            </div>
        );
    }
}

export default PlayerPanel;