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
                <div className="row justify-content-between align-middle my-3">
                    <h2>My Works.</h2>
                    <i className="fas fa-plus fa-3x" onClick={this.props.addWork}></i>
                </div>
                <table class="table">
                    <thead class="thead-dark">
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
                            <tr key={item.id}>
                                <th>1</th>
                                <td>{item.created}</td>
                                <td>{item.last_updated}</td>
                                <td>{item.newest_version}</td>
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