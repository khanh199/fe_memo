import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actGetNotesRequest, actSetNoteIndex } from '../actions/index'
import moment from 'moment'

class MemoList extends Component {
    componentDidMount() {
        this.props.getNotes()
    }
    constructor(props) {
        super(props)

        this.state = {
            keySearch: ''
        }
    }

    _showMemoItem = (list, idCate) => {
        if (list.length > 0) {
            let rs = list.map((item, index) => {
                if (item.deleted === true)
                    return null
                else if (idCate === 'clip' && item.clip === true && item.title.includes(this.state.keySearch))
                    return (
                        <div key={index} onClick={() => this._onChooseMemo(item._id)} className={`memo-item  ${item._id === this.props.noteIndex ? 'active' : ''} ${item.clip ? 'clip' : ''}`}>
                            <p className="memo-item__title">{item.title}</p>
                            <div className="memo-item__info">
                                <p className="memo-item__info--clock">
                                    <img src="./assets/images/clock-regular.svg" alt="clock" />
                                    <span>{moment(item.createDate).format("YYYY/MM/DD")}</span>
                                </p>
                                {item.category ? (<p className="memo-item__info--cate">
                                    <img height="12px" className="tag-item-icon" src="./assets/images/tags-solid-dark.svg" alt="tags" />
                                    <span>{item.category.name}</span>
                                </p>) : null}
                            </div>
                            <div className="clip-memo-item">
                                <img src="./assets/images/paperclip-solid-i.svg" alt="clip" />
                            </div>
                        </div>
                    )
                else if ((idCate === 0 || item.category && item.category._id === idCate) && item.title.includes(this.state.keySearch))
                    return (
                        <div key={index} onClick={() => this._onChooseMemo(item._id)} className={`memo-item  ${item._id === this.props.noteIndex ? 'active' : ''} ${item.clip ? 'clip' : ''}`}>
                            <p className="memo-item__title">{item.title}</p>
                            <div className="memo-item__info">
                                <p className="memo-item__info--clock">
                                    <img src="./assets/images/clock-regular.svg" alt="clock" />
                                    <span>{moment(item.createDate).format("YYYY/MM/DD")}</span>
                                </p>
                                {item.category ? (<p className="memo-item__info--cate">
                                    <img height="12px" className="tag-item-icon" src="./assets/images/tags-solid-dark.svg" alt="tags" />
                                    <span>{item.category.name}</span>
                                </p>) : null}
                            </div>
                            <div className="clip-memo-item">
                                <img src="./assets/images/paperclip-solid-i.svg" alt="clip" />
                            </div>
                        </div>
                    )
            })
            rs = rs.filter(x => x)
            return rs
        }
        return []
    }
    _showMemoItemDeleted = (list, idCate) => {
        if (list.length > 0)
            return list.map((item, index) => {
                if (idCate === 'trash' && item.deleted === true && item.title.includes(this.state.keySearch))
                    return (
                        <div key={index} onClick={() => this._onChooseMemo(item._id)} className={`memo-item  ${item._id === this.props.noteIndex ? 'active' : ''} ${item.clip ? 'clip' : ''}`}>
                            <p className="memo-item__title">{item.title}</p>
                            <div className="memo-item__info">
                                <p className="memo-item__info--clock">
                                    <img src="./assets/images/clock-regular.svg" alt="clock" />
                                    <span>{moment(item.createDate).format("YYYY/MM/DD")}</span>
                                </p>
                                {item.category ? (<p className="memo-item__info--cate">
                                    <img height="12px" className="tag-item-icon" src="./assets/images/tags-solid-dark.svg" alt="tags" />
                                    <span>{item.category.name}</span>
                                </p>) : null}
                            </div>
                            <div className="clip-memo-item">
                                <img src="./assets/images/paperclip-solid-i.svg" alt="clip" />
                            </div>
                        </div>
                    )
            }).filter(x => x)
        return []
    }
    _onChooseMemo = (id) => {
        this.props.changeNoteIndex(id)
        this.props.changeStatusControl('')
    }

    render() {
        let lsNotes = this.props.notes;
        let categoryIndex = this.props.categoryIndex
        let shows = this.props.categoryIndex !== 'trash' ? this._showMemoItem(lsNotes, categoryIndex) : this._showMemoItemDeleted(lsNotes, categoryIndex)
        return (
            <div className="title-area">
                <div className="search-box">
                    <input className="search"
                        placeholder="キーワードを入力" name="keySearch"
                        onChange={(e) => this.setState({ keySearch: e.target.value })} 
                        value= {this.state.keySearch}
                        />
                    <img className="search-icon" src="./assets/images/search-solid.svg" alt="search-icon" />
                </div>
                <div className="title-head">
                    <span>Title</span> <img src="./assets/images/sort-amount-up-alt-solid.svg" alt="sort-amount-up-alt-solid" />
                </div>
                <div className="memo-list">
                    {shows.length ? shows : (<div className="empty"> <img className="search-icon" src="http://ssl.gstatic.com/social/contactsui/images/labels/emptylabelicon_1x.png" alt="empty" /> <br /> <p>No notes in list  </p> </div>)}
                </div>

            </div>


        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getNotes: () => {
            dispatch(actGetNotesRequest())
        },
        changeNoteIndex: (id) => {
            dispatch(actSetNoteIndex(id))
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        notes: state.notes,
        noteIndex: state.noteIndex,
        categoryIndex: state.categoryIndex
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoList)