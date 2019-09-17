// ======================================
// Require Packages
// ======================================
import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import { Form } from 'react-bootstrap';

// ======================================
// Require CSS
// ======================================
import 'react-datepicker/dist/react-datepicker.css';
import './appdatepicker.css';

// ======================================
// Define & Export Component
// ======================================
export default class AppDatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date()
        }

        this.handleChange = this.handleChange.bind(this);
        this.changeDate = this.changeDate.bind(this);
    }

    changeDate(date) {
        this.setState({startDate: date}, () => {
                this.props.getDate(this.state.startDate);
            }
        );
    }

    handleChange(date) {
        this.changeDate(date);
    }
    render() {

        return (
            <Fragment>
                <Form.Label>When's this due?</Form.Label>
                <DatePicker selected={this.state.startDate} onChange={date => this.handleChange(date)} />
            </Fragment>
        );
    }
}