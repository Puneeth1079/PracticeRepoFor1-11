package com.klef.fsd.sdp.hotelhub.service;

import com.klef.fsd.sdp.hotelhub.model.Booking;
import com.klef.fsd.sdp.hotelhub.model.Customer;
import com.klef.fsd.sdp.hotelhub.model.Room;
import java.util.List;

public interface CustomerService {
    Customer checkCustomerLogin(String username, String password);
    Customer registerCustomer(Customer customer);
    Booking bookRoom(Booking booking);
    Booking updateBooking(Booking booking);
    List<Booking> viewMyBookings(int customerId);
    List<Room> viewAllAvailableRooms();
    
    // 👇 ADD THIS NEW METHOD
    Customer updateProfile(Customer customer);
}