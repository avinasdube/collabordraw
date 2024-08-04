import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './Room.scss';
import roomIcon from '../../assets/icons/room-icon.png';
import Canvas from '../../components/Canvas/Canvas';

const Room = () => {
    const roomName = useParams().roomName;
    const currentUser = useSelector(state => state.auth.currentUser);
    const activeRooms = useSelector((state) => state.rooms.activeRooms);
    const navigate = useNavigate();

    const currentRoom = activeRooms.filter(room => room === roomName);

    useEffect(() => {
        if (currentRoom.length === 0) {
            navigate('/home');
        }
    }, [currentRoom, navigate])

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