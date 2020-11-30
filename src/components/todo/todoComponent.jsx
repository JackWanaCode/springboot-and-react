import React, { Component } from 'react';
import moment from 'moment';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';



class TodoComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 1,
            description: 'Learn Forms',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()

        if (this.state.id === -1) {
            TodoDataService.createTodo(username, {
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate
            }).then(
                () => {
                    this.props.history.push('/todos')
                }
            )
        } else {
            TodoDataService.updateTodo(username, this.state.id, {
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate
            }).then(
                () => {
                    this.props.history.push('/todos')
                }
            )
        }
        console.log(values)
    }

    validate(values) {
        let error = {}
        if (!values.description) {
            error.description = 'Enter a description'
        } else if (values.description.length < 5) {
            error.description = "Enter at least 5 characters in description"
        }
        if (!moment(values.targetDate).isValid()) {
            error.targetDate = 'Enter a valid Target Date'
        }

        return error
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
    }

    render() {
        let description = this.state.description
        let targetDate = this.state.targetDate
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{
                            description: description,
                            targetDate: targetDate
                        }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-group" type="text" name="description" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-group" type="date" name="targetDate" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default TodoComponent

