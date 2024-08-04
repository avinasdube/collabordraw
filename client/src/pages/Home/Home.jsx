import React, { useEffect, useState } from "react";
import './Home.scss';
import CreateRoom from "../../components/CreateRoom/CreateRoom";
import { useSelector } from "react-redux";
import socket from "../../utils/socket";
import { Link } from "react-router-dom";

const Home = () => {

    const [roomModal, setRoomModal] = useState(false);
    //const [roomsList, setRoomsList] = useState([]);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const activeRooms = useSelector((state) => state.rooms.activeRooms)

    const openRoomModal = () => {
        setRoomModal(true);
    }

    const handleClose = () => {
        setRoomModal(false);
    }

    return (
        <div className="home-container">
            <div className="welcome-section">
                <div className="message-container">Welcome, {currentUser?.firstName} !</div>
                <div className="action-container">
                    <button>New Canvas</button>
                    <button onClick={openRoomModal}>New Room</button>
                    {roomModal && <CreateRoom onClose={handleClose} />}
                </div>
            </div>
            {activeRooms.length !== 0 ?
                <div className="roomlist-container">
                    <div className="roomslist-heading">Active rooms</div>
                    <div className="rooms-list">
                        {activeRooms.map((room, index) => (
                            <Link className="active-room" to={`/room/${room.trim()}`} key={index}>{room}</Link>
                        ))}
                    </div>
                </div> : ''
            }
        </div>
    )
}

export default Home;