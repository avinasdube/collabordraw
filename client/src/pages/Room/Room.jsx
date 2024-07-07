import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Room.scss';
import roomIcon from '../../assets/icons/room-icon.png';
import Canvas from '../../components/Canvas/Canvas';

const Room = () => {
    const roomName = useParams().roomName;
    const currentUser = useSelector(state => state.auth.currentUser);

    return (
        <div className="room-container">
            <div className="room-heading">
                <img className='room-icon' src={roomIcon} alt=''></img>
                <div className='room-title'>{roomName}</div>
            </div>
            <div className="room-body">
                <Canvas />
            </div>
        </div>
    )
}

export default Room;