import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actNewNote, actEditNote, actSetClip, actSetNoteIndex, actDeleteNoteToTrash, actRestoreNote, actDeleteNote } from '../actions/index'
import moment from 'moment'
import Button from "@material-ui/core/Button"
import { DatePicker } from 'antd';
import 'antd/lib/date-picker/style/index.css';
import Dialog from '../components/DialogCustom'
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class Memo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            category: null,
            openPopupCate: false,
            clip: false,
            id: null,
            createDate: null,

            openDialog: false,
            textTitleDialog: 'Notes',
            textMsg: 'Action will delete this memo forever. Are you sure?',
            idMemoDelete: '',

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
    }

    _onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    _onSaveNew = () => {
        if (this.state.title !== '') {
            this.props.newNote(this.state)
            this.setState({
                title: '',
                content: '',
                category: null,
                openPopupCate: false,
                clip: false,
                createDate: null
            })
            setTimeout(() => {
                this.props.changeStatusControl('')
            }, 500);
        }
        else {
            this.setState({
                open: true,
                contentMsg: "Note title must not be blank !!"
            })
        }
    }
    _onSaveEdit = () => {
        if (this.state.title !== '') {
            this.props.editNote(this.state)
            setTimeout(() => {
                this.props.changeStatusControl('')
            }, 800);
        }
        else {
            this.setState({
                open: true,
                contentMsg: "Note title must not be blank !!"
            })
        }
    }
    _onChangeCateState = (id) => {
        this.setState({ category: id })
    }
    _showCatePopup = (list) => {
        let rs = []
        rs.push(<div key={-1}
            onClick={() => this._onChangeCateState(null)}
            className={`cate_popup__cate-item ${this.state.category ? '' : 'active'}`}>
            <img className="img-cate" src="./assets/images/tags-solid-dark.svg" alt="clock" />
            No category
            <img className="tick" height="12px" width="12px" src="./assets/images/tick.svg" alt="tick" />
        </div>)
        rs.push(list.map((item, index) => {
            return (
                <div
                    key={index} onClick={() => this._onChangeCateState(item._id)}
                    className={`cate_popup__cate-item ${item._id === this.state.category ? 'active' : ''}`}>
                    <img className="img-cate" src="./assets/images/tags-solid-dark.svg" alt="clock" />
                    {item.name.length < 20 ? item.name : item.name.slice(0, 15) + '...'}
                    <img className="tick" height="12px" width="12px" src="./assets/images/tick.svg" alt="tick" />
                </div>
            )
        }))
        return rs
    }


    _onEdit = () => {
        let { notes, noteIndex } = this.props
        let noteItem = notes.find(x => x._id === noteIndex)
        this.setState({
            id: noteIndex,
            title: noteItem.title,
            content: noteItem.content,
            clip: noteItem.clip,
            category: noteItem.category ? noteItem.category._id : null,
            createDate: noteItem.createDate
        })
        this.props.changeStatusControl('edit-note')
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ category: this.props.categoryIndex })
        }, 100);
    }
    _handleCloseDialog = () => {
        this.setState({
            openDialog: false
        })
    }

    _onChange = (date, dateString) => {
        this.setState({ createDate: dateString })
    }
    componentWillReceiveProps() {
        if (this.props.statusControl === 'new-note')
            this.setState({
                title: '',
                content: '',
                category: null,
                openPopupCate: false,
                clip: false,
                createDate: null
            })
    }

    render() {
        let { notes, noteIndex, categories, statusControl } = this.props
        if (statusControl === 'edit-note') {
            return (
                <div className="memo-area">
                    <Snackbar open={this.state.open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={2000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity={this.state.severity}>
                            {this.state.contentMsg}
                        </Alert>
                    </Snackbar>
                    <div className="tools-bar">
                        <div className="tools3">
                            <Button className="tools-bar__item save" onClick={this._onSaveEdit}>
                                <img src="./assets/images/save-solid.svg" alt="save" />
                                Save
                            </Button>
                            <Button className={`tools-bar__item clip ${this.state.clip ? 'active' : ''}`} onClick={() => this.setState({ clip: !this.state.clip })}>
                                <img src="./assets/images/paperclip-solid1.svg" alt="clip" />
                                Clip
                            </Button>
                        </div>
                        <Tooltip placement="top-start" title="Take to trash">
                            <Button className="tools-bar__item delete">
                                <img src="./assets/images/trash-solid.svg" alt="trash" />
                                Delete
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="memo-detail">
                        <div className="memo-detail--info">
                            <DatePicker defaultValue={moment(this.state.createDate)} onChange={this._onChange} style={{ borderRadius: '20px' }} />

                            <div
                                onClick={() => this.setState({ openPopupCate: !this.state.openPopupCate })}
                                className={`cate edit`}>
                                <img src="./assets/images/tags-solid-dark.svg" alt="tag" />
                                {this.state.category === null ? 'No category' : categories.find(x => x._id === this.state.category).name}
                                <div className={`cate_popup ${this.state.openPopupCate ? 'active' : ''}`}>
                                    <p className='title'>Change to category</p>
                                    <div className="cate_popup__list">
                                        {this._showCatePopup(categories)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="memo-detail--title">
                            <input name="title" value={this.state.title} onChange={e => this._onChangeText(e)} />
                        </div>
                        <div className="note">
                            <textarea className="note-tool" value={this.state.content} name="content" onChange={e => this._onChangeText(e)} />
                        </div>
                    </div>
                </div>
            )
        }
        if (statusControl === 'new-note') {
            return (

                <div className="memo-area">
                    <Snackbar open={this.state.open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={2000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity={this.state.severity}>
                            {this.state.contentMsg}
                        </Alert>
                    </Snackbar>
                    <div className="tools-bar">
                        <div className="tools3">
                            <Button className="tools-bar__item save" onClick={this._onSaveNew}>
                                <img src="./assets/images/save-solid.svg" alt="save" />
                                New
                            </Button>
                            <Button className={`tools-bar__item clip ${this.state.clip ? 'active' : ''}`} onClick={() => this.setState({ clip: !this.state.clip })}>
                                <img src="./assets/images/paperclip-solid1.svg" alt="clip" />
                                Clip
                            </Button>
                        </div>
                        
                    </div>
                    <div className="memo-detail">
                        <div className="memo-detail--info">
                            <DatePicker defaultValue={moment()} onChange={this._onChange} style={{ borderRadius: '20px' }} />
                            <div
                                onClick={() => this.setState({ openPopupCate: !this.state.openPopupCate })}
                                className={`cate edit`}>
                                <img src="./assets/images/tags-solid-dark.svg" alt="tag" />
                                {!this.state.category ? 'No category' : categories.find(x => x._id === this.state.category).name}
                                <div className={`cate_popup ${this.state.openPopupCate ? 'active' : ''}`}>
                                    <p className='title'>Add to category</p>
                                    <div className="cate_popup__list">
                                        {this._showCatePopup(categories)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="memo-detail--title">
                            <input name="title" value={this.state.title} onChange={e => this._onChangeText(e)} />
                        </div>
                        <div className="note">
                            <textarea className="note-tool" value={this.state.content} name="content" onChange={e => this._onChangeText(e)} />
                        </div>
                    </div>
                </div>
            )
        }

        let noteItem = notes.find(x => x._id === noteIndex)

        if (!noteItem && this.props.categoryIndex !== 'trash') {
            noteItem = notes[0]
            if (noteItem) {
                this.props.setNoteIndex(noteItem._id)
            }
        }

        if (noteItem)
            return (
                <div className="memo-area">
                    <Dialog actionWhenOk={() => this.props.deleteNoteForever(this.state.idMemoDelete)} textMsg={this.state.textMsg} textTitleDialog={this.state.textTitleDialog} handleClose={this._handleCloseDialog} open={this.state.openDialog} />
                    <div className="tools-bar">
                        {this.props.categoryIndex === 'trash' ? (<div className="tools3"></div>) : (
                            <div className="tools3">
                                <Button className="tools-bar__item edit" onClick={() => this._onEdit()}>
                                    <img src="./assets/images/pen-solid.svg" alt="pen" />
                                    Edit
                                </Button>
                                <Button className={`tools-bar__item clip ${noteItem.clip ? 'active' : ''}`} onClick={() => this.props.setClip(!noteItem.clip, noteItem._id)}>
                                    <img src="./assets/images/paperclip-solid1.svg" alt="clip" />
                                    Clip
                            </Button>
                            </div>
                        )}

                        <div className="tools3">
                            {this.props.categoryIndex === 'trash' ? (
                                <Tooltip placement="top-start" title="Delete forever">
                                    <Button className="tools-bar__item delete forever" onClick={() => { this.setState({ openDialog: true, idMemoDelete: noteItem._id }) }}>
                                        <img src="./assets/images/trash-solid.svg" alt="trash" />
                                        Delete
                                    </Button>
                                </Tooltip>)
                                :
                                (
                                    <Tooltip placement="top-start" title="Take to trash">
                                        <Button className="tools-bar__item delete" onClick={() => this.props.deleteToTrash(noteItem._id)}>
                                            <img src="./assets/images/trash-solid.svg" alt="trash" />
                                            Delete
                                        </Button>
                                    </Tooltip>
                                )}
                            {this.props.categoryIndex === 'trash' ? (<Tooltip placement="top-start" title="Restore to the old position"><Button className="tools-bar__item restore" onClick={() => this.props.restoreNote(noteItem._id)}>
                                <img src="./assets/images/restore.svg" height="15px" width="15px" alt="trash" />
                                Restore
                            </Button></Tooltip>) : null}
                        </div>

                    </div>
                    <div className="memo-detail">
                        <div className="memo-detail--info">
                            <div className="time">
                                <img src="./assets/images/clock-regular-2.svg" alt="clock" />
                                {moment(noteItem.createDate).format('YYYY/MM/DD')}
                            </div>
                            {noteItem.category ? (
                                <div
                                    className={`cate ${this.props.statusControl !== '' ? 'edit' : ''}`}>
                                    <img src="./assets/images/tags-solid-dark.svg" alt="tag" />
                                    {noteItem.category.name}
                                </div>) : <div
                                    className={`cate ${this.props.statusControl !== '' ? 'edit' : ''}`}>
                                    <img src="./assets/images/tags-solid-dark.svg" alt="tag" />
                                    No category
                                </div>}
                        </div>
                        <div className="memo-detail--title">
                            <input name="title" value={noteItem.title} readOnly />
                        </div>
                        <div className="note">
                            <textarea className="note-tool" value={noteItem.content} name="content" readOnly />
                        </div>
                    </div>
                </div>

            )
        else return null
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        newNote: (data) => {
            dispatch(actNewNote(data))
        },
        editNote: (data) => {
            dispatch(actEditNote(data))
        },
        setClip: (status, id, cateIndex) => {
            dispatch(actSetClip(status, id, cateIndex))
        },
        deleteToTrash: (id) => {
            dispatch(actDeleteNoteToTrash(id))
        },
        restoreNote: (id) => {
            dispatch(actRestoreNote(id))
        },
        deleteNoteForever: (id) => {
            dispatch(actDeleteNote(id))
        },
        setNoteIndex: (id) => {
            dispatch(actSetNoteIndex(id))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        notes: state.notes.notesShow,
        noteIndex: state.noteIndex,
        categories: state.categories,
        categoryIndex: state.categoryIndex
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Memo);