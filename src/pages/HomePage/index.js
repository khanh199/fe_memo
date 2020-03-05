import React, { Component } from 'react'
import Navi from '../../components/Navi'
import MemoList from '../../components/MemoList'
import Memo from '../../components/Memo'
import { connect } from 'react-redux'
import { actGetNotes, actNewCategory, actEditCategory } from '../../actions/index'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';


class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            popup: '',
            nameCate: '',
            errTextInput: '',
            idCate: '',
            statusControl: ''
        }
    }
    _changePopup = (status, idCate = '', nameCate = '') => {
        this.setState({
            popup: status,
            idCate: idCate,
            nameCate: nameCate,
            errTextInput: ''
        })
    }
    _onChangeStatus = (status) => {
        this.setState({
            statusControl: status
        })
    }
    _onChangeText = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    _onSaveNewCate = () => {
        if (this.state.nameCate === '') {
            this.setState({
                errTextInput: 'Name category must not empty'
            })
        }
        else if (this.state.nameCate.length > 15) {
            this.setState({
                errTextInput: 'Name category cannot be more than 15 characters'
            })
        }
        else {
            this.props.newCategory({ name: this.state.nameCate })
            this.setState({ popup: '' })
        }
    }
    _onSaveEditCate = () => {
        if (this.state.nameCate === '') {
            this.setState({
                errTextInput: 'Name category must not empty'
            })
        }
        else if (this.state.nameCate.length > 35) {
            this.setState({
                errTextInput: 'Name category cannot be more than 15 characters'
            })
        }
        else {
            this.props.editCategory({ id: this.state.idCate, name: this.state.nameCate })
            this.setState({ popup: '' })
        }
    }

    render() {
        return (
            <div className="wrapper">
                {this.state.popup === 'new-cate' ? (<div className="popup">
                    <div className="popup__box">
                        <div className="popup__box__title">
                            Create category
                        </div>
                        <div className="popup__box__text-input">

                            {!this.state.errTextInput ?
                                (<TextField name="nameCate" autoFocus value={this.state.nameCate} label="Name category"  onChange={(e) => this._onChangeText(e)} />)
                                :
                                (<TextField name="nameCate" autoFocus error helperText={this.state.errTextInput} value={this.state.nameCate} label="Name category"  onChange={(e) => this._onChangeText(e)} />)
                            }

                        </div>
                        <div className="popup__box__control">
                            <Button onClick={() => this._changePopup('', '')}>Cancel</Button>
                            <Button onClick={() => this._onSaveNewCate()}>Save</Button>
                        </div>
                    </div>
                </div>) : null
                }
                {this.state.popup === 'edit-cate' ? (<div className="popup">
                    <div className="popup__box">
                        <div className="popup__box__title">
                            Rename category
                        </div>
                        <div className="popup__box__text-input">
                            {!this.state.errTextInput ?
                                (<TextField name="nameCate" autoFocus label="Name category" value={this.state.nameCate}  onChange={(e) => this._onChangeText(e)} />)
                                :
                                (<TextField name="nameCate" autoFocus error helperText={this.state.errTextInput} label="Name category" value={this.state.nameCate}  onChange={(e) => this._onChangeText(e)} />)
                            }

                        </div>
                        <div className="popup__box__control">
                            <Button onClick={() => this._changePopup('', '')}>Cancel</Button>
                            <Button onClick={() => this._onSaveEditCate()}>Save</Button>
                        </div>
                    </div>
                </div>) : null
                }
                <Navi changePopup={this._changePopup} changeStatusControl={this._onChangeStatus} />
                <div className="main-area">
                    <MemoList changeStatusControl={this._onChangeStatus} />
                    <Memo idCate={this.state.idCate} statusControl={this.state.statusControl} changeStatusControl={this._onChangeStatus} />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getNotesRequest: () => {
            dispatch(actGetNotes())
        },
        newCategory: (data) => {
            dispatch(actNewCategory(data))
        },
        editCategory: (data) => {
            dispatch(actEditCategory(data))
        }
    }
}

export default connect(null, mapDispatchToProps)(index)