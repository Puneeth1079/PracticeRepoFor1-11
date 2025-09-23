package com.klef.fsd.sdp.hotelhub.service;

import com.klef.fsd.sdp.hotelhub.model.Admin;
import com.klef.fsd.sdp.hotelhub.model.Customer;
import com.klef.fsd.sdp.hotelhub.model.Manager;
import com.klef.fsd.sdp.hotelhub.repository.AdminRepository;
import com.klef.fsd.sdp.hotelhub.repository.CustomerRepository;
import com.klef.fsd.sdp.hotelhub.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired private AdminRepository adminRepository;
    @Autowired private ManagerRepository managerRepository;
    @Autowired private CustomerRepository customerRepository;

    @Override
    public Admin checkAdminLogin(String username, String password) {
        return adminRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public String addManager(Manager manager) {
        managerRepository.save(manager);
        return "Manager added successfully.";
    }

    @Override
    public String deleteManager(int managerId) {
        if (managerRepository.existsById(managerId)) {
            managerRepository.deleteById(managerId);
            return "Manager deleted successfully.";
        }
        return "Manager not found.";
    }

    @Override
    public List<Manager> viewAllManagers() {
        return managerRepository.findAll();
    }
    
    @Override
    public String addCustomer(Customer customer) {
        customerRepository.save(customer);
        return "Customer added successfully.";
    }
    
    @Override
    public String deleteCustomer(int customerId) {
        if (customerRepository.existsById(customerId)) {
            customerRepository.deleteById(customerId);
            return "Customer deleted successfully.";
        }
        return "Customer not found.";
    }

    @Override
    public List<Customer> viewAllCustomers() {
        return customerRepository.findAll();
    }
    
    @Override
    public Manager getManagerById(int managerId) {
        return managerRepository.findById(managerId).orElse(null);
    }
    
    @Override
    public Customer getCustomerById(int customerId) {
        return customerRepository.findById(customerId).orElse(null);
    }

    @Override
    public long getManagersCount() {
        return managerRepository.count();
    }

    @Override
    public long getCustomersCount() {
        return customerRepository.count();
    }
}