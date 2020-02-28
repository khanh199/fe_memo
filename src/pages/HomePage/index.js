import React, { Component } from 'react'
import Navi from '../../components/Navi'
import MemoList from '../../components/MemoList'
import Memo from '../../components/Memo'
import {connect} from 'react-redux'
import {actGetNotes} from '../../actions/index'


class index extends Component {
    render() {
        
        return (
            <div className="wrapper">
                <Navi />
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


export default connect (null,mapDispatchToProps)(index)