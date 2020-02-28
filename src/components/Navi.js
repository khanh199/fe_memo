import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actSetAuthFalse, actGetCategoriesRequest } from '../actions/index'
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
        return list.map((item,index )=> <div key={index} className="category-item">
            <img src="./assets/images/tags-item.svg" alt="item" />
            <p>{item.name}</p>
            <div className="quantity">
                10
        </div>
        </div>)
    }


    render() {
        if (this.state.redirectPage === true)
            return <Redirect to='/login' />

        let categories = this.props.categories
        console.log(categories);


        return (
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
                        {this._showCategories(categories)}

                        
                        
                        
                    </div>
                    <div className="menu-item ">
                        <img src="./assets/images/paperclip-solid.svg" alt="all" />
                        <span>Clip</span>
                        <div className="quantity">
                            10
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
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi)