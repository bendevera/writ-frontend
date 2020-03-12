import React from 'react';

const ModeButtons = (props) => {
    if (props.versionLength > 1) {
        if (props.mode == 'Single') {
            return (
                <div className="btn-group">
                    <button className="btn btn-dark active">Single</button>
                    <button className="btn btn-light" onClick={props.changeMode}>Comparison</button>
                </div>
            )
        } else {
            return (
                <div className="btn-group">
                        <button className="btn btn-light" onClick={props.changeMode}>Single</button>
                        <button className="btn btn-dark active">Comparison</button>
                    </div>
            )
        }
    } else {
        return (
            <div className="btn-group">
                <button className="btn btn-dark active">Single</button>
                <button className="btn btn-light disabled">Comparison</button>
            </div>
        )
    }
}

export default ModeButtons;