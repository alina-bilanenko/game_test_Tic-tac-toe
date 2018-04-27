import React, { Component } from 'react';

class CrossLine extends Component {
    constructor(props) {
        super(props);

        this.classCrossLine = new Map();

        this.classCrossLine
            .set([0, 1, 2], "display: block; top: 3.5em;")
            .set([3, 4, 5], "display: block; top: 10em;")
            .set([6, 7, 8], "display: block; top: 16.5em;")
            .set([0, 3, 6], "display: block; transform: rotate(90deg); top: 10.5em; left: -2.8em;")
            .set([1, 4, 7], "display: block; transform: rotate(90deg); top: 10.5em; left: 3.8em;")
            .set([2, 5, 8], "display: block; transform: rotate(90deg); top: 10.5em; left: 10.3em;")
            .set([0, 4, 8], "display: block; transform: rotate(45deg); top: 10.5em; left: 3.8em;")
            .set([2, 4, 6], "display: block; transform: rotate(-45deg); top: 10.5em; left: 3.8em;");
    }

    componentDidUpdate () {

        let crossLineStyle = document.getElementsByClassName("cross-line")[0];

        if (!this.props.gameArray.length) {
            crossLineStyle.style.cssText = "display: none;";
            return;
        }

        let gameWinner = this.props.gameArray.join(',');

        for (let entry of this.classCrossLine.entries()) {
            let strArray = entry[0].join(',');
            if (strArray === gameWinner) {
                crossLineStyle.style.cssText = entry[1];
            }
        }
    }

    render() {
        return (
            <div className = "cross-line"/>
        );
    }
}

export default CrossLine;