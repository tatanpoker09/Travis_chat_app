import React from "react";
import RoomMenuComponent from "./RoomMenuComponent";
import {BACKEND_HOST} from "../App";
import {Form} from "react-bootstrap";


export default class MenuView extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.state = {newRoomName: '', loadingRooms: true, rooms: []};
        this.setCurrentRoomId = props.setCurrentRoomId;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.loadRooms();
    }

    loadRooms() {
        fetch(`${BACKEND_HOST}/rooms`)
            .then(r => r.json())
            .then(r => {
                    this.setState({rooms: r});
                }
            );
    }

    handleChange(event) {
        this.setState({newRoomName: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {roomName: this.state.newRoomName};
        fetch(`${BACKEND_HOST}/rooms/new`,
            {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => {
                this.loadRooms();
            }
        );
        this.setState({newRoomName: ""});
    }


    render() {
        return (
            <div>
                <div>
                    <div className={"container-rounded big-padding"}>
                        <div className={"font-size-17 bold-text"}>
                            <h1>&#128075; Hello, {this.name}!</h1>
                        </div>
                        <div className={"font-size-13 center-text"}>
                            Welcome to Chat App, choose between any of the following chat rooms and join.
                        </div>
                    </div>
                    <div className={"rooms-viewport"}>
		    {
                        this.state.rooms.length > 0 ? this.state.rooms.map((room,i) => {
                            return <div key={i}>
                            <RoomMenuComponent roomData={room}
                                               setCurrentRoomId={this.setCurrentRoomId}/>
                            </div>
                        }) : <h1>Rooms Loading</h1>
                    }
                    </div>
                </div>
                <div className={"footer container-rounded"}>
                    <div className={"float-left"}>
                        <h5>Create a new Chat Room</h5>
                        <p>To create a new chat room type the name here</p>
                    </div>

                    <div className={"form"}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Type the name here..." onChange={this.handleChange} id={"room-name-input"} name={"name"} value={this.state.newRoomName}/>
                        </Form.Group>
                        <input type="submit" value="Submit"/>
                    </Form>
                    </div>
                </div>
                {}
            </div>
        )
    }
}
