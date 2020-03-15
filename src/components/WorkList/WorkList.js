import React from 'react';


class WorkList extends React.Component {

    componentDidMount() {
        this.props.fetchData()
    }

    handleClick = (e) => {
        if (e.target.getAttribute("value")) {
            this.props.focusWork(e.target.getAttribute("value"))
        }
    }

    handleDelete = (e) => {
        this.props.deleteWork(e.target.getAttribute("data"))
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-between my-3 px-3">
                    <h2><i className="fas fa-sticky-note"></i> My Works.</h2>
                    <i className="fas fa-plus fa-2x add-work" onClick={this.props.addWork}></i>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Created</th>
                            <th scope="col">Last Updated</th>
                            <th scope="col"># Versions</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.data.map((item, index) => {
                        console.log(index, item)
                        return (
                            <tr className="my-table-elem" key={item.id} onClick={this.handleClick}>
                                <th value={item.id}>{item.title}</th>
                                <td value={item.id}>{item.created}</td>
                                <td value={item.id}>{item.last_updated}</td>
                                <td value={item.id}>{item.newest_version}</td>
                                <td value={item.id}><i className="fas fa-trash" data={item.id} onClick={this.handleDelete}></i></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
} 


export default WorkList;