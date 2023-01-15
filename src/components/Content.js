import React, { Component } from 'react';
import '../App.css';
import HeroInfo from './HeroInfo';
import Loading from './Loading';

import {
    Route, Switch, withRouter
} from "react-router-dom";
import { GetSuperHero, GetTop, GetUsers, PUBLIC_ID, UpdateSuperhero, UpdateTop } from '../shared/api';
import Dashboard from './Dashboard';
import SuperForm from './SuperForm'

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list_of_heroes: [],
            favorite_heroes: [1],
            loading: true,
            id: null,
            selectedUser: PUBLIC_ID,
            list_users: []
        }
    }

    componentDidMount() {
        GetUsers()
            .then(res => {
                this.setState({ list_users: res, loading: false })
            })

        GetSuperHero(this.state.selectedUser).then(res => {
            this.setState({
                list_of_heroes: res
            });
        }).catch(err => {
            this.setState({
                list_of_heroes: []
            });
        });

        GetTop(this.state.selectedUser).then(res => {
            this.setState({
                favorite_heroes: res
            });
        }).catch(err => {
            this.setState({
                favorite_heroes: []
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedUser !== undefined && prevState.selectedUser !== this.state.selectedUser) {
            GetSuperHero(this.state.selectedUser).then(res => {
                this.setState({
                    list_of_heroes: res
                });
            }).catch(err => {
                this.setState({
                    list_of_heroes: []
                });
            });

            GetTop(this.state.selectedUser).then(res => {
                this.setState({
                    favorite_heroes: res
                });
            }).catch(err => {
                this.setState({
                    favorite_heroes: []
                });
            });
        }
    }

    changeFavorites = (elementId) => {
        var list;
        if (this.state.favorite_heroes.indexOf(elementId) >= 0) {
            list = this.state.favorite_heroes.filter(item => item !== elementId);
            this.setState({
                favorite_heroes: list
            });
        } else {
            list = this.state.favorite_heroes;
            list.push(elementId);
            this.setState({
                favorite_heroes: list
            });
        }
        UpdateTop(PUBLIC_ID, list);
    }

    removeHero = (elementId) => {
        if (this.state.list_of_heroes.find(item => item.id === elementId) != null) {
            this.setState({
                list_of_heroes: this.state.list_of_heroes.filter(item => item.id !== elementId),
                favorite_heroes: this.state.favorite_heroes.filter(item => item !== elementId)
            });
        }
        if (this.state.selectedUser === PUBLIC_ID) {
            UpdateSuperhero(PUBLIC_ID, this.state.list_of_heroes);
            UpdateTop(PUBLIC_ID, this.state.list_of_heroes);
        }
    }

    onChange = (e) => {
        console.log(e.target);
        this.setState({
            selectedUser: e.target.value
        });
    }


    submitForm = (e, element) => {
        e.preventDefault();

        var list;
        if (element.id === "") {
            list = this.state.list_of_heroes;
            list.push({
                id: list[list.length - 1].id + 1,
                name: element.name,
                super_power: element.super_power,
                image: element.image
            });
            this.setState({
                list_of_heroes: list
            });
        } else {
            list = this.state.list_of_heroes.map(item => {
                if (item.id === element.id) {
                    item.name = element.name;
                    item.super_power = element.super_power;
                }
                return item;
            });
            this.setState({
                list_of_heroes: list
            })
        }

        UpdateSuperhero(PUBLIC_ID, list);

        this.props.history.push('/dashboard');
    }



    render() {
        return (
            <div className="content">
                {this.state.loading === true ? <Loading /> : null}
                <div>
                    <select value={this.state.selectedUser} onChange={(e) => this.onChange(e)}>
                        {this.state.list_users != null
                            ?
                            Object.keys(this.state.list_users).map((key, index) => {
                                return <option key={key} value={this.state.list_users[key]}>{this.state.list_users[key]}</option>
                            })
                            : null}
                    </select>
                </div>
                <Switch>
                    <Route path="/dashboard/add" render={props =>
                        (<SuperForm {...props} submit={this.submitForm} />)
                    } />
                    <Route path="/dashboard/edit/:id" render={props =>
                        (<SuperForm {...props} list_of_heroes={this.state.list_of_heroes} submit={this.submitForm} />)
                    } />
                    <Route path="/dashboard" render={props =>
                        (<Dashboard {...props} selectedUser={this.state.selectedUser} changeFavorites={this.changeFavorites} removeHero={this.removeHero} list_of_heroes={this.state.list_of_heroes} favorite_heroes={this.state.favorite_heroes} />)
                    } />
                    <Route path="/" render={props =>
                    (<div><h3>Top-3 Heróis</h3>
                        <div className="listBox">
                            {this.state.list_of_heroes.map((element) =>
                                this.state.favorite_heroes.indexOf(element.id) !== -1 ? <HeroInfo key={element.id} img={element.image} name={element.name} /> : null
                            )}
                        </div>
                    </div>
                    )
                    } />
                </Switch>
            </div >
        )
    }
}

export default withRouter(Content);