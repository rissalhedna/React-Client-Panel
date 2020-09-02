import React, { Component } from 'react'
import Sidebar from '../layout/Sidebar'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import Spinner from '../layout/spinner'



class editClient extends Component {
    constructor(props){
        super(props)
        this.firstnameinput = React.createRef()
        this.lastnameinput = React.createRef()
        this.emailinput = React.createRef()
        this.phoneinput = React.createRef()
        this.balanceinput = React.createRef()
    }
    onSubmit = e=>{
        e.preventDefault()
        const {client,firestore,history} = this.props

        //update client
        const updtClient = {
            firstName: this.firstnameinput.current.value,
            lastName: this.lastnameinput.current.value,
            email: this.emailinput.current.value,
            phone: this.phoneinput.current.value,
            balance: this.balanceinput.current.value === ''? 0 : this.balanceinput.current.value
        }
        //update client in firestore

        firestore.update({collection:'clients', doc: client.id}, updtClient)
        .then(history.push('/'))
    }
    render() {
        const {client} = this.props
        const {disableBalanceOnEdit} = this.props.settings

        if(client){
            return (
                <div>
                <div className='row'>
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left"></i>Back To Dashboard
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        Add Client
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="firstName"
                                minLength="2"
                                required
                                ref = {this.firstnameinput}
                                defaultValue = {client.firstName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="lastName"
                                minLength="2"
                                required
                                ref={this.lastnameinput}
                                defaultValue = {client.lastName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="email"
                                ref = {this.emailinput}
                                defaultValue = {client.email}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="phone"
                                minLength="10"
                                required
                                ref = {this.phoneinput}
                                defaultValue = {client.phone}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="balance">Balance</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="balance"
                                disabled ={disableBalanceOnEdit}
                                ref = {this.balanceinput}                                defaultValue = {client.balance}
                                />
                            </div>
                            <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
                        </form>
                    </div>
                </div>
            </div>
            )
        }else{
            return <Spinner/>
        }
        
    }
}

editClient.propTypes={
    firestore: PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props => [
        {collection: 'clients', storeAs:'client', doc:props.match.params.id}
    ]),
    connect(({firestore:{ordered},settings},props)=>({
        client: ordered.client && ordered.client[0],
        settings
    }))
)(editClient)
