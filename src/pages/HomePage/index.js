import React, { Component } from 'react'
import Navi from '../../components/Navi'
import MemoList from '../../components/MemoList'
import Memo from '../../components/Memo'
import { connect } from 'react-redux'
import { actGetNotes, actNewCategory, actEditCategory } from '../../actions/index'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress'
import CameraIcon from '@material-ui/icons/Camera'
import IconButton from '@material-ui/core/IconButton';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import EventNoteIcon from '@material-ui/icons/EventNote';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            popup: '',
            nameCate: '',
            errTextInput: '',
            idCate: '',
            statusControl: '',
            open: true,
            severity: 'success',
            contentMsg: 'Welcome back ^^ Have a nice day!',

            showMobile: 2

        }
    }

    _onChangeShowMobile = (value) => {
        this.setState({
            showMobile: value
        })
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
        else if (this.state.nameCate.length > 30) {
            this.setState({
                errTextInput: 'Name category cannot be more than 30 characters'
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
        else if (this.state.nameCate.length > 30) {
            this.setState({
                errTextInput: 'Name category cannot be more than 30 characters'
            })
        }
        else {
            this.props.editCategory({ id: this.state.idCate, name: this.state.nameCate })
            this.setState({ popup: '' })
        }
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false })
    };



    render() {
        return (
            <React.Fragment>
                <div className="wrapper">
                    <LinearProgress style={{ position: "absolute", width: "100%", zIndex: '999', height: '2px', display: this.props.progress ? 'block' : 'none' }} />

                    <Snackbar open={this.state.open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity={this.state.severity}>
                            {this.state.contentMsg}
                        </Alert>
                    </Snackbar>

                    {this.state.popup === 'new-cate' ? (<div className="popup">
                        <div className="popup__box">
                            <div className="popup__box__title">
                                Create category
                        </div>
                            <div className="popup__box__text-input">

                                {!this.state.errTextInput ?
                                    (<TextField name="nameCate" autoFocus value={this.state.nameCate} label="Name category" onChange={(e) => this._onChangeText(e)} />)
                                    :
                                    (<TextField name="nameCate" autoFocus error helperText={this.state.errTextInput} value={this.state.nameCate} label="Name category" onChange={(e) => this._onChangeText(e)} />)
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
                                    (<TextField name="nameCate" autoFocus label="Name category" value={this.state.nameCate} onChange={(e) => this._onChangeText(e)} />)
                                    :
                                    (<TextField name="nameCate" autoFocus error helperText={this.state.errTextInput} label="Name category" value={this.state.nameCate} onChange={(e) => this._onChangeText(e)} />)
                                }

                            </div>
                            <div className="popup__box__control">
                                <Button onClick={() => this._changePopup('', '')}>Cancel</Button>
                                <Button onClick={() => this._onSaveEditCate()}>Save</Button>
                            </div>
                        </div>
                    </div>) : null
                    }
                    <Navi onChangeShowMobile={this._onChangeShowMobile} changePopup={this._changePopup} changeStatusControl={this._onChangeStatus} showMobile={this.state.showMobile} />
                    <div className="main-area">
                        <MemoList onChangeShowMobile={this._onChangeShowMobile} changeStatusControl={this._onChangeStatus} showMobile={this.state.showMobile} />
                        <Memo onChangeShowMobile={this._onChangeShowMobile} idCate={this.state.idCate} statusControl={this.state.statusControl} changeStatusControl={this._onChangeStatus} />

                    </div>

                </div>
                <div className="control-nav">
                    <IconButton aria-label="A" onClick={() => this.setState({ showMobile: 1 })} >
                        <MenuOpenIcon fontSize="inherit" className={`control-nav__icon ${this.state.showMobile===1? 'active':''}`} />
                    </IconButton>
                    <IconButton aria-label="A" onClick={() => this.setState({ showMobile: 2 })} >
                        <MenuBookIcon fontSize="inherit" className={`control-nav__icon ${this.state.showMobile===2? 'active':''}`} />
                    </IconButton>
                    <IconButton aria-label="A" onClick={() => this.setState({ showMobile: 3 })} >
                        <SubjectRoundedIcon fontSize="inherit" className={`control-nav__icon ${this.state.showMobile===3? 'active':''}`} />
                    </IconButton>
                </div>
            </React.Fragment>
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
const mapStateToProps = (state, ownProps) => {
    return {
        progress: state.progress
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)