import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actGetNotesRequest } from '../actions/index'
import moment from 'moment'

class MemoList extends Component {
    componentDidMount() {
        this.props.getNotes()
    }

    _showMemoItem = (list) => {
        return list.map((item, index) => {
            return (
                <div key={index} className={`memo-item ${index==0?'active':''} ${item.clip ? 'clip':''}`}>
                    <p className="memo-item__title">{item.title}</p>
                    <div className="memo-item__info">
                        <p className="memo-item__info--clock">
                            <img src="./assets/images/clock-regular.svg" alt="clock" />
                            <span>{moment(item.createDate).format("YYYY/MM/DD")}</span>
                        </p>
                        <p className="memo-item__info--cate">
                            <img height="12px" className="tag-item-icon" src="./assets/images/tags-solid-dark.svg" alt="tags" />
                            <span>Category 01</span>
                        </p>
                    </div>
                    <div className="clip-memo-item">
                        <img src="./assets/images/paperclip-solid-i.svg" alt="clip" />
                    </div>
                </div>
            )
        })
    }

    render() {
        let lsNotes=this.props.notes;
        return (
            <div className="title-area">
                <div className="search-box">
                    <input className="search" placeholder="キーワードを入力" />
                    <img className="search-icon" src="./assets/images/search-solid.svg" alt="search-icon" />
                </div>
                <div className="title-head">
                    <span>Title</span> <img src="./assets/images/sort-amount-up-alt-solid.svg" alt="sort-amount-up-alt-solid" />
                </div>
                <div className="memo-list">
                    {this._showMemoItem(lsNotes)}
                    
                </div>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getNotes: () => {
            dispatch(actGetNotesRequest())
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        notes: state.notes,
        noteIndex : state.noteIndex
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoList)