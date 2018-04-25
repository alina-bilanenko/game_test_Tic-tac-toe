import React, { Component } from 'react';
import times from '../css/times.svg';
import circle from '../css/circle.svg';

class PlayerPanel extends  Component {

    selectPlayer(player) {
        this.props.changePlayer(player);
    }


    render () {
        return (
            <div className='player-panel'>
                <div className='icon'>
                    <div onClick={this.selectPlayer.bind(this, "X")} className = {this.props.classForPlayer.playerTimes}>
                        <div>
                            <img className = 'img' src={times} alt = 'times'/>
                        </div>
                        <div className='win'>
                            <p>{this.props.victory.victoryTimes}</p>
                        </div>
                    </div>
                    <div onClick={this.selectPlayer.bind(this, "O")} className = {this.props.classForPlayer.playerCircle}>
                        <div>
                            <img className = 'img' src={circle} alt = 'circle'/>
                        </div>
                        <div className='win'>
                            <p>{this.props.victory.victoryCircle}</p>
                        </div>
                    </div>
                </div>
                <p>{this.props.textForPlayer} </p>
            </div>
        );
    }
}

export default PlayerPanel;