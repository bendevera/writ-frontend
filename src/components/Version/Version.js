import React from 'react';
import './Version.css';


class Version extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.data.title,
            text: this.props.data.text
        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        })
    }

    render() {
        return (
            <div className="container my-2">
                <div className="btn-toolbar">
                    <div className="btn-group mr-2">
                        <button className="btn btn-dark acitve">1</button>
                        <button className="btn btn-dark ">2</button>
                        <button className="btn btn-dark ">3</button>
                        <button className="btn btn-dark ">4</button>
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-dark-outline "><i className="fas fa-plus"></i></button>
                    </div>
                </div>
                <input name="title" value={this.state.title} className="version-title" />
                <textarea name="text" className="version-text bg-light">{this.state.text}</textarea>
            </div>
        )
    }
}


export default Version;