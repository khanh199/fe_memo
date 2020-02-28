import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actNewNote } from '../actions/index'
import moment from 'moment'
import { actGetNotesRequest } from '../actions/index'

class Memo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: ''
        }
    }
    _onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    _onSave = () => {
        this.props.newNote(this.state)
    }
    render() {
        let { notes, noteIndex } = this.props
        let noteItem = notes.find(x => x._id === noteIndex)
        if (!noteItem)
            noteItem = notes[0]
        if (noteItem)
            return (
                <div className="memo-area">
                    <div className="tools-bar">
                        <div className="tools3">
                            <div className="tools-bar__item edit">
                                <img src="./assets/images/pen-solid.svg" alt="pen" />
                                Edit
                        </div>
                            <div className="tools-bar__item save" onClick={this._onSave}>
                                <img src="./assets/images/save-solid.svg" alt="save" />
                                Save
                        </div>
                            <div className="tools-bar__item clip active">
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
                            <span className="time">
                                <img src="./assets/images/clock-regular-2.svg" alt="clock" />
                                {moment(noteItem.createDate).format('YYYY/MM/DD')}
                            </span>
                            <span className="cate">
                                <img src="./assets/images/tags-solid-2.svg" alt="tag" />
                                Category
                        </span>
                        </div>
                        <div className="memo-detail--title">
                            <input name="title" value={noteItem.title} onChange={e => this._onChangeText(e)} />
                        </div>
                        <div className="note">
                            <textarea className="note-tool" value={noteItem.content} name="content" onChange={e => this._onChangeText(e)} />
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
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        notes: state.notes,
        noteIndex: state.noteIndex
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Memo);