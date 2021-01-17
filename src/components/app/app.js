import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import {PersonDetails, PersonList, PlanetDetails, PlanetList, StarshipDetails, StarshipList} from "../sw-components";
import ErrorBoundry from "../ErrorBoundry";
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context";
import DummySwapiService from "../../services/dummy-swapi-service";

import './app.css';

export default class App extends Component {

    state = {
        hasError: false,
        showRandomPlanet: true,
        swapiService: new SwapiService(),
    }

    onServiceChange = () => {
        this.setState( ({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;
            return {
                swapiService: new Service(),
            }
        } )
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>;
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> : null;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Header onServiceChange={this.onServiceChange}/>
                    {planet}
                    <div className="row mb2 button-row">
                        <button
                            className="toggle-planet btn btn-warning btn-lg"
                            onClick={this.toggleRandomPlanet}>
                            Toggle Random Planet
                        </button>
                        <ErrorButton/>
                    </div>

                    <PersonDetails itemId={11}/>
                    <PlanetDetails itemId={5}/>
                    <StarshipDetails itemId={9}/>

                    <PersonList />
                    <PlanetList />
                    <StarshipList />
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
};