import React, { useState } from "react";
import './Home.scss';
import CreateRoom from "../../components/CreateRoom/CreateRoom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { useSelector } from 'react-redux';

const Home = () => {

    const currentUser = useSelector((state) => state.auth.currentUser);
    // const status = useSelector((state) => state.auth.status);
    // const error = useSelector((state) => state.auth.error);

    const [roomModal, setRoomModal] = useState(false);

    const openRoomModal = () => {
        setRoomModal(true);
    }

    const handleClose = () => {
        setRoomModal(false);
    }

    return currentUser ? (
        <div className="home-container">
            <div className="message-container">Welcome,  {currentUser?.firstName}!</div>
            <div className="action-container">
                <button>New Canvas</button>
                <button onClick={openRoomModal}>New Room</button>
                {roomModal && <CreateRoom onClose={handleClose} />}
            </div>
        </div>
    ) : <LoadingScreen />
}

export default Home;