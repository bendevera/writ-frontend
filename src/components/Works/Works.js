import React from 'react';


class Works extends React.Component {

    componentDidMount() {
        this.props.fetchData()
    }

    handleClick = (e) => {
        this.props.focusWork(e.target.getAttribute("value"))
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-between align-middle my-3">
                    <h2>My Works.</h2>
                    <i className="fas fa-plus fa-3x" onClick={this.props.addWork}></i>
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Created</th>
                        <th scope="col">Last Updated</th>
                        <th scope="col"># Versions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.data.map((item, index) => {
                        console.log(index, item)
                        return (
                            <tr key={item.id} onClick={this.handleClick}>
                                <th value={item.id}>{item.title}</th>
                                <td value={item.id}>{item.created}</td>
                                <td value={item.id}>{item.last_updated}</td>
                                <td value={item.id}>{item.newest_version}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
} 


export default Works;