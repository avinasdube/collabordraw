import { useEffect, useState } from 'react';
import Modal from '../../ui/Modal';
import './CreateRoom.scss';
import closeIcon from '../../assets/icons/close.png';
import { useNavigate } from 'react-router-dom';
import socket from '../../utils/socket.js';
import { useDispatch } from 'react-redux';
import { createRoom } from '../../reducers/roomSlice.js';

const CreateRoom = ({ onClose }) => {
    const [roomName, setRoomName] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCreateRoom = (e) => {
        e.preventDefault();

        if (roomName) {
            roomName.trim()
            socket.emit('createRoom', { roomName });
            dispatch(createRoom(roomName))
            setRoomName('');
            navigate(`/room/${roomName}`)
        } else {
            console.log("Error creating room !");
        }
    }

    const handleClose = () => {
        onClose && onClose();
    }

    return (
        <Modal onClose={onClose}>
            <div className='create-room-container'>
                <form>
                    <input type='text' placeholder='Enter room name' value={roomName} onChange={(e) => setRoomName(e.target.value.trim())}></input>
                    <button onClick={handleCreateRoom}>Create Room</button>
                    <button className="close-btn" onClick={handleClose}>
                        <img className="close-btn-img" src={closeIcon} alt=""></img>
                    </button>
                </form>
            </div>
        </Modal>
    )
}

export default CreateRoom;