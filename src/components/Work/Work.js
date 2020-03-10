import React from 'react';
import history from '../../history';
import { diffChars } from 'diff';
import './Work.css';


class Work extends React.Component {
    constructor(props) {
        super(props)
        let versionData = this.props.versions.sort((a, b) => (a.number > b.number) ? 1 : -1)
        this.state = {
            title: this.props.title,
            versions: versionData,
            workId: this.props.workId,
            mode: 'Single',
            text: this.props.text,
            currNum: this.props.currNum,
            texts: {
                one: this.props.texts.one,
                two: this.props.texts.two
            },
            currNums: {
                one: this.props.currNums.one,
                two: this.props.currNums.two
            },
            showAnalysis: false,
            diffChars: []
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("Receiving props")
        console.log(nextProps)
        if (nextProps.text != this.props.text || nextProps.versions.length > this.props.versions.length) {
            console.log("Setting...")
            // var newVersions = nextProps.versions 
            // newVersions.map((item) => {
            //     if (item.number == nextProps.)
            // })
            this.setState({
                workId: nextProps.workId,
                title: nextProps.title,
                text: nextProps.text,
                currNum: nextProps.currNum,
                versions: nextProps.versions
            })
        }
        if (nextProps.workId == null) {
            console.log("HAVE NULL workID")
            history.push('/works')
        }
    }

    componentDidMount() {
        this.state.versions.map(item => {
            if (item.number == 1) {
                this.setState({
                    text: item.text
                })
            }
        })
    }

    handleChange = (e) => {
        const value = e.target.value;
        if (e.target.name == "text") {
            let newVersions = this.state.versions
            this.state.versions.map((item, index) => {
                if (item.number == this.state.currNum) {
                    newVersions[index].text = value
                    newVersions[index].unsavedChanges = true
                }
            })
            this.setState({
                ...this.state,
                [e.target.name]: value,
                versions: newVersions
            })
        } else {
            this.setState({
                ...this.state,
                [e.target.name]: value
            })
        }
    }

    handleTextsChange = (e) => {
        const value = e.target.value;
        let newTexts = this.state.texts;
        let newVersions = this.state.versions
        if (e.target.name == "text-one") {
            this.state.versions.map((item, index) => {
                if (item.number == this.state.currNums.one) {
                    newVersions[index].text = value
                    newVersions[index].unsavedChanges = true
                }
            })
            newTexts.one = value;
        } else {
            this.state.versions.map((item, index) => {
                if (item.number == this.state.currNums.two) {
                    newVersions[index].text = value
                    newVersions[index].unsavedChanges = true
                }
            })
            newTexts.two = value;
        }
        this.setState({
            texts: newTexts,
            versions: newVersions
        })
    }

    getAnalysis = () => {
        let colorCodes = diffChars(this.state.texts.one, this.state.texts.two)
        console.log("DIFF CHARS")
        console.log(colorCodes)
        this.setState({
            showAnalysis: true,
            diffChars: colorCodes
        })
    }

    hideAnalysis = () => {
        this.setState({
            showAnalysis: false
        })
    }

    versionChange = (e) => {
        var currValue = e.target.getAttribute("value");
        this.state.versions.map((item) => {
            if (item.number == currValue) {
                if (this.state.mode === 'Comparison') {
                    let newNums = this.state.currNums 
                    newNums.two = newNums.one 
                    newNums.one = item.number 
                    let newTexts = this.state.texts 
                    newTexts.two = newTexts.one 
                    newTexts.one = item.text 
                    this.setState({
                        currNums: newNums,
                        texts: newTexts
                    })
                } else {
                    this.setState({
                        currNum: item.number,
                        text: item.text
                    })
                }
            }
        })
    }

    handleSave = (e) => {
        let newVersions = this.state.versions
        if (this.state.mode === 'Comparison') {
            const dataOne = {
                workId: this.state.workId,
                title: this.state.title,
                text: this.state.texts.one,
                number: this.state.currNums.one
            }
            this.props.sendSave(dataOne)
            const dataTwo = {
                workId: this.state.workId,
                title: this.state.title,
                text: this.state.texts.two,
                number: this.state.currNums.two
            }
            this.props.sendSave(dataTwo)
            this.state.versions.map((item, index) => {
                if (item.number == this.state.currNums.one || item.number == this.state.currNums.two) {
                    newVersions[index].unsavedChanges = false
                }
            })
            this.setState({
                versions: newVersions
            })
        } else {
            const data = {
                workId: this.state.workId,
                title: this.state.title,
                text: this.state.text,
                number: this.state.currNum
            }
            this.props.sendSave(data)
            this.state.versions.map((item, index) => {
                if (item.number == this.state.currNum) {
                    newVersions[index].unsavedChanges = false
                }
            })
            this.setState({
                versions: newVersions
            })
        }
    }

    handleNew = (e) => {
        this.props.createVersion(this.state.workId, this.state.currNum)
    }

    handleDelete = (e) => {
        if (this.state.versions.length == 1) {
            alert("Can't delete the last version of a Work.")
        } else {
            this.props.removeVersion(this.state.workId, this.state.currNum)
            var newVersions = this.state.versions
            var spliceNum = 0
            for (var i=0;i<newVersions.length;i++) {
                if (newVersions[i].number == this.state.currNum) {
                    spliceNum = i
                } else {
                    if (newVersions[i].number > this.state.currNum) {
                        newVersions[i].number = newVersions[i].number - 1
                    }
                }
            }
            newVersions.splice(spliceNum, 1)
            this.setState({
                versions: newVersions,
                text: newVersions[0].text,
                currNum: newVersions[0].number
            })
        }
    }

    changeMode = (e) => {
        const newMode = this.state.mode === 'Single' ? 'Comparison' : 'Single';
        if (newMode === 'Comparison') {
            let newTexts = {}
            this.state.versions.map(item => {
                if (item.number == this.state.currNums.one) {
                    newTexts.one = item.text
                } else if (item.number == this.state.currNums.two) {
                    newTexts.two = item.text
                }
            })
            this.setState({
                mode: newMode,
                texts: newTexts
            })
        } else {
            let newText = ''
            this.state.versions.map(item => {
                if (item.number == this.state.currNum) {
                    newText = item.text
                }
            })
            this.setState({
                mode: newMode,
                text: newText
            })
        }
    }

    render() {
        var modeButtons;
        if (this.state.mode == 'Single') {
            if (this.state.versions.length > 1) {
                modeButtons = (
                    <div className="btn-group">
                        <button className="btn btn-dark active">Single</button>
                        <button className="btn btn-light" onClick={this.changeMode}>Comparison</button>
                    </div>
                )
            } else {
                modeButtons = (
                    <div className="btn-group">
                        <button className="btn btn-dark active">Single</button>
                        <button className="btn btn-light disabled">Comparison</button>
                    </div>
                )
            }
            return (
                <div className="container my-2">
                    <div className="btn-toolbar justify-content-between">
                        {modeButtons}
                        <div className="btn-group">
                            {this.state.versions.map((item) => {
                                if (item.number == this.state.currNum) {
                                    if (item.unsavedChanges) {
                                        return (
                                            <button 
                                                className="btn btn-light" 
                                                key={item.number} 
                                                value={item.number}
                                                onClick={this.versionChange}>V{item.number} <span style={{color: "Tomato"}}><i className="fas fa-dot-circle"></i></span>  <span value={item.number} className="badge badge-secondary font-italic">edited</span>
                                                </button>
                                        )
                                    }
                                    return (
                                        <button 
                                            className="btn btn-light" 
                                            key={item.number} 
                                            value={item.number}
                                            onClick={this.versionChange}>V{item.number} <span style={{color: "Tomato"}}><i className="fas fa-dot-circle"></i></span></button>
                                    )
                                }
                                if (item.unsavedChanges) {
                                    return (
                                        <button 
                                            className="btn btn-dark" 
                                            key={item.number} 
                                            value={item.number}
                                            onClick={this.versionChange}>V{item.number} <span value={item.number} className="badge badge-secondary font-italic">edited</span></button>
                                    )
                                }
                                return (
                                    <button 
                                        className="btn btn-dark" 
                                        key={item.number} 
                                        value={item.number}
                                        onClick={this.versionChange}>V{item.number}</button>
                                )
                            })}
                        </div>
                        <div className="btn-group">
                            <button className="btn" onClick={this.handleDelete}><i className="fas fa-trash-alt"></i></button>
                            <button className="btn" onClick={this.handleSave}><i className="fas fa-save"></i></button>
                            <button className="btn" onClick={this.handleNew}><i className="fas fa-copy"></i></button>
                        </div>
                    </div>
                    <input 
                        name="title" 
                        value={this.state.title} 
                        className="version-title" 
                        onChange={this.handleChange} />
                    <textarea 
                        name="text" 
                        className="version-text bg-light" 
                        value={this.state.text}
                        onChange={this.handleChange}></textarea>
                </div>
            )
        } else {
            if (this.state.showAnalysis) {
                return (
                    <div className="container my-2">
                        <div className="btn-toolbar justify-content-between">
                            <div className="btn-group">
                                <button className="btn btn-light" onClick={this.changeMode}>Single</button>
                                <button className="btn btn-dark active">Comparison</button>
                            </div>
                            <div className="btn-group">
                                {this.state.versions.map((item) => {
                                    if (item.number == this.state.currNums.one || item.number == this.state.currNums.two) {
                                        if (item.unsavedChanges) {
                                            return (
                                                <button 
                                                    className="btn btn-light" 
                                                    key={item.number} 
                                                    value={item.number}
                                                    onClick={this.versionChange}>V{item.number} <span style={{color: "Tomato"}}><i className="fas fa-dot-circle"></i></span>  <span value={item.number} className="badge badge-secondary font-italic">edited</span>
                                                    </button>
                                            )
                                        }
                                        return (
                                            <button 
                                                className="btn btn-light" 
                                                key={item.number} 
                                                value={item.number}
                                                onClick={this.versionChange}>V{item.number} <span style={{color: "Tomato"}}><i className="fas fa-dot-circle"></i></span></button>
                                        )
                                    }
                                    if (item.unsavedChanges) {
                                        return (
                                            <button 
                                                className="btn btn-dark" 
                                                key={item.number} 
                                                value={item.number}
                                                onClick={this.versionChange}>V{item.number} <span value={item.number} className="badge badge-secondary font-italic">edited</span></button>
                                        )
                                    }
                                    return (
                                        <button 
                                            className="btn btn-dark" 
                                            key={item.number} 
                                            value={item.number}
                                            onClick={this.versionChange}>V{item.number}</button>
                                    )
                                })}
                            </div>
                            <div className="btn-group">
                                <button className="btn" onClick={this.hideAnalysis}><i className="fas fa-pen"></i></button>
                                <button className="btn" onClick={this.handleSave}><i className="fas fa-save"></i></button>
                            </div>
                        </div>
                        <input 
                            name="title" 
                            value={this.state.title} 
                            className="version-title" 
                            onChange={this.handleChange} />
                        <div style={{display: "inline-block"}}>
                            {this.state.diffChars.map((item, index) => {
                                let value = item.value.replace(/(?:\r\n|\r|\n)/g, '<br>');
                                if (item.added) {
                                    return (
                                        <mark key={index} style={{
                                            backgroundColor: "#b0ffc5",
                                            color: "black"
                                            }}
                                            dangerouslySetInnerHTML={{__html: value}}
                                            />
                                    )
                                } else if (item.removed) {
                                    return (
                                        <mark key={index} style={{
                                            backgroundColor: "#fcb3b1",
                                            color: "black"
                                            }}
                                            dangerouslySetInnerHTML={{__html: value}}
                                            />
                                    )
                                } else {
                                    return (
                                        <mark key={index} style={{
                                            backgroundColor: "#fff",
                                            color: "black"
                                            }}
                                            dangerouslySetInnerHTML={{__html: value}}
                                            />
                                    )
                                }
                            })}
                        </div>
                    </div>
                )
            }
            return (
                <div className="container my-2">
                    <div className="btn-toolbar justify-content-between">
                        <div className="btn-group">
                            <button className="btn btn-light" onClick={this.changeMode}>Single</button>
                            <button className="btn btn-dark active">Comparison</button>
                        </div>
                        <div className="btn-group">
                            {this.state.versions.map((item) => {
                                if (item.number == this.state.currNums.one || item.number == this.state.currNums.two) {
                                    if (item.unsavedChanges) {
                                        return (
                                            <button 
                                                className="btn btn-light" 
                                                key={item.number} 
                                                value={item.number}
                                                onClick={this.versionChange}>V{item.number} <span style={{color: "Tomato"}}><i className="fas fa-dot-circle"></i></span>  <span value={item.number} className="badge badge-secondary font-italic">edited</span>
                                                </button>
                                        )
                                    }
                                    return (
                                        <button 
                                            className="btn btn-light" 
                                            key={item.number} 
                                            value={item.number}
                                            onClick={this.versionChange}>V{item.number} <span style={{color: "Tomato"}}><i className="fas fa-dot-circle"></i></span></button>
                                    )
                                }
                                if (item.unsavedChanges) {
                                    return (
                                        <button 
                                            className="btn btn-dark" 
                                            key={item.number} 
                                            value={item.number}
                                            onClick={this.versionChange}>V{item.number} <span value={item.number} className="badge badge-secondary font-italic">edited</span></button>
                                    )
                                }
                                return (
                                    <button 
                                        className="btn btn-dark" 
                                        key={item.number} 
                                        value={item.number}
                                        onClick={this.versionChange}>V{item.number}</button>
                                )
                            })}
                        </div>
                        <div className="btn-group">
                            <button className="btn" onClick={this.getAnalysis}><i className="fas fa-chart-bar"></i></button>
                            <button className="btn" onClick={this.handleSave}><i className="fas fa-save"></i></button>
                        </div>
                    </div>
                    <input 
                        name="title" 
                        value={this.state.title} 
                        className="version-title" 
                        onChange={this.handleChange} />
                    <div className="row">
                        <div className="col">
                            <textarea 
                            name="text-one" 
                            className="version-text bg-light" 
                            value={this.state.texts.one}
                            onChange={this.handleTextsChange}></textarea>
                        </div>
                        <div className="col">
                            <textarea 
                            name="text-two" 
                            className="version-text bg-light" 
                            value={this.state.texts.two}
                            onChange={this.handleTextsChange}></textarea>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


export default Work;