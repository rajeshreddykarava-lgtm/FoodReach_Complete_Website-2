package foodreach.food;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "food_reports")
public class FoodReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String foodName;

    @Column(nullable = false, precision = 8, scale = 2)
    private BigDecimal quantityKg;

    @Column(nullable = false, length = 60)
    private String providerType;

    @Column(nullable = false)
    private LocalDateTime pickupDeadline;

    @Column(nullable = false, length = 500)
    private String pickupAddress;

    @Column(length = 1000)
    private String storageDetails;

    @Column(length = 1000)
    private String notes;

    @Column(nullable = false, length = 160)
    private String providerEmail;

    public Long getId() { return id; }
    public String getFoodName() { return foodName; }
    public void setFoodName(String foodName) { this.foodName = foodName; }
    public BigDecimal getQuantityKg() { return quantityKg; }
    public void setQuantityKg(BigDecimal quantityKg) { this.quantityKg = quantityKg; }
    public String getProviderType() { return providerType; }
    public void setProviderType(String providerType) { this.providerType = providerType; }
    public LocalDateTime getPickupDeadline() { return pickupDeadline; }
    public void setPickupDeadline(LocalDateTime pickupDeadline) { this.pickupDeadline = pickupDeadline; }
    public String getPickupAddress() { return pickupAddress; }
    public void setPickupAddress(String pickupAddress) { this.pickupAddress = pickupAddress; }
    public String getStorageDetails() { return storageDetails; }
    public void setStorageDetails(String storageDetails) { this.storageDetails = storageDetails; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getProviderEmail() { return providerEmail; }
    public void setProviderEmail(String providerEmail) { this.providerEmail = providerEmail; }
}
