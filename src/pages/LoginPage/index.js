import React, { Component } from 'react'
import axios from 'axios'
import { URL_API } from '../../constants/config'
import fakeAuth from '../../auth'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'
import { connect } from 'react-redux'
import { actGetCategoriesRequest, actGetNotesRequest } from '../../actions/index'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            authToken: false,
            open: false,
            severity: 'error',
            contentMsg: ''
        }
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false })
    };

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
                var pX = parseInt($('.login').offset().left) + 105,
                    pY = parseInt($('.login').offset().top) + 35,
                    oX = parseInt($('.login').offset().left),
                    oY = parseInt($('.login').offset().top);

                $('.login').append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
                $('.x-' + oX + '.y-' + oY + '').animate({
                    "width": "500px",
                    "height": "500px",
                    "top": "-250px",
                    "left": "-250px",

                }, 500);
                $("button", '.login').addClass('active');

                setTimeout(() => {
                    localStorage.setItem('memo-token', data.data.token)
                    fakeAuth.isAuthenticated = true
                    this.setState({ authToken: true })
                }, 1000);

            })
            .catch(x => {
                this.setState({
                    open: true,
                    contentMsg: 'Email or password is incorrect !!!',
                    severity: 'error'
                })
            })
    }
    _onSignUp = () => {
        let { email, password } = this.state
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            this.setState({
                severity: 'error',
                contentMsg: 'Invalid email !!!',
                open: true
            })
        }
        else if (password.length < 9) {
            this.setState({
                severity: 'error',
                contentMsg: 'Password must be greater than 8 characters !!!',
                open: true
            })
        }
        else {
            axios.post(`${URL_API}/users/signup`, { email, password, name: 'Guest' })
                .then(rs => {
                    console.log(123);

                    this.setState({
                        severity: 'success',
                        contentMsg: 'Sign up success ^^',
                        open: true,
                        email: '',
                        password: ''
                    })
                    $(".shape").css({
                        "width": "100%",
                        "height": "100%",
                        "transform": "rotate(0deg)"
                    })

                    setTimeout(function () {
                        $(".overbox").css({
                            "overflow": "initial"
                        })
                    }, 600)

                    $('.alt-2').animate({
                        "width": "140px",
                        "height": "140px"
                    }, 500, function () {
                        $(".box").removeClass("back");

                        $('.alt-2').removeClass('active')
                    });

                    $(".overbox .title").fadeOut(300);
                    $(".overbox .input").fadeOut(300);
                    $(".overbox .button").fadeOut(300);

                    $(".alt-2").addClass('material-buton');
                })
                .catch((err) => {
                    this.setState({
                        severity: 'error',
                        contentMsg: 'Email exists  !!!',
                        open: true
                    })
                })
        }
    }

    _checkToken = () => {
        let token = localStorage.getItem('memo-token');
        axios.post(`${URL_API}/users/check-token`, { token })
            .then(data => {
                if (!data.data.rs) {
                    fakeAuth.signout();
                    return;
                }
                fakeAuth.authenticate(() => {
                    this.setState({ authToken: true })
                });
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this._checkToken()
        $(".input input").focus(function () {

            $(this).parent(".input").each(function () {
                $("label", this).css({
                    "line-height": "18px",
                    "font-size": "18px",
                    "font-weight": "100",
                    "top": "0px"
                })
                $(".spin", this).css({
                    "width": "100%"
                })
            });
        }).blur(function () {
            $(".spin").css({
                "width": "0px"
            })
            if ($(this).val() == "") {
                $(this).parent(".input").each(function () {
                    $("label", this).css({
                        "line-height": "60px",
                        "font-size": "24px",
                        "font-weight": "300",
                        "top": "10px"
                    })
                });

            }
        });

        $(".alt-2").click(function () {
            if (!$(this).hasClass('material-button')) {
                $(".shape").css({
                    "width": "100%",
                    "height": "100%",
                    "transform": "rotate(0deg)"
                })

                setTimeout(function () {
                    $(".overbox").css({
                        "overflow": "initial"
                    })
                }, 600)

                $(this).animate({
                    "width": "140px",
                    "height": "140px"
                }, 500, function () {
                    $(".box").removeClass("back");

                    $(this).removeClass('active')
                });

                $(".overbox .title").fadeOut(300);
                $(".overbox .input").fadeOut(300);
                $(".overbox .button").fadeOut(300);

                $(".alt-2").addClass('material-buton');
            }

        })

        $(".material-button").click(function () {
            if ($('.alt-2').hasClass('material-button')) {
                setTimeout(function () {
                    $(".overbox").css({
                        "overflow": "hidden"
                    })
                    $(".box").addClass("back");
                }, 200)
                $('.alt-2').addClass('active').animate({
                    "width": "700px",
                    "height": "700px"
                });

                setTimeout(function () {
                    $(".shape").css({
                        "width": "50%",
                        "height": "50%",
                        "transform": "rotate(45deg)"
                    })

                    $(".overbox .title").fadeIn(300);
                    $(".overbox .input").fadeIn(300);
                    $(".overbox .button").fadeIn(300);
                }, 700)

                $('.alt-2').removeClass('material-button');

            }

            if ($(".alt-2").hasClass('material-buton')) {
                $(".alt-2").removeClass('material-buton');
                $(".alt-2").addClass('material-button');
            }

        });

    }



    render() {
        if (this.state.authToken === true)
            return <Redirect to='/' />
        return (

            <div id="login-page" >
                <Snackbar open={this.state.open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity={this.state.severity}>
                        {this.state.contentMsg}
                    </Alert>
                </Snackbar>
                <div className="materialContainer">
                    <div className="box">
                        <div className="title">LOGIN</div>
                        <div className="input">
                            <label htmlFor="name">Email</label>
                            <input type="text" name="email" onChange={this._onChangeInput} value={this.state.email} id="name" />
                            <span className="spin" />
                        </div>
                        <div className="input">
                            <label htmlFor="pass">Password</label>
                            <input type="password" name="password" onChange={this._onChangeInput} value={this.state.password} id="pass" />
                            <span className="spin" />
                        </div>
                        <div className="button login">
                            <button onClick={this._onSubmit}>
                                <span>GO</span> <i className="fa fa-check" />
                            </button>
                        </div>
                        <a className="pass-forgot">
                            Forgot your password?
                        </a>
                    </div>
                    <div className="overbox">
                        <div className="material-button alt-2">
                            <span className="shape" />
                        </div>
                        <div className="title">REGISTER</div>
                        <div className="input">
                            <label htmlFor="regname">Email</label>
                            <input type="text" name="regname" id="regname" onChange={e => this.setState({ email: e.target.value })} />
                            <span className="spin" />
                        </div>
                        <div className="input">
                            <label htmlFor="regpass">Password</label>
                            <input type="password" name="regpass" id="regpass" onChange={e => this.setState({ password: e.target.value })} />
                            <span className="spin" />
                        </div>
                        <div className="button" onClick={this._onSignUp}>
                            <button>
                                <span>NEXT</span>
                            </button>
                        </div>


                    </div>
                </div>
            </div>

        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCategories: () => {
            dispatch(actGetCategoriesRequest())
        }, getNotes: () => {
            dispatch(actGetNotesRequest())
        }
    }
}
export default connect(null, mapDispatchToProps)(index)