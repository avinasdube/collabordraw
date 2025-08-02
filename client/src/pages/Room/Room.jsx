import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './Room.scss';
import roomIcon from '../../assets/icons/room-icon.png';
import Canvas from '../../components/canvas/Canvas';
import { deleteRoom } from '../../reducers/roomSlice';

const Room = () => {
    const dispatch = useDispatch();
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

    const handleRoomDelete = (roomName) => {
        dispatch(deleteRoom(roomName))
        navigate('/home');
    }

    return (
        <div className="room-container">
            <div className="room-left">
                <div className="room-heading">
                    <img className='room-icon' src={roomIcon} alt=''></img>
                    <div className='room-title'>{roomName}</div>
                </div>
                <div className="room-middle"></div>
                <div className="room-bottom">
                    <button onClick={handleRoomDelete}>Close Room</button>
                </div>
            </div>
            <div className="room-body">
                <Canvas />
            </div>
        </div>
    )
}

export default Room;