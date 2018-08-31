import React, {Component} from 'react';

class Attendance extends Component {

    addNewMemberRow = (member,index) => {
        return(
            <tr key={index}>
                <td>{member.name}</td>
                <td>{member.id}</td>
            </tr>
        )
    };
    render() {
        return (
            <div>
                <h2>Attendance {this.props.audience.length} member</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Audience Member</th>
                            <th>Socket Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.audience.map(this.addNewMemberRow)}
                    </tbody>

                </table>
            </div>

        );
    }
}
export default Attendance;