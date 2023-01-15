import React, { Component } from 'react';
import '../App.css';
import {
    Redirect
} from "react-router-dom";
import { PUBLIC_ID } from '../shared/api';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    goToForm = (id) => {
        this.setState({
            redirectTo: true,
            id: id
        })
    }

    componentDidUpdate(prevProps) {
        if (this.state.redirect) {
            this.setState({
                redirectTo: false,
            })
        }
    }

    render() {
        if (this.state.redirectTo === true) {
            if (this.state.id == null) {
                return <Redirect to='/dashboard/add' />
            } else {
                return <Redirect to={'/dashboard/edit/' + this.state.id} />
            }
        }
        
        return (
            <div className="dashboard">
                <h3>Dashboard</h3>
                <p><button disabled={this.props.selectedUser !== PUBLIC_ID} onClick={() => this.goToForm(null)}>Add new</button></p>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Imagem</th>
                            <th>Nome</th>
                            <th>Super-Poder</th>
                            <th>Acções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.list_of_heroes.map((element) =>
                            <tr key={element.id}>
                                <td>{element.id}</td>
                                <td><img alt="hero_img" src={element.image} /></td>
                                <td>{element.name}</td>
                                <td>{element.super_power ? element.super_power : "N/D"}</td>
                                <td className="actions">
                                    <button disabled={this.props.selectedUser !== PUBLIC_ID} onClick={() => this.goToForm(element.id)}>Editar</button><br />
                                    <button disabled={this.props.selectedUser !== PUBLIC_ID && this.props.favorite_heroes.length >= 3 && this.props.favorite_heroes.indexOf(element.id) < 0} onClick={() => this.props.changeFavorites(element.id)}>{this.props.favorite_heroes.indexOf(element.id) >= 0 ? "Remover Favorito" : "Adicionar Favorito"}</button><br />
                                    <button disabled={this.props.selectedUser !== PUBLIC_ID} onClick={() => this.props.removeHero(element.id)}>Remover</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div >
        )
    }
}

export default Dashboard;