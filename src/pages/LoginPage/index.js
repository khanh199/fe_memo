import React, { Component } from 'react'
import axios from 'axios'
import { URL_API } from '../../constants/config'
import fakeAuth from '../../auth'
import { Redirect } from 'react-router-dom'


export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            authToken: false
        }
    }

    _onChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    _onSubmit = (e) => {
        e.preventDefault()
        let { email, password } = this.state
        axios.post(`${URL_API}/users/login`, { email, password })
            .then(data => {
                localStorage.setItem('memo-token', data.data.token)
                fakeAuth.isAuthenticated = true
                this.setState({ authToken: true })
            })
    }

    _checkToken = () => {
        let token = localStorage.getItem('memo-token');
        axios.post(`${URL_API}/login/check-token`, { token })
            .then(data => {
                if (!data.data.rs) {
                    fakeAuth.signout();
                    return;
                }
                fakeAuth.authenticate(() => {
                });
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this._checkToken()
    }


    render() {
        console.log(this.state.authToken);

        if (this.state.authToken === true)
            return <Redirect to='/' />
        return (
            <div>
                <form onSubmit={this._onSubmit} className="form-login" >
                    <h2>Login</h2>
                    <input type='text' name='email' placeholder='email' onChange={this._onChangeInput} autoComplete='off' />
                    <input type='password' name='password' placeholder='password' onChange={this._onChangeInput} autoComplete='off' />
                    <button type='submit'> OK</button>
                </form>
            </div>
        )
    }
}
