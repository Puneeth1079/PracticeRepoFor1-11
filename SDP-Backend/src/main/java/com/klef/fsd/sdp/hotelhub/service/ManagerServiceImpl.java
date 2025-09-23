package com.klef.fsd.sdp.hotelhub.service;

import com.klef.fsd.sdp.hotelhub.model.Booking;
import com.klef.fsd.sdp.hotelhub.model.Manager;
import com.klef.fsd.sdp.hotelhub.model.Room;
import com.klef.fsd.sdp.hotelhub.repository.BookingRepository;
import com.klef.fsd.sdp.hotelhub.repository.ManagerRepository;
import com.klef.fsd.sdp.hotelhub.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ManagerServiceImpl implements ManagerService {

    @Autowired private ManagerRepository managerRepository;
    @Autowired private RoomRepository roomRepository;
    @Autowired private BookingRepository bookingRepository;

    @Override
    public Manager checkManagerLogin(String username, String password) {
        return managerRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public String addRoom(Room room) {
        roomRepository.save(room);
        return "Room added successfully.";
    }

    @Override
    public String updateRoom(Room room) {
        if(roomRepository.existsById(room.getId())){
            roomRepository.save(room);
            return "Room updated successfully.";
        }
        return "Room not found.";
    }

    @Override
    public String deleteRoom(int roomId) {
        if (roomRepository.existsById(roomId)) {
            roomRepository.deleteById(roomId);
            return "Room deleted successfully.";
        }
        return "Room not found.";
    }

    @Override
    public List<Room> viewAllRoomsByManager(int managerId) {
        return roomRepository.findByManagerId(managerId);
    }

    @Override
    public List<Booking> viewBookingsForManager(int managerId) {
        return bookingRepository.findByManagerId(managerId);
    }
    
    @Override
    public Room getRoomById(int roomId) {
        return roomRepository.findById(roomId).orElse(null);
    }
}