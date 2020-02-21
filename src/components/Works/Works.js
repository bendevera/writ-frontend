import React from 'react';


class Works extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.fetchData()
    }

    render() {
        return (
            <div className="container">
                <h2>My Works.</h2>
                {this.props.data.map((item, index) => {
                    return (
                        <div className="card" key={item.id}>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
} 


export default Works;