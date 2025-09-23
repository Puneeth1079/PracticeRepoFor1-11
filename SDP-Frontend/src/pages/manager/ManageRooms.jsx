import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function ManageRooms() {
    const [rooms, setRooms] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    // 👇 CHANGE HERE
    const [currentRoom, setCurrentRoom] = useState({ id: null, roomNumber: '', type: '', pricePerNight: '', available: true });
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchRooms();
        }
    }, [user]);

    const fetchRooms = async () => {
        const response = await api.get(`/manager/viewmyrooms/${user.id}`);
        setRooms(response.data);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        // 👇 CHANGE HERE
        setCurrentRoom({ ...currentRoom, [name]: name === 'available' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const roomData = { ...currentRoom, manager: { id: user.id } };

        if (isEditing) {
            await api.post('/manager/updateroom', roomData);
            alert("Room updated successfully!");
        } else {
            await api.post('/manager/addroom', roomData);
            alert("Room added successfully!");
        }
        resetForm();
        fetchRooms();
    };

    const handleEdit = (room) => {
        setIsEditing(true);
        setCurrentRoom(room);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            await api.delete(`/manager/deleteroom/${id}`);
            alert("Room deleted successfully!");
            fetchRooms();
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setIsEditing(false);
        // 👇 CHANGE HERE
        setCurrentRoom({ id: null, roomNumber: '', type: '', pricePerNight: '', available: true });
    };

    return (
        <div className="management-container">
            <h1>Manage Hotel Rooms</h1>
            <button onClick={() => { setShowForm(!showForm); if (isEditing) resetForm(); }} className="add-button">
                {showForm && !isEditing ? 'Cancel' : 'Add New Room'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="add-form">
                    <h3>{isEditing ? 'Edit Room' : 'Add New Room'}</h3>
                    <input type="text" name="roomNumber" value={currentRoom.roomNumber} onChange={handleInputChange} placeholder="Room Number" required />
                    <input type="text" name="type" value={currentRoom.type} onChange={handleInputChange} placeholder="Room Type (e.g., Deluxe)" required />
                    <input type="number" name="pricePerNight" value={currentRoom.pricePerNight} onChange={handleInputChange} placeholder="Price per Night" required />
                    <label className="checkbox-label">
                        {/* 👇 CHANGE NAME ATTRIBUTE HERE */}
                        <input type="checkbox" name="available" checked={currentRoom.available} onChange={handleInputChange} />
                        Available
                    </label>
                    <button type="submit">{isEditing ? 'Update Room' : 'Add Room'}</button>
                    {isEditing && <button type="button" onClick={resetForm} className="cancel-edit-button">Cancel Edit</button>}
                </form>
            )}

            <table className="management-table">
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Type</th>
                        <th>Price/Night</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room.id}>
                            <td>{room.roomNumber}</td>
                            <td>{room.type}</td>
                            <td>${parseFloat(room.pricePerNight).toFixed(2)}</td>
                            <td>
                                {/* 👇 This was already correct and does not need to be changed */}
                                <span className={room.available ? 'status-available' : 'status-unavailable'}>
                                    {room.available ? 'Available' : 'Unavailable'}
                                </span>
                            </td>
                            <td className="action-buttons">
                                <button onClick={() => handleEdit(room)} className="edit-button">Edit</button>
                                <button onClick={() => handleDelete(room.id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}