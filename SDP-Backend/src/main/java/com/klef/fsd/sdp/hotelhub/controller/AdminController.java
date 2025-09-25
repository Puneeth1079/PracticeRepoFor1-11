package com.klef.fsd.sdp.hotelhub.controller;

import com.klef.fsd.sdp.hotelhub.model.Admin;
import com.klef.fsd.sdp.hotelhub.model.Customer;
import com.klef.fsd.sdp.hotelhub.model.Manager;
import com.klef.fsd.sdp.hotelhub.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/hotelapi/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/checkadminlogin")
    public ResponseEntity<?> checkAdminLogin(@RequestBody Admin admin) {
        Admin a = adminService.checkAdminLogin(admin.getUsername(), admin.getPassword());
        if (a != null) {
            return ResponseEntity.ok(a);
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/addmanager")
    public String addManager(@RequestBody Manager manager) {
        return adminService.addManager(manager);
    }

    @DeleteMapping("/deletemanager/{id}")
    public String deleteManager(@PathVariable int id) {
        return adminService.deleteManager(id);
    }

    @GetMapping("/viewallmanagers")
    public List<Manager> viewAllManagers() {
        return adminService.viewAllManagers();
    }
    
    @GetMapping("/viewallcustomers")
    public List<Customer> viewAllCustomers() {
        return adminService.viewAllCustomers();
    }
    
    @DeleteMapping("/deletecustomer/{id}")
    public String deleteCustomer(@PathVariable int id) {
        return adminService.deleteCustomer(id);
    }
    
    @GetMapping("/managerscount")
	public long managersCount() {
		return adminService.getManagersCount();
	}
	
	@GetMapping("/customerscount")
	public long customersCount() {
		return adminService.getCustomersCount();
	}
}