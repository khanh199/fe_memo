import React, { Component } from 'react'


export default class index extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="menu-area">
                    <div className="category">
                        <div className="create-new">
                            <img src="./assets/images/plus-solid.svg" alt="+" />
                            <span>Create New</span>
                        </div>
                        <div className="menu-item active">
                            <img src="./assets/images/sticky-note-solid.svg" alt="all" />
                            <span>All Notes</span>
                            <div className="quantity">
                                10
              </div>
                        </div>
                        <div className="category-area ">
                            <img src="./assets/images/tags-solid.svg" alt="tags" />
                            <p>Catagory</p>
                        </div>
                        <div className="category-list ">
                            <div className="category-item">
                                <img src="./assets/images/tags-item.svg" alt="item" />
                                <p>Category 01</p>
                                <div className="quantity">
                                    10
                </div>
                            </div>
                            <div className="category-item active">
                                <img src="./assets/images/tags-item.svg" alt="item" />
                                <p>Category 02</p>
                                <div className="quantity">
                                    10
                </div>
                            </div>
                        </div>
                        <div className="menu-item ">
                            <img src="./assets/images/paperclip-solid.svg" alt="all" />
                            <span>Clip</span>
                            <div className="quantity">
                                10
              </div>
                        </div>
                    </div>
                    <div className="menu-area__delete">
                        <img src="./assets/images/trash-solid.svg" alt="trash" />
                        Delete
          </div>
                </div>
                <div className="main-area">
                    <div className="title-area">
                        <div className="search-box">
                            <input className="search" placeholder="キーワードを入力" />
                            <img className="search-icon" src="./assets/images/search-solid.svg" alt="search-icon" />
                        </div>
                        <div className="title-head">
                            <span>Title</span> <img src="./assets/images/sort-amount-up-alt-solid.svg" alt="sort-amount-up-alt-solid" />
                        </div>
                        <div className="memo-list">
                            <div className="memo-item active clip">
                                <p className="memo-item__title">Memo Title</p>
                                <div className="memo-item__info">
                                    <p className="memo-item__info--clock">
                                        <img src="./assets/images/clock-regular.svg" alt="clock" />
                                        <span>2020/01/07</span>
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
                            <div className="memo-item ">
                                <p className="memo-item__title">Memo Title</p>
                                <div className="memo-item__info">
                                    <p className="memo-item__info--clock">
                                        <img src="./assets/images/clock-regular.svg" alt="clock" />
                                        <span>2020/01/07</span>
                                    </p>
                                    <p className="memo-item__info--cate">
                                        <img width="12px" className="tag-item-icon" src="./assets/images/tags-solid-dark.svg" alt="tags" />
                                        <span>Category 01</span>
                                    </p>
                                </div>
                                <div className="clip-memo-item">
                                    <img src="./assets/images/paperclip-solid-i.svg" alt="clip" />
                                </div>
                                <div>
                                </div>
                            </div>
                            <div className="memo-item">
                                <p className="memo-item__title">Memo Title</p>
                                <div className="memo-item__info">
                                    <p className="memo-item__info--clock">
                                        <img src="./assets/images/clock-regular.svg" alt="clock" />
                                        <span>2020/01/07</span>
                                    </p>
                                    <p className="memo-item__info--cate">
                                        <img width="12px" className="tag-item-icon" src="./assets/images/tags-solid-dark.svg" alt="tags" />
                                        <span>Category 01</span>
                                    </p>
                                </div>
                                <div className="clip-memo-item">
                                    <img src="./assets/images/paperclip-solid-i.svg" alt="clip" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="memo-area">
                        <div className="tools-bar">
                            <div className="tools3">
                                <div className="tools-bar__item edit">
                                    <img src="./assets/images/pen-solid.svg" alt="pen" />
                                    Edit
                </div>
                                <div className="tools-bar__item save">
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
                                    2020/10/20
                </span>
                                <span className="cate">
                                    <img src="./assets/images/tags-solid-2.svg" alt="tag" />
                                    Category
                </span>
                            </div>
                            <div className="memo-detail--title">
                                <input defaultValue="Hello World !" />
                            </div>
                            <div className="note">
                                <textarea className="note-tool" defaultValue={""} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
