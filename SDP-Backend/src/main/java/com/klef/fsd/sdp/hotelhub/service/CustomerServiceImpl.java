package com.klef.fsd.sdp.hotelhub.service;

import com.klef.fsd.sdp.hotelhub.model.Booking;
import com.klef.fsd.sdp.hotelhub.model.Customer;
import com.klef.fsd.sdp.hotelhub.model.Room;
import com.klef.fsd.sdp.hotelhub.repository.BookingRepository;
import com.klef.fsd.sdp.hotelhub.repository.CustomerRepository;
import com.klef.fsd.sdp.hotelhub.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    // 👇 YOU ARE MISSING THIS PART
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Customer checkCustomerLogin(String username, String password) {
        return customerRepository.findByUsernameAndPassword(username, password);
    }
    
    @Override
    public Customer registerCustomer(Customer customer) {
        return customerRepository.save(customer);
    }
    
    @Override
    @Transactional
    public Booking bookRoom(Booking booking) {
        Booking savedBooking = bookingRepository.save(booking);
        if (savedBooking.getRoom() != null) {
            roomRepository.updateRoomAvailability(false, savedBooking.getRoom().getId());
        }
        return savedBooking;
    }
    
    @Override
    public Booking updateBooking(Booking booking) {
        return bookingRepository.save(booking);
    }
    
    @Override
    public List<Booking> viewMyBookings(int customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }
    
    @Override
    public List<Room> viewAllAvailableRooms() {
        return roomRepository.findByAvailableTrue();
    }
    
    @Override
    @Transactional
    public Customer updateProfile(Customer customer) {
        Customer existingCustomer = customerRepository.findById(customer.getId()).orElse(null);
        if (existingCustomer != null) {
            existingCustomer.setName(customer.getName());
            existingCustomer.setDob(customer.getDob());
            existingCustomer.setAddress(customer.getAddress());
            existingCustomer.setContact(customer.getContact());
            return customerRepository.save(existingCustomer);
        }
        return null;
    }
}