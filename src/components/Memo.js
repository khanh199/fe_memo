import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actNewNote, actEditNote, actSetClip, actDeleteNoteToTrash,actRestoreNote, actDeleteNote } from '../actions/index'
import moment from 'moment'
class Memo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            category: null,
            openPopupCate: false,
            clip: false,
            id: null
        }
    }
    _onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    _onSaveNew = () => {
        this.props.newNote(this.state)
    }
    _onSaveEdit = () => {
        this.props.editNote(this.state)
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
                    {item.name}
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
            category: noteItem.category ? noteItem.category._id : null
        })
        this.props.changeStatusControl('edit-note')
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ category: this.props.categoryIndex })
        }, 100);

    }


    render() {
        let { notes, noteIndex, categories, statusControl } = this.props

        if (statusControl === 'edit-note') {
            return (
                <div className="memo-area">
                    <div className="tools-bar">
                        <div className="tools3">
                            <div className="tools-bar__item save" onClick={this._onSaveEdit}>
                                <img src="./assets/images/save-solid.svg" alt="save" />
                                Save
                            </div>
                            <div className={`tools-bar__item clip ${this.state.clip ? 'active' : ''}`} onClick={() => this.setState({ clip: !this.state.clip })}>
                                <img src="./assets/images/paperclip-solid1.svg" alt="clip" />
                                Clip
                            </div>
                        </div>
                        <div className="tools-bar__item delete">
                            <img src="./assets/images/trash-solid.svg" alt="trash" />
                            Delete
                        </div>
                    </div>
                    <div className="memo-detail">
                        <div className="memo-detail--info">
                            <div className="time">
                                <img src="./assets/images/clock-regular-2.svg" alt="clock" />
                                {moment().format('YYYY/MM/DD')}
                            </div>
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
                    <div className="tools-bar">
                        <div className="tools3">
                            <div className="tools-bar__item save" onClick={this._onSaveNew}>
                                <img src="./assets/images/save-solid.svg" alt="save" />
                                Save
                            </div>
                            <div className={`tools-bar__item clip ${this.state.clip ? 'active' : ''}`} onClick={() => this.setState({ clip: !this.state.clip })}>
                                <img src="./assets/images/paperclip-solid1.svg" alt="clip" />
                                Clip
                            </div>
                        </div>
                        <div className="tools-bar__item delete">
                            <img src="./assets/images/trash-solid.svg" alt="trash" />
                            Delete
                        </div>
                    </div>
                    <div className="memo-detail">
                        <div className="memo-detail--info">
                            <div className="time">
                                <img src="./assets/images/clock-regular-2.svg" alt="clock" />
                                {moment().format('YYYY/MM/DD')}
                            </div>
                            <div
                                onClick={() => this.setState({ openPopupCate: !this.state.openPopupCate })}
                                className={`cate edit`}>
                                <img src="./assets/images/tags-solid-dark.svg" alt="tag" />
                                {this.props.categoryIndex === null || this.props.categoryIndex === '' || this.props.categoryIndex == 0 ? 'No category' : categories.find(x => x._id == this.props.categoryIndex).name}
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
        if (!noteItem)
            noteItem = notes[0]
        if (noteItem)
            return (
                <div className="memo-area">
                    <div className="tools-bar">
                        <div className="tools3">
                            <div className="tools-bar__item edit" onClick={() => this._onEdit()}>
                                <img src="./assets/images/pen-solid.svg" alt="pen" />
                                Edit
                            </div>
                            <div className={`tools-bar__item clip ${noteItem.clip ? 'active' : ''}`} onClick={() => this.props.setClip(!noteItem.clip, noteItem._id)}>
                                <img src="./assets/images/paperclip-solid1.svg" alt="clip" />
                                Clip
                            </div>
                        </div>
                        <div className="tools3">
                            
                            {this.props.categoryIndex === 'trash' ? (<div className="tools-bar__item delete forever" onClick={() => this.props.deleteNoteForever(noteItem._id)}>
                                <img src="./assets/images/trash-solid.svg" alt="trash" />
                                Delete
                            </div>) : (<div className="tools-bar__item delete" onClick={() => this.props.deleteToTrash(noteItem._id)}>
                                <img src="./assets/images/trash-solid.svg" alt="trash" />
                                Delete
                            </div>)}
                            {this.props.categoryIndex === 'trash' ? (<div className="tools-bar__item restore"  onClick={()=>this.props.restoreNote(noteItem._id)}>
                                <img src="./assets/images/restore.svg" height="15px" width="15px" alt="trash" />
                                Restore
                            </div>) : null}

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
        setClip: (status, id) => {
            dispatch(actSetClip(status, id))
        },
        deleteToTrash: (id) => {
            dispatch(actDeleteNoteToTrash(id))
        },
        restoreNote: (id)=>{
            dispatch(actRestoreNote(id))
        },
        deleteNoteForever: (id)=>{
            dispatch(actDeleteNote(id))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        notes: state.notes,
        noteIndex: state.noteIndex,
        categories: state.categories,
        categoryIndex: state.categoryIndex
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Memo);