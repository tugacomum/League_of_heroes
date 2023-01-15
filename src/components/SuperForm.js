import React, { Component } from 'react';

class SuperForm extends Component {
    constructor(props) {
        super(props);

        if (props.match !== undefined && props.match.params !== undefined && props.list_of_heroes) {
            var id = props.match.params.id !== null ? parseInt(props.match.params.id) : null;
            var element = props.list_of_heroes.find(item => item.id === id);
        }

        this.state = {
            id: id !== undefined ? id : null,
            element: element !== undefined ? element : {
                id: "",
                name: "",
                super_power: "",
                image: ""
            },
        }
    }

    updateField = (event) => {
        var newElement = this.state.element;
        newElement[event.target.name] = event.target.value;
        this.setState({
            element: newElement
        })

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h4>{this.state.id != null ? 'Editar Super-Herói' : 'Adicionar Super-Herói'}</h4>
                {(this.state.id != null && this.state.element !== undefined) || this.state.id == null ?
                    <form onSubmit={(e) => this.props.submit(e, this.state.element)}>
                        <p>
                            <label htmlFor="image">Imagem</label><br />
                            <input type="text" id="image" name="image" placeholder="Insert Image Url" onChange={this.updateField} value={this.state.element.image} />
                        </p>
                        <p>
                            <label htmlFor="name">Name</label><br />
                            <input type="text" id="name" name="name" placeholder="Insert Name" onChange={this.updateField} value={this.state.element.name} />
                        </p>
                        <p>
                            <label htmlFor="super_power">SuperPower</label><br />
                            <input type="text" id="super_power" name="super_power" placeholder="Insert Super Power" onChange={this.updateField} value={this.state.element.super_power}></input>
                        </p>
                        <hr />
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                    :
                    <div>
                        'Erro'
                        </div>
                }
            </div>
        )
    }
}

export default SuperForm;