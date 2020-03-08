import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actGetNotesRequest, actSetNoteIndex } from '../actions/index'
import moment from 'moment'
import Button from "@material-ui/core/Button"
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

class MemoList extends Component {
    componentDidMount() {
        this.props.getNotes()
    }
    constructor(props) {
        super(props)

        this.state = {
            keySearch: '',
            sortWith: 'Title',
            sortDesc: false
        }
    }

    

    _drag = (e) => {
        e.dataTransfer.setData("idMemo", e.target.id);
        
        e.target.style.background = '#f1f1f1';
        e.target.style.boxShadow = '2px 2px 1px 1px rgba(144, 144, 144, 0.39)';
    }

    _dragEnd = (e) => {
        e.dataTransfer.setData("idMemo", e.target.id);
        
        e.target.style.background = 'white';
        e.target.style.boxShadow = 'none';
    }

    _showMemoItem = (list) => {
        if (list.length > 0) {
            let rs = list.sort((a, b) => {
                if (this.state.sortWith === 'Title')
                    if (this.state.sortDesc)
                        return (a.title > b.title) ? -1 : ((b.title > a.title) ? 1 : 0)
                    else
                        return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)
                else
                    if (this.state.sortDesc)
                        return (moment(a.createDate) > moment(b.createDate)) ? 1 : ((moment(b.createDate) > moment(a.createDate)) ? -1 : 0)
                    else
                        return (moment(a.createDate) > moment(b.createDate)) ? -1 : ((moment(b.createDate) > moment(a.createDate)) ? 1 : 0)
            }).map((item, index) => {
                if (item.title.includes(this.state.keySearch))
                    return (
                        <div draggable={true} id={item._id} onDragStart={this._drag} onDragEnd={this._dragEnd} key={index} onClick={() => {this._onChooseMemo(item._id); this.props.onChangeShowMobile(3) }} className={`memo-item dropzone ${item._id === this.props.noteIndex ? 'active' : ''} ${item.clip ? 'clip' : ''}`}>
                            <p className="memo-item__title">{item.title.length < 30 ? item.title : item.title.slice(0, 30) + '...'}</p>
                            <div className="memo-item__info">
                                <p className="memo-item__info--clock">
                                    <img src="./assets/images/clock-regular.svg" alt="clock" />
                                    <span>{moment(item.createDate).format("YYYY/MM/DD")}</span>
                                </p>
                                {item.category ? (<p className="memo-item__info--cate">
                                    <img height="12px" className="tag-item-icon" src="./assets/images/tags-solid-dark.svg" alt="tags" />
                                    <span>{item.category.name.length < 15 ? item.category.name : item.category.name.slice(0, 15) + '...'}</span>
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

    _onChooseMemo = (id) => {
        this.props.changeNoteIndex(id)
        this.props.changeStatusControl('')
    }

    render() {
        let lsNotes = this.props.notes;
        let shows = this._showMemoItem(lsNotes)
        return (
            <div className={`${this.props.showMobile === 2 ? 'active':''} title-area`}>
                <div className="search-box">
                    <input className="search"
                        placeholder="キーワードを入力" name="keySearch"
                        onChange={(e) => this.setState({ keySearch: e.target.value })}
                        value={this.state.keySearch}
                    />
                    <img className="search-icon" src="./assets/images/search-solid.svg" alt="search-icon" />
                </div>
                <div className="title-head">
                    <Tooltip placement="top" title="Sorting criteria"><Button onClick={() => this.setState({ sortWith: this.state.sortWith === 'Title' ? 'Datetime' : 'Title' })}>{this.state.sortWith}</Button></Tooltip>

                    <Tooltip placement="top" title="Sort">
                        <IconButton onClick={() => this.setState({ sortDesc: !this.state.sortDesc })}>
                            <img className={this.state.sortDesc ? `down` : ''} src="./assets/images/sort-amount-up-alt-solid.svg" alt="sort-amount-up-alt-solid" />
                        </IconButton>
                    </Tooltip>
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
        notes: state.notes.notesShow,
        noteIndex: state.noteIndex,
        categoryIndex: state.categoryIndex
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoList)