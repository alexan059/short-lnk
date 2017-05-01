import {Meteor} from 'meteor/meteor';
import React from 'react';
import Modal from 'react-modal';

export default class AddLink extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            url: '',
            isOpen: false,
            error: ''
        };
    }

    onSubmit(event) {
        const {url} = this.state;

        event.preventDefault();

        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.handleModalClose();
            } else {
                this.setState({error: err.reason});
            }
        });
    }

    onChange(event) {
        this.setState({
            url: event.target.value.trim()
        });
    }

    handleModalClose() {
        this.setState({
            isOpen: false,
            url: '',
            error: ''
        });
    }

    render() {
        return (
            <div>
                <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
                <Modal isOpen={this.state.isOpen}
                       onAfterOpen={() => this.refs.url.focus()}
                       onRequestClose={this.handleModalClose.bind(this)}
                       contentLabel="Add Link"
                       className="boxed-view__box"
                       overlayClassName="boxed-view--modal boxed-view">
                    <h1>Add Link</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
                        <input onChange={this.onChange.bind(this)}
                               type="text"
                               ref="url"
                               placeholder="URL"
                               value={this.state.url}/>
                        <button className="button">Add link</button>
                        <button className="button button--secondary"
                                type="button"
                                onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }

}