import React, { useState } from "react";
import './Home.scss';
import CreateRoom from "../../components/CreateRoom/CreateRoom";
import { useSelector } from "react-redux";

const Home = () => {

    const [roomModal, setRoomModal] = useState(false);
    const currentUser = useSelector((state) => state.auth.currentUser);

    const openRoomModal = () => {
        setRoomModal(true);
    }

    const handleClose = () => {
        setRoomModal(false);
    }

    return (
        <div className="home-container">
            <div className="message-container">Welcome, {currentUser.firstName} !</div>
            <div className="action-container">
                <button>New Canvas</button>
                <button onClick={openRoomModal}>New Room</button>
                {roomModal && <CreateRoom onClose={handleClose} />}
            </div>
        </div>
    )
}

export default Home;