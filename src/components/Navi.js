import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actSetAuthFalse, actGetCategoriesRequest, actSetCategoryIndex, actDeleteCategory } from '../actions/index'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'
import Button from "@material-ui/core/Button"

class Navi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectPage: false,
            showCate: true
        }
    }

    componentDidMount() {
        this.props.getCategories()
        $(".category-area").click(function () {
            $(".scroll-bar-wrap").slideToggle("slow");
        });
    }

    _showCategories = (list) => {
        let notes = this.props.notes
        return list.map((item, index) => (
            <div className="category-item-cover" key={index}>
                <Button
                    onClick={() => this.props.setCategoryIndex(item._id)}
                    className={`${item._id === this.props.categoryIndex ? 'active' : ''} category-item`}
                >
                    <img src="./assets/images/tags-item.svg" alt="item" />
                    <p>{item.name}</p>
                    <div className="quantity">
                        {notes.filter(x => x.category && x.category._id === item._id && x.deleted !== true).length}
                    </div>
                    <div className="control-cate">
                        <div onClick={() => this.props.changePopup('edit-cate', item._id, item.name)}>
                            <img src="./assets/images/pen.svg" height="15px" width="15px" alt="pen" />
                        </div>
                        <div onClick={() => this.props.deleteCategory(item._id)}>
                            <img src="./assets/images/trash-1.svg" height="15px" width="15px" alt="trash" />
                        </div>
                    </div>
                </Button>
            </div>
        )
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
                    <div className="create-new" onClick={() => this.props.changeStatusControl('new-note')}>
                        <img src="./assets/images/plus-solid.svg" alt="+" />
                        <span>Create New</span>
                    </div>
                    <Button className={`menu-item ${this.props.categoryIndex === 0 ? 'active' : ''}`}
                        onClick={() => this.props.setCategoryIndex(0)}>
                        <img src="./assets/images/sticky-note-solid.svg" alt="all" />
                        <span>All Notes</span>
                        <div className="quantity">
                            {notes.length}
                        </div>
                    </Button>

                    <Button className="category-area" onClick={() => this.setState({ showCate: !this.state.showCate })} >
                        <img src="./assets/images/tags-solid.svg" alt="tags" />
                        <p>Catagory</p>
                        <img height="12px" width="12px" className={`arrow-cate ${this.state.showCate ? 'up' : ''}`} src="./assets/images/arrow-down.svg" alt="arrow" />
                    </Button>
                    <div className="scroll-bar-wrap">
                        <div className={`category-list`}>
                            <Button className={`category-item`} onClick={() => this.props.changePopup('new-cate', '')}>
                                <img src="./assets/images/plus-solid-white.svg" alt="item" />
                                <p>New category</p>
                            </Button>
                            {this._showCategories(categories)}
                        </div>
                        <div className="cover-bar"></div>
                    </div>

                    <Button className={`menu-item ${this.props.categoryIndex === 'clip' ? 'active' : ''}`} onClick={() => this.props.setCategoryIndex('clip')}>
                        <img src="./assets/images/paperclip-solid.svg" alt="all" />
                        <span>Clip</span>
                        <div className="quantity">
                            {notes.filter(x => x.clip === true).length}
                        </div>
                    </Button>
                </div>
                <div className="menu-area__bottom">
                    <Button className="menu-area__logout"
                        onClick={() => {
                            this.props.logout();
                            this.setState({ redirectPage: true })
                        }}
                    >
                        <img height="15px" width="15px" src="./assets/images/logout.svg" alt="trash" />
                        Logout
                    </Button>
                    <Button
                        className={`menu-area__delete ${this.props.categoryIndex === 'trash' ? 'active' : ''}`}
                        onClick={() => this.props.setCategoryIndex('trash')}>
                        <img height="15px" width="15px" src="./assets/images/trash-solid.svg" alt="trash" />
                        Recycle bin
                    </Button>
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
        },
        deleteCategory: (id) => {
            dispatch(actDeleteCategory(id))
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