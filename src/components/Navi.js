import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actSetAuthFalse, actGetCategoriesRequest, actSetCategoryIndex } from '../actions/index'
import { Redirect } from 'react-router-dom'

class Navi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectPage: false
        }
    }

    componentDidMount() {
        this.props.getCategories()
    }

    _showCategories = (list) => {
        let notes = this.props.notes
        return list.map((item, index) => (
            <div
                onClick={() => this.props.setCategoryIndex(item._id)} key={index}
                className={`${item._id === this.props.categoryIndex ? 'active' : ''} category-item`}
            >
                <img src="./assets/images/tags-item.svg" alt="item" />
                <p>{item.name}</p>
                <div className="quantity">
                    {notes.filter(x => x.category && x.category._id === item._id).length}
                </div>
                <div className="control-cate">
                    <div onClick={() => this.props.changePopup('edit-cate',item._id,item.name)}>
                        <img src="./assets/images/pen.svg" height="15px" width="15px" alt="pen" />
                    </div>
                    <div>
                        <img src="./assets/images/trash-1.svg" height="15px" width="15px" alt="trash" />
                    </div>
                </div>
            </div>)
        )
    }


    render() {
        let notes = this.props.notes
        if (this.state.redirectPage === true)
            return <Redirect to='/login' />

        let categories = this.props.categories
        return (
            <div className="menu-area">
                <div className="category">
                    <div className="create-new" onClick={()=>this.props.changeStatusControl('new-note')}>
                        <img src="./assets/images/plus-solid.svg" alt="+" />
                        <span>Create New</span>
                    </div>
                    <div className={`menu-item ${this.props.categoryIndex === 0 ? 'active' : ''}`}
                        onClick={() => this.props.setCategoryIndex(0)}>
                        <img src="./assets/images/sticky-note-solid.svg" alt="all" />
                        <span>All Notes</span>
                        <div className="quantity">
                            {notes.length}
                        </div>
                    </div>
                    <div className="category-area ">
                        <img src="./assets/images/tags-solid.svg" alt="tags" />
                        <p>Catagory</p>
                    </div>
                    <div className="category-list ">
                        <div className={`category-item`} onClick={() => this.props.changePopup('new-cate','')}>
                            <img src="./assets/images/plus-solid-white.svg" alt="item" />
                            <p>New category</p>
                        </div>
                        {this._showCategories(categories)}

                    </div>
                    <div className={`menu-item ${this.props.categoryIndex === 'clip' ? 'active' : ''}`} onClick={() => this.props.setCategoryIndex('clip')}>
                        <img src="./assets/images/paperclip-solid.svg" alt="all" />
                        <span>Clip</span>
                        <div className="quantity">
                            {notes.filter(x => x.clip === true).length}
                        </div>
                    </div>
                </div>
                <div className="menu-area__delete" onClick={() => {
                    this.props.logout();
                    this.setState({ redirectPage: true })
                }}>
                    <img src="./assets/images/trash-solid.svg" alt="trash" />
                    Logout
                    </div>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => {
            dispatch(actSetAuthFalse())
        },
        getCategories: () => {
            dispatch(actGetCategoriesRequest())
        },
        setCategoryIndex: (id) => {
            dispatch(actSetCategoryIndex(id))
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
        notes: state.notes,
        categoryIndex: state.categoryIndex
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi)