import React, { useState } from 'react';
import Modal from '../../ui/Modal';
import './CreateRoom.scss';
import socket from '../../socket';

const CreateRoom = ({ onClose }) => {
    const [roomName, setRoomName] = useState('');

    const handleCreateRoom = (e) => {
        e.preventDefault();

        if (roomName) {
            roomName.trim()
            socket.emit('createRoom', { roomName });
            setRoomName('');
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
                        X
                    </button>
                </form>
            </div>
        </Modal>
    )
}

export default CreateRoom;