package foodreach.food;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodReportRepository extends JpaRepository<FoodReport, Long> {
    List<FoodReport> findAllByOrderByIdDesc();
}
