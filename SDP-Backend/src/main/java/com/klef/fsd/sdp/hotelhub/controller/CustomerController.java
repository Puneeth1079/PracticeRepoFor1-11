package com.klef.fsd.sdp.hotelhub.controller;

import com.klef.fsd.sdp.hotelhub.model.Booking;
import com.klef.fsd.sdp.hotelhub.model.Customer;
import com.klef.fsd.sdp.hotelhub.model.Room;
import com.klef.fsd.sdp.hotelhub.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/hotelapi/customer")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // 👇 THIS METHOD IS NOW MORE ROBUST TO FIX THE REGISTRATION BUG
    @PostMapping("/register")
    public ResponseEntity<String> registerCustomer(@RequestBody Customer customer) {
        try {
            customerService.registerCustomer(customer);
            return ResponseEntity.ok("Customer registered successfully!");
        } catch (DataIntegrityViolationException e) {
            // This catches errors for duplicate username/email
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username or Email already exists.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during registration.");
        }
    }

    @PostMapping("/checkcustomerlogin")
    public ResponseEntity<?> checkCustomerLogin(@RequestBody Customer customer) {
        Customer c = customerService.checkCustomerLogin(customer.getUsername(), customer.getPassword());
        if (c != null) {
            return ResponseEntity.ok(c);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        }
    }
    
    // 👇 ADD THIS NEW ENDPOINT FOR PROFILE UPDATES
    @PostMapping("/profile/update")
    public ResponseEntity<Customer> updateProfile(@RequestBody Customer customer) {
        Customer updatedCustomer = customerService.updateProfile(customer);
        if (updatedCustomer != null) {
            return ResponseEntity.ok(updatedCustomer);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // ... (other endpoints for booking, viewing rooms, etc. remain the same)
    @PostMapping("/bookroom")
    public Booking bookRoom(@RequestBody Booking booking){ return customerService.bookRoom(booking); }
    @PostMapping("/updatebooking")
    public Booking updateBooking(@RequestBody Booking booking){ return customerService.updateBooking(booking); }
    @GetMapping("/viewmybookings/{customerId}")
    public List<Booking> viewMyBookings(@PathVariable int customerId){ return customerService.viewMyBookings(customerId); }
    @GetMapping("/rooms")
    public List<Room> viewAllAvailableRooms() { return customerService.viewAllAvailableRooms(); }
}