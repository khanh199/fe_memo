import React, { Component } from 'react'
import Navi from '../../components/Navi'
import MemoList from '../../components/MemoList'
import Memo from '../../components/Memo'
import { connect } from 'react-redux'
import { actGetNotes, actNewCategory, actEditCategory } from '../../actions/index'


class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            popup: '',
            nameCate: '',
            idCate:'',
            statusControl:''
        }
    }
    _changePopup = (status,idCate='',nameCate='') => {
        this.setState({
            popup: status,
            idCate : idCate,
            nameCate:nameCate
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
        this.props.newCategory({ name: this.state.nameCate })
        this.setState({popup:''})
    }
    _onSaveEditCate = () => {
        this.props.editCategory({ id: this.state.idCate,name: this.state.nameCate })
        this.setState({popup:''})
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
                            <input name="nameCate" value={this.state.nameCate} onChange={(e) => this._onChangeText(e)} />
                        </div>
                        <div className="popup__box__control">
                            <div onClick={() => this._changePopup('','')}>Cancel</div>
                            <div onClick={()=>this._onSaveNewCate()}>Save</div>
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
                            <input name="nameCate" value={this.state.nameCate} onChange={(e) => this._onChangeText(e)} />
                        </div>
                        <div className="popup__box__control">
                            <div onClick={() => this._changePopup('','')}>Cancel</div>
                            <div onClick={()=>this._onSaveEditCate()}>Save</div>
                        </div>
                    </div>
                </div>) : null
                }
                <Navi changePopup={this._changePopup} changeStatusControl = {this._onChangeStatus}/>
                <div className="main-area">
                    <MemoList changeStatusControl = {this._onChangeStatus}/>
                    <Memo statusControl={this.state.statusControl}/>
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
        editCategory: (data)=>{
            dispatch(actEditCategory(data))
        }
    }
}

export default connect(null, mapDispatchToProps)(index)