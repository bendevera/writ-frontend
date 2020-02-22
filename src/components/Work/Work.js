import React from 'react';
import history from '../../history';
import './Work.css';


class Work extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.data)
        this.state = {
            workId: this.props.workId,
            title: this.props.title,
            text: this.props.text,
            currNum: this.props.number,
            versions: this.props.versions
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("Receiving props")
        console.log(nextProps)
        if (nextProps.text != this.props.text || nextProps.versions.length > this.props.versions.length) {
            console.log("Setting...")
            this.setState({
                workId: nextProps.workId,
                title: nextProps.title,
                text: nextProps.text,
                currNum: nextProps.number,
                versions: nextProps.versions
            })
        }
        if (nextProps.workId == null) {
            console.log("HAVE NULL workID")
            history.push('/works')
        }
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

    versionChange = (e) => {
        var currValue = e.target.getAttribute("value");
        this.state.versions.map((item) => {
            if (item.number == currValue) {
                console.log(item.text)
                this.setState({
                    currNum: item.number,
                    text: item.text
                })
            }
        })
    }

    handleSave = (e) => {
        const data = {
            workId: this.state.workId,
            title: this.state.title,
            text: this.state.text,
            number: this.state.currNum
        }
        this.props.sendSave(data)
        let newVersions = this.state.versions
        this.state.versions.map((item, index) => {
            if (item.number == this.state.currNum) {
                newVersions[index].unsavedChanges = false
            }
        })
        this.setState({
            versions: newVersions
        })
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

    render() {
        return (
            <div className="container my-2">
                <div className="btn-toolbar justify-content-between">
                    <div className="btn-group">
                        <button className="btn btn-dark">Single</button>
                        <button className="btn btn-light disabled">Comparison</button>
                    </div>
                    <div className="btn-group">
                        {this.state.versions.map((item) => {
                            if (item.number == this.state.currNum) {
                                if (item.unsavedChanges) {
                                    return (
                                        <button 
                                            className="btn btn-light" 
                                            key={item.number} 
                                            value={item.number}
                                            onClick={this.versionChange}>V{item.number} <span value={item.number} className="badge badge-secondary font-italic">edited</span></button>
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
    }
}


export default Work;