import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PlayerPanel extends Component {
  selectPlayer = (player) => {
    this.props.changePlayer(player)
  }

  render () {
    let { classForPlayer, victory, textForPlayer } = this.props
    return (
      <div className='player-panel'>
        <div className='icon'>
          <div onClick={() => this.selectPlayer('X')}>
            <p className={classForPlayer.playerTimes}>X</p>
            <p>{victory.victoryTimes}</p>
          </div>
          <div onClick={() => this.selectPlayer('O')}>
            <p className={classForPlayer.playerCircle}>O</p>
            <p>{victory.victoryCircle}</p>
          </div>
        </div>
        <p>{textForPlayer}</p>
      </div>
    )
  }
}

PlayerPanel.propTypes = {
  changePlayer: PropTypes.func,
  victory: PropTypes.object,
  textForPlayer: PropTypes.string,
  classForPlayer: PropTypes.object
}

export default PlayerPanel
