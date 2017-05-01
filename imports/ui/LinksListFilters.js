import React from 'react';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

export default class LinksListFilters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showVisible: true
        }
    }

    componentDidMount() {
        this.tracker = Tracker.autorun(() => {
            const showVisible = Session.get('showVisible');
            this.setState({showVisible});
        });
    }

    componentWillUnmount() {
        this.tracker.stop();
    }

    render() {
        return (
            <div>
                <label className="checkbox">
                    <input type="checkbox"
                           className="checkbox__box"
                           checked={!this.state.showVisible}
                           onChange={(e) => Session.set('showVisible', !e.target.checked)}/>
                    show hidden links
                </label>
            </div>
        );
    }
}