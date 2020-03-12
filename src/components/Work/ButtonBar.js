import React from 'react';
import ModeButtons from './ModeButtons';

const ButtonBar = (props) => {
    if (props.mode == "Single") {
        return (
            <div className="btn-toolbar justify-content-between">
                <ModeButtons
                    versionLength={props.versions.length}
                    mode={props.mode}
                    changeMode={props.changeMode} />
                <div className="btn-group">
                    {props.versions.map((item) => {
                        if (item.number == props.currNum) {
                            if (item.unsavedChanges) {
                                return (
                                    <button 
                                        className="btn btn-light" 
                                        key={item.number} 
                                        value={item.number}
                                        onClick={props.versionChange}>V{item.number} <span style={{color: "Tomato"}}><i className="fas fa-dot-circle"></i></span>  <span value={item.number} className="badge badge-secondary font-italic">edited</span>
                                        </button>
                                )
                            }
                            return (
                                <button 
                                    className="btn btn-light" 
                                    key={item.number} 
                                    value={item.number}
                                    onClick={props.versionChange}>V{item.number} <span style={{color: "Tomato"}}><i className="fas fa-dot-circle"></i></span></button>
                            )
                        }
                        if (item.unsavedChanges) {
                            return (
                                <button 
                                    className="btn btn-dark" 
                                    key={item.number} 
                                    value={item.number}
                                    onClick={props.versionChange}>V{item.number} <span value={item.number} className="badge badge-secondary font-italic">edited</span></button>
                            )
                        }
                        return (
                            <button 
                                className="btn btn-dark" 
                                key={item.number} 
                                value={item.number}
                                onClick={props.versionChange}>V{item.number}</button>
                        )
                    })}
                </div>
                <div className="btn-group">
                    <button className="btn" onClick={props.handleDelete}><i className="fas fa-trash-alt"></i></button>
                    <button className="btn" onClick={props.handleSave}><i className="fas fa-save"></i></button>
                    <button className="btn" onClick={props.handleNew}><i className="fas fa-copy"></i></button>
                </div>
            </div>
        )
    } else {
        if (props.showAnalysis) {
            return (
                <div className="btn-toolbar justify-content-between">
                    <ModeButtons
                        versionLength={props.versions.length}
                        mode={props.mode}
                        changeMode={props.changeMode} />
                    <div className="btn-group">
                        {props.versions.map((item) => {
                            if (item.number == props.currNums.one || item.number == props.currNums.two) {
                                if (item.unsavedChanges) {
                                    return (
                                        <button 
                                            className="btn btn-light" 
                                            key={item.number} 
                                            value={item.number}
                                            onClick={props.versionChange}>V{item.number} <span style={{color: "Tomato"}}><i className="fas fa-dot-circle"></i></span>  <span value={item.number} className="badge badge-secondary font-italic">edited</span>
                                            </button>
                                    )
                                }
                                return (
                                    <button 
                                        className="btn btn-light" 
                                        key={item.number} 
                                        value={item.number}
                                        onClick={props.versionChange}>V{item.number} <span style={{color: "Tomato"}}><i className="fas fa-dot-circle"></i></span></button>
                                )
                            }
                            if (item.unsavedChanges) {
                                return (
                                    <button 
                                        className="btn btn-dark" 
                                        key={item.number} 
                                        value={item.number}
                                        onClick={props.versionChange}>V{item.number} <span value={item.number} className="badge badge-secondary font-italic">edited</span></button>
                                )
                            }
                            return (
                                <button 
                                    className="btn btn-dark" 
                                    key={item.number} 
                                    value={item.number}
                                    onClick={props.versionChange}>V{item.number}</button>
                            )
                        })}
                    </div>
                    <div className="btn-group">
                        <button className="btn" onClick={props.hideAnalysis}><i className="fas fa-pen"></i></button>
                        <button className="btn" onClick={props.handleSave}><i className="fas fa-save"></i></button>
                    </div>
                </div>
            )
        }
        return (
            <div className="btn-toolbar justify-content-between">
                <ModeButtons
                    versionLength={props.versions.length}
                    mode={props.mode}
                    changeMode={props.changeMode} />
                <div className="btn-group">
                    {props.versions.map((item) => {
                        if (item.number == props.currNums.one || item.number == props.currNums.two) {
                            if (item.unsavedChanges) {
                                return (
                                    <button 
                                        className="btn btn-light" 
                                        key={item.number} 
                                        value={item.number}
                                        onClick={props.versionChange}>V{item.number} <span style={{color: "Tomato"}}><i className="fas fa-dot-circle"></i></span>  <span value={item.number} className="badge badge-secondary font-italic">edited</span>
                                        </button>
                                )
                            }
                            return (
                                <button 
                                    className="btn btn-light" 
                                    key={item.number} 
                                    value={item.number}
                                    onClick={props.versionChange}>V{item.number} <span style={{color: "Tomato"}}><i className="fas fa-dot-circle"></i></span></button>
                            )
                        }
                        if (item.unsavedChanges) {
                            return (
                                <button 
                                    className="btn btn-dark" 
                                    key={item.number} 
                                    value={item.number}
                                    onClick={props.versionChange}>V{item.number} <span value={item.number} className="badge badge-secondary font-italic">edited</span></button>
                            )
                        }
                        return (
                            <button 
                                className="btn btn-dark" 
                                key={item.number} 
                                value={item.number}
                                onClick={props.versionChange}>V{item.number}</button>
                        )
                    })}
                </div>
                <div className="btn-group">
                    <button className="btn" onClick={props.getAnalysis}><i className="fas fa-chart-bar"></i></button>
                    <button className="btn" onClick={props.handleSave}><i className="fas fa-save"></i></button>
                </div>
            </div>
        )
    }
}

export default ButtonBar;