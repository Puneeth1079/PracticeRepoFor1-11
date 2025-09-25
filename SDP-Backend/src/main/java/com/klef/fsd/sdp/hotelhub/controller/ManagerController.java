package com.klef.fsd.sdp.hotelhub.controller;

import com.klef.fsd.sdp.hotelhub.model.Booking;
import com.klef.fsd.sdp.hotelhub.model.Manager;
import com.klef.fsd.sdp.hotelhub.model.Room;
import com.klef.fsd.sdp.hotelhub.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/hotelapi/manager")
@CrossOrigin("*")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    @PostMapping("/checkmanagerlogin")
    public ResponseEntity<?> checkManagerLogin(@RequestBody Manager manager) {
        Manager m = managerService.checkManagerLogin(manager.getUsername(), manager.getPassword());
        if (m != null) {
            return ResponseEntity.ok(m);
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/addroom")
    public String addRoom(@RequestBody Room room) {
        return managerService.addRoom(room);
    }

    @PostMapping("/updateroom")
    public String updateRoom(@RequestBody Room room) {
        return managerService.updateRoom(room);
    }

    @DeleteMapping("/deleteroom/{id}")
    public String deleteRoom(@PathVariable int id) {
        return managerService.deleteRoom(id);
    }
    
    @GetMapping("/viewmyrooms/{managerId}")
    public List<Room> viewMyRooms(@PathVariable int managerId) {
        return managerService.viewAllRoomsByManager(managerId);
    }

    @GetMapping("/viewbookings/{managerId}")
    public List<Booking> viewBookings(@PathVariable int managerId) {
        return managerService.viewBookingsForManager(managerId);
    }
}