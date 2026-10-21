package foodreach.food;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/food-reports")
public class FoodReportController {
    private final FoodReportRepository repository;

    public FoodReportController(FoodReportRepository repository) {
        this.repository = repository;
    }

    public record FoodReportRequest(
        @NotBlank @Size(max=120) String foodName,
        @NotNull @DecimalMin("0.1") @Digits(integer=6, fraction=2) BigDecimal quantityKg,
        @NotBlank @Size(max=60) String providerType,
        @NotNull LocalDateTime pickupDeadline,
        @NotBlank @Size(max=500) String pickupAddress,
        @Size(max=1000) String storageDetails,
        @Size(max=1000) String notes
    ) {}

    @GetMapping
    public List<FoodReport> getReports() {
        return repository.findAllByOrderByIdDesc();
    }

    @PostMapping
    public ResponseEntity<?> createReport(@Valid @RequestBody FoodReportRequest request, HttpSession session) {
        Object userId = session.getAttribute("foodreachUserId");
        Object email = session.getAttribute("foodreachUserEmail");
        // Session user id is set by AuthController; look up email via the authenticated principal.
        var auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (userId == null || auth == null || auth.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Please log in before submitting a food report."));
        }

        FoodReport report = new FoodReport();
        report.setFoodName(request.foodName().trim());
        report.setQuantityKg(request.quantityKg());
        report.setProviderType(request.providerType().trim());
        report.setPickupDeadline(request.pickupDeadline());
        report.setPickupAddress(request.pickupAddress().trim());
        report.setStorageDetails(request.storageDetails());
        report.setNotes(request.notes());
        report.setProviderEmail(auth.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(report));
    }
}
