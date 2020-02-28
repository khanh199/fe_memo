import React, { Component } from 'react'
import Navi from '../../components/Navi'
import MemoList from '../../components/MemoList'
import Memo from '../../components/Memo'
import { connect } from 'react-redux'
import { actGetNotes } from '../../actions/index'


class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            popup: ''
        }
    }
    _changePopup = (status)=>{
        this.setState({
            popup : status
        })
    }
    render() {
        return (
            <div className="wrapper">
                {this.state.popup !== '' ? (<div class="popup">
                    <div className="popup__box">
                        <div className="popup__box__title">
                            Create category
                        </div>
                        <div className="popup__box__text-input">
                            <input />
                        </div>
                        <div className="popup__box__control">
                            <div onClick={()=>this._changePopup('')}>Cancel</div>
                            <div>Save</div>
                        </div>
                    </div>
                </div>) : null

                }
                <Navi changePopup = {this._changePopup} />
                <div className="main-area">
                    <MemoList />
                    <Memo />
                </div>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getNotesRequest: () => {
            dispatch(actGetNotes())
        }
    }
}


export default connect(null, mapDispatchToProps)(index)