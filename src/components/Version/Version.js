import React from 'react';
import history from '../../history';
import './Version.css';


class Version extends React.Component {
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
        console.log(e.target)
        console.log(e.target.value)
        this.state.versions.map((item) => {
            if (item.number == e.target.value) {
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
    }

    handleNew = (e) => {
        this.props.createVersion(this.state.workId)
    }

    render() {
        return (
            <div className="container my-2">
                <div className="btn-toolbar justify-content-between">
                    <div className="btn-group mr-2">
                        {this.state.versions.map((item) => {
                            if (item.number == this.state.currNum) {
                                return (
                                    <button 
                                        className="btn btn-light" 
                                        key={item.number} 
                                        value={item.number}
                                        onClick={this.versionChange}>{item.number}</button>
                                )
                            }
                            return (
                                <button 
                                    className="btn btn-dark" 
                                    key={item.number} 
                                    value={item.number}
                                    onClick={this.versionChange}>{item.number}</button>
                            )
                        })}
                    </div>
                    <div className="btn-group">
                        <button className="btn"><i className="fas fa-trash-alt"></i></button>
                        <button className="btn" onClick={this.handleSave}><i className="fas fa-save"></i></button>
                        <button className="btn" onClick={this.handleNew}><i className="fas fa-plus"></i></button>
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


export default Version;