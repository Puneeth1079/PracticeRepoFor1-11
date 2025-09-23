package com.klef.fsd.sdp.hotelhub.service;

import com.klef.fsd.sdp.hotelhub.model.Booking;
import com.klef.fsd.sdp.hotelhub.model.Manager;
import com.klef.fsd.sdp.hotelhub.model.Room;
import java.util.List;

public interface ManagerService {
    Manager checkManagerLogin(String username, String password);
    String addRoom(Room room);
    String updateRoom(Room room);
    String deleteRoom(int roomId);
    List<Room> viewAllRoomsByManager(int managerId);
    List<Booking> viewBookingsForManager(int managerId);
    Room getRoomById(int roomId);
}