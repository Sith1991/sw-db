import React, {Component} from 'react';
import ErrorIndicator from "../error-indicator";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorButton from "../error-button";

export default class PeoplePage extends Component {

    state = {
        selectedPerson: null,
        hasError: false
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    }

    render () {

        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        return (
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList onPersonSelected={this.onPersonSelected}/>
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.selectedPerson}/>
                    <ErrorButton />
                </div>
            </div>
        );
    }
}