import React, { Component } from "react";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import { Container} from "../components/Grid";
import SavedResult from "../components/SavedResult"

class SaveVacation extends Component {
    state = {
        savedVacations: []
    };

    //when this component mounts, grab all vacations that were save to the database 
    componentDidMount() {
        console.log('run')
        API.getVacation()
            .then(res => this.setState({ savedVacations: res.data}))
            .catch(err => console.log(err))
    }

    //function to remove vacation by id
    handleDeleteButton = id => {
        API.deleteVacation(id)
            .then(res => this.componentDidMount())
            .catch(err => console.log(err))
    }

    handleInputChange = (event, id, status )=> {
        console.log(event)
        console.log(id)
        console.log(status)

        let stat = {visited: !status}
        API.haveVisit(id, stat).then(res => this.componentDidMount())
        .catch(err => console.log(err))
        
    }

    render() {
        return (
            <Container fluid className="container">
                <Jumbotron />
                <Container>
                    <SavedResult handleInputChange={this.handleInputChange} savedVacations={this.state.savedVacations} handleDeleteButton={this.handleDeleteButton} />
                </Container>
            </Container>
        )
    }
}



export default SaveVacation;