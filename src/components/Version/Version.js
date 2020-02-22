import React from 'react';
import './Version.css';


class Version extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.data)
        this.state = {
            title: this.props.data.title,
            text: this.props.data.versions[0].text,
            currNum: this.props.data.versions[0].number,
            versions: this.props.data.versions
        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        })
        // need to make this update this.state.versions
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

    render() {
        return (
            <div className="container my-2">
                <div className="btn-toolbar">
                    <div className="btn-group mr-2">
                        {this.state.versions.map((item) => {
                            if (item.number == this.state.currNum) {
                                return (
                                    <button 
                                        className="btn btn-dark acitve" 
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
                        <button clasNames="btn"><i className="fas fa-save"></i></button>
                        <button className="btn"><i className="fas fa-plus"></i></button>
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