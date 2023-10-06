import Menu from './menu.js';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/cpedido.css';
import '../css/index.css';
import React, { Component } from 'react';
import axios from 'axios';

const { REACT_APP_RESTAURANTES_API, REACT_APP_PRATOS_API, REACT_APP_PEDIDOS_API } = process.env;

export default class Pedidos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pedido: '',
            showModal: false,
            mensagem:'',
            pratos: []
        }
    }

    handleClose() {
        this.setData('showModal', false);
    }

    handleShow() {
        this.setData('showModal', true);
    }

    submitPedido(e) {
        e.preventDefault();
        //alert(JSON.stringify(e.target.value));
        const data = {user:8, prato:e.target.value};
        this.createPost(data);
    }

    setData(field, data) {
        this.setState(prevState => {
            let nextState = Object.assign({}, prevState);
            data = data.data ? data.data.items : data;
            nextState[field] = data;
            return nextState;
        })
    }

    setRestaurantes(data) {
        const pratos = this.state.pratos;
        const restaurantes = data.data.items;
        pratos.map((prato) => {
            prato.restaurante = restaurantes.find(restaurante => { return restaurante.id === prato.restaurante }).nome
        });
        this.setData('pratos', pratos);
    }

    fetchData = (url, field) => {
        axios
            .get(url)
            .then(data => {
                if (field == 'pratos') {
                    this.setData(field, data)
                    this.fetchData(REACT_APP_RESTAURANTES_API, 'restaurantes')
                }
                else {
                    this.setRestaurantes(data);
                }
            })
    }
    createPost(data) {
        axios
          .post(REACT_APP_PEDIDOS_API,data,{'Content-Type':'application/json'})
          .then((response) => {
            alert('Pedido realizado com sucesso!');
          })
          .catch(err => { 
            alert('Erro: '+err.message);
          })
    }     

    componentDidMount() {
        this.fetchData(REACT_APP_PRATOS_API, 'pratos');
    }

    render() {
        return (
            <div className="center">
                <Menu />
                <Container>
                    <Row>
                        <Col md={{ span: 12, offset: 0 }}>
                            {this.state.pratos.map((prato, index) => {
                                if (index < 0) {
                                    return (

                                        <Col key={prato.id} md={{ span: 3, offset: 0 }}>
                                            <Card style={{ width: '30rem' }}>
                                                <Card.Img variant="top" src={prato.url} />
                                                <Card.Body>
                                                    <Card.Title className="tile-card">{prato.nome}</Card.Title>
                                                    <Card.Text className="card-text">
                                                        {prato.descricao}
                                                    </Card.Text>
                                                    <Row className="details-card-restaurant">
                                                        <Col md={{ span: 6, offset: 0 }}>
                                                            <Card.Text as={Col} className="card-text details-card">
                                                                <strong>{prato.restaurante}</strong>
                                                            </Card.Text>
                                                        </Col>
                                                        <Col md={{ span: 6, offset: 0 }}>
                                                            <Card.Text as={Col} className="card-text">
                                                                <strong>{prato.tempoparapreparo}</strong>
                                                            </Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Card.Text as={Col} className="price">
                                                        R$ {prato.preco}
                                                    </Card.Text>
                                                    <Button variant="danger" className="btn-danger-pedido" value={prato.id} onClick={this.submitPedido.bind(this)}>Fazer Pedido</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                } else {
                                    return (
                                        <Col key={prato.id} md={{ span: 3, offset: 1 }}>
                                            <Card style={{ width: '30rem' }}>
                                                <Card.Img variant="top" className="card-image" src={prato.url} />
                                                <Card.Body>
                                                    <Card.Title className="tile-card">{prato.nome}</Card.Title>
                                                    <Card.Text className="card-text">
                                                        {prato.descricao}
                                                    </Card.Text>
                                                    <Row className="details-card-restaurant">
                                                        <Col md={{ span: 6, offset: 0 }}>
                                                            <Card.Text as={Col} className="card-text details-card">
                                                                <strong>{prato.restaurante}</strong>
                                                            </Card.Text>
                                                        </Col>
                                                        <Col md={{ span: 6, offset: 0 }}>
                                                            <Card.Text as={Col} className="card-text">
                                                                <strong>{prato.tempoparapreparo}</strong>
                                                            </Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Card.Text as={Col} className="price">
                                                        R$ {prato.preco}
                                                    </Card.Text>
                                                    <Button variant="danger" className="btn-danger-pedido" value={prato.id} onClick={this.submitPedido.bind(this)}>Fazer Pedido</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>)
                                }
                            })}
                        </Col>
                    </Row>
                </Container>
               
            </div>



        );
    }
}
