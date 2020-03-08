import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actSetAuthFalse, actGetCategoriesRequest, actChangeIdCate, actSetCategoryIndex, actDeleteCategory } from '../actions/index'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'
import Button from "@material-ui/core/Button"
import Dialog from '../components/DialogCustom'
import Tooltip from '@material-ui/core/Tooltip';


class Navi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectPage: false,
            showCate: true,

            openDialog: false,
            textTitleDialog: 'Notes',
            textMsg: 'Action will delete this category forever. Are you sure?',
            idCateDelete: ''
        }
    }

    componentDidMount() {
        this.props.getCategories()
        $(".category-area").click(function () {
            $(".scroll-bar-wrap").slideToggle("slow");
        });
    }

    _handleCloseDialog = () => {
        this.setState({
            openDialog: false
        })
    }
    _drop = (ev, idCate) => {
        // ev.preventDefault();
        var idMemo = ev.dataTransfer.getData("idMemo");
        this.props.changeIdCateForNote(idMemo, idCate)
    }
    _dragEnter = (ev) => {
        ev.preventDefault();
        if (ev.target.className.includes("category-item") && !ev.target.className.includes("category-item-cover")) {
            ev.target.style.boxShadow = '3px 3px 2px 2px rgba(144, 144, 144, 0.39)';
        }
    }
    _allowDrop = (ev) => {
        ev.preventDefault();
    }
    _dragLeave = (ev) => {
        ev.preventDefault();
        if (ev.target.className.includes("category-item") && !ev.target.className.includes("category-item-cover")) {
            ev.target.style.boxShadow = 'none'
        }
    }




    _showCategories = (list) => {
        let notes = this.props.notes
        return list.map((item, index) => (
            <div className="category-item-cover" key={index} onDragEnter={this._dragEnter} onDragLeave={this._dragLeave} onDrop={(e) => this._drop(e, item._id)} onDragOver={this._allowDrop}>
                <Button
                    onClick={() => this.props.setCategoryIndex(item._id)}
                    className={`${item._id === this.props.categoryIndex ? 'active' : ''} category-item`}
                >
                    <img src="./assets/images/tags-item.svg" alt="item" />
                    <p>{item.name.length > 14 ? item.name.slice(0, 12) + '...' : item.name}</p>
                    <div className="quantity">
                        {notes.filter(x => x.category && x.category._id === item._id && x.deleted !== true).length}
                    </div>
                    <div className="control-cate">
                        <div onClick={() => this.props.changePopup('edit-cate', item._id, item.name)}>
                            <img src="./assets/images/pen.svg" height="15px" width="15px" alt="pen" />
                        </div>
                        <div onClick={() => this.setState({ openDialog: true, idCateDelete: item._id })}>
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
            <div className={`menu-area ${this.props.showMobile === 1? 'active' : ''}`}>
                <Dialog actionWhenOk={() => this.props.deleteCategory(this.state.idCateDelete)} textMsg={this.state.textMsg} textTitleDialog={this.state.textTitleDialog} handleClose={this._handleCloseDialog} open={this.state.openDialog} />

                <div className="category">
                    <Tooltip placement="top" title="Create new note">
                        <Button className="create-new" onClick={() => this.props.changeStatusControl('new-note')}>
                            <img src="./assets/images/plus-solid.svg" alt="+" />
                            <span className="createNew">Create New</span>
                        </Button>
                    </Tooltip>
                    <Button className={`menu-item ${this.props.categoryIndex === 0 ? 'active' : ''}`}
                        onClick={() => this.props.setCategoryIndex(0)} onDragEnter={this._dragEnter} onDragLeave={this._dragLeave} onDrop={(e) => this._drop(e, null)} onDragOver={this._allowDrop}>
                        <img src="./assets/images/sticky-note-solid.svg" alt="all" />
                        <span>All Notes</span>
                        <div className="quantity">
                            {notes.filter(x => !x.deleted).length}
                        </div>
                    </Button>
                    <Button className="category-area" onClick={() => this.setState({ showCate: !this.state.showCate })} >
                        <img src="./assets/images/tags-solid.svg" alt="tags" />
                        <p>Catagory</p>
                        <img height="12px" width="12px" className={`arrow-cate ${this.state.showCate ? 'up' : ''}`} src="./assets/images/arrow-down.svg" alt="arrow" />
                    </Button>
                    <div className="scroll-bar-wrap">
                        <div className={`category-list`}>
                            <Tooltip placement="top" title="Create new category">
                                <Button className={`category-item`} onClick={() => this.props.changePopup('new-cate', '')}>
                                    <img src="./assets/images/plus-solid-white.svg" alt="item" />
                                    <p>New category</p>
                                </Button>
                            </Tooltip>
                            {this._showCategories(categories)}
                        </div>
                        <div className="cover-bar"></div>
                    </div>
                    <Tooltip placement="top" title="Clip notes">
                        <Button className={`menu-item ${this.props.categoryIndex === 'clip' ? 'active' : ''}`} onClick={() => this.props.setCategoryIndex('clip')}>
                            <img src="./assets/images/paperclip-solid.svg" alt="all" />
                            <span>Clip</span>
                            <div className="quantity">
                                {notes.filter(x => x.clip === true).length}
                            </div>
                        </Button>
                    </Tooltip>
                </div>
                <div className="menu-area__bottom">
                    <Tooltip placement="top" title="Logout">
                        <Button className="menu-area__logout"
                            onClick={() => {
                                this.props.logout();
                                this.setState({ redirectPage: true })
                            }}
                        >
                            <img height="15px" width="15px" src="./assets/images/logout.svg" alt="trash" />
                            Logout
                        </Button>
                    </Tooltip>
                    <Tooltip placement="top" title="Deleted notes are stored">
                        <Button
                            className={`menu-area__delete ${this.props.categoryIndex === 'trash' ? 'active' : ''}`}
                            onClick={() => this.props.setCategoryIndex('trash')}>
                            <img height="15px" width="15px" src="./assets/images/trash-solid.svg" alt="trash" />
                            Recycle bin
                        </Button>
                    </Tooltip>
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
        },
        changeIdCateForNote: (idMemo, idCate) => {
            dispatch(actChangeIdCate({ idMemo, idCate }))
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
        notes: state.notes.notes,
        categoryIndex: state.categoryIndex
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi)