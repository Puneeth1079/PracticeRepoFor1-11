package com.klef.fsd.sdp.hotelhub.service;

import com.klef.fsd.sdp.hotelhub.model.Admin;
import com.klef.fsd.sdp.hotelhub.model.Customer;
import com.klef.fsd.sdp.hotelhub.model.Manager;
import java.util.List;

public interface AdminService {
    Admin checkAdminLogin(String username, String password);
    String addManager(Manager manager);
    String deleteManager(int managerId);
    List<Manager> viewAllManagers();
    String addCustomer(Customer customer);
    String deleteCustomer(int customerId);
    List<Customer> viewAllCustomers();
    Manager getManagerById(int managerId);
    Customer getCustomerById(int customerId);
    long getManagersCount();
    long getCustomersCount();
}