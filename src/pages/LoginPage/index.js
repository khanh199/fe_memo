import React, { Component } from 'react'
import axios from 'axios'
import { URL_API } from '../../constants/config'
import fakeAuth from '../../auth'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'
import { connect } from 'react-redux'
import {actGetCategoriesRequest, actGetNotesRequest} from '../../actions/index'


class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: 'ltk1909@gmail.com',
            password: 'khanh123',
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

        // $(".button").click(function (e) {
        //     var pX = e.pageX,
        //         pY = e.pageY,
        //         oX = parseInt($('.login').offset().left),
        //         oY = parseInt($('.login').offset().top);

        //     $('.login').append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
        //     $('.x-' + oX + '.y-' + oY + '').animate({
        //         "width": "500px",
        //         "height": "500px",
        //         "top": "-250px",
        //         "left": "-250px",

        //     }, 600);
        //     $("button", '.login').addClass('active');
        // })

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
            console.log(this);

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
            // <div>
            //     <form onSubmit={this._onSubmit} className="form-login" >
            //         <h2>Login</h2>
            //         <input type='text' name='email' placeholder='email' onChange={this._onChangeInput} autoComplete='off' />
            //         <input type='password' name='password' placeholder='password' onChange={this._onChangeInput} autoComplete='off' />
            //         <button type='submit'> OK</button>
            //     </form>
            // </div>
            <div id="login-page">
                <div className="materialContainer">
                    <div className="box">
                        <div className="title">LOGIN</div>
                        <div className="input">
                            <label htmlFor="name">Username</label>
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
                            <label htmlFor="regname">Username</label>
                            <input type="text" name="regname" id="regname" />
                            <span className="spin" />
                        </div>
                        <div className="input">
                            <label htmlFor="regpass">Password</label>
                            <input type="password" name="regpass" id="regpass" />
                            <span className="spin" />
                        </div>
                        <div className="input">
                            <label htmlFor="reregpass">Repeat Password</label>
                            <input type="password" name="reregpass" id="reregpass" />
                            <span className="spin" />
                        </div>
                        <div className="button">
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
export default connect (null, mapDispatchToProps)(index)