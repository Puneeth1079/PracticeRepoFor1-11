package com.klef.fsd.sdp.hotelhub.model;

import jakarta.persistence.*;

@Entity
@Table(name = "room_table")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "manager_id", nullable = false)
    private Manager manager;

    @Column(nullable = false)
    private String roomNumber;
    @Column(nullable = false)
    private String type; // e.g., Single, Double, Suite
    @Column(nullable = false)
    private double pricePerNight;

    // 👇 CHANGE THIS LINE
    @Column(nullable = false)
    private boolean available;

    // Getters and Setters (No changes needed here)
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public Manager getManager() { return manager; }
    public void setManager(Manager manager) { this.manager = manager; }
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public double getPricePerNight() { return pricePerNight; }
    public void setPricePerNight(double pricePerNight) { this.pricePerNight = pricePerNight; }
    
    // 👇 This getter correctly becomes 'isAvailable()' for a boolean named 'available'
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
}