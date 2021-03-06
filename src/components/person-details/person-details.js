import React, {Component} from 'react';

import './person-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

export default class PersonDetails extends Component {

    state = {
        person: null,
        loading: true,
    }

    SwapiService = new SwapiService();

    onUpdatePerson = () => {
        const {personId} = this.props;
        if (!personId) {
            return;
        }

        this.setState({
          loading: true
        })

        this.SwapiService.getPerson(personId)
            .then((person) => {
                this.setState({
                    person,
                    loading: false
                })
            })
    }

    componentDidMount() {
        this.onUpdatePerson();
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.onUpdatePerson()
        }
    }

    render() {

        const {person, loading} = this.state;

        if (!person) {
            return <span>Select a person for item list</span>
        }

        const PersonView = ({person}) => {
            const {id, name, gender, birthYear, eyeColor} = person;
            return (
                <React.Fragment>
                    <img className="person-image"
                         src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>

                    <div className="card-body">
                        <h4>{name}</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <span className="term">Gender</span>
                                <span>{gender}</span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Birth Year</span>
                                <span>{birthYear}</span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Eye Color</span>
                                <span>{eyeColor}</span>
                            </li>
                        </ul>
                    </div>
                </React.Fragment>
            )
        }

      const spinner = loading ? <Spinner/> : null;
      const content = !loading ? <PersonView person={person}/> : null;

        return (
            <div className="person-details card">
              {spinner}
              {content}
            </div>
        )
    }
}
