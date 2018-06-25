import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LevelGame extends Component {
  selectOnChange = (e) => {
    this.props.changeLevel(e.target.value)
  }

  render () {
    let { currentLevel, disabledSelect } = this.props
    return (
      <div className='level'>
        <select onChange={this.selectOnChange}
          value={currentLevel}
          className='level-game'
          disabled={disabledSelect}>
          <option value='easy'>Легкий</option>
          <option value='medium'>Средний</option>
          <option value='hard'>Сложный</option>
          <option value='together'>Играть с другом</option>
        </select>
      </div>
    )
  }
}

LevelGame.propTypes = {
  changeLevel: PropTypes.func,
  currentLevel: PropTypes.string,
  disabledSelect: PropTypes.bool
}
export default LevelGame
