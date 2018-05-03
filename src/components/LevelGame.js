import React, { Component } from 'react';

class LevelGame extends  Component {

    selectOnChange = (e)=>{
        this.props.changeLevel(e.target.value);
    }

    render () {
        return (
            <div className='level'>
                <select onChange={this.selectOnChange}
                        value={this.props.currentLevel}
                        className='level-game'
                        disabled={this.props.disabledSelect}>
                    <option value='easy'>Легкий</option>
                    <option value='medium'>Средний</option>
                    <option value='hard'>Сложный</option>
                    <option value='together'>Играть с другом</option>
                </select>
            </div>
        );
    }
}

export default LevelGame;
