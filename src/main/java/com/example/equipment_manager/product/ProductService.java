package com.example.equipment_manager.product;

import com.example.equipment_manager.reservation.Reservation;
import com.example.equipment_manager.reservation.ReservationRepo;
import com.example.equipment_manager.reservation.ReservationState;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Service
@AllArgsConstructor
public class ProductService {

    private ProductRepo productRepo;
    private ReservationRepo reservationRepo;


    public ResponseEntity<String> saveProduct(String name, Category categ, String desc, MultipartFile file, String productId) throws IOException {

        String uniqueFileName;
        if (!file.isEmpty()) {
            uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            File dest = new File("C:/Users/Electro Ragragui/Downloads/inptprjt-master/public/product_images/" + uniqueFileName);
            file.transferTo(dest);
        }else return ResponseEntity.badRequest().body("file could't be processed");

        Product product;
        if(productId.equals("-1"))
            product = new Product(name, categ, uniqueFileName, desc, LocalDateTime.now());
        else {
            product = productRepo.findById(Integer.parseInt(productId)).orElseThrow();
            product.setName(name);
            product.setCategory(categ);
            product.setDescription(desc);
            product.setImagePath(uniqueFileName);
        }
        productRepo.save(product);
        return ResponseEntity.ok().body("saved successfully");
    }

    public ResponseEntity<String> removeProduct(Integer productId){

        productRepo.deleteById(productId);
        return ResponseEntity.ok().body("product removed successfully");
    }

    public ResponseEntity<Map<String, String>> getProductInfo(Integer productId){

        Product product = productRepo.findById(productId).orElseThrow();
        Map<String, String> mp = new HashMap<>();
        mp.put("name", product.getName());
        mp.put("category", product.getCategory().toString());
        mp.put("imagePath", product.getImagePath());
        mp.put("description", product.getDescription());
        return ResponseEntity.ok().body(mp);
    }

    public ResponseEntity<List<Product>> getProducts(String category, String searchTerm) {

        if(category.equals("Tout"))
            return ResponseEntity.ok().body(productRepo.searchProducts(searchTerm));
        Category categ = Category.valueOf(category.toUpperCase());
        return ResponseEntity.ok().body(productRepo.getFilteredProducts(categ, searchTerm));
    }

    public ResponseEntity<ProductResponse> availableAt(Integer ProductId) {

        Product product = productRepo.findById(ProductId).orElseThrow();
        ProductResponse response = new ProductResponse();
        response.setName(product.getName());
        response.setCategory(product.getCategory());
        response.setImagePath(product.getImagePath());
        response.setDescription(product.getDescription());
        List<Reservation> reservations = reservationRepo.getReservations(ReservationState.CONFIRMED, ProductId);
        if (reservations.size() != 0) {
            LocalDateTime end = reservations.get(0).getEndsAt();
            if (end.isAfter(LocalDateTime.now()))
                response.setMessage("disponible le " + end.format(DateTimeFormatter.ofPattern("dd-MM")) + " a " + end.format(DateTimeFormatter.ofPattern("HH:mm")));
            else
                response.setMessage("disponible maintenant");
        } else
            response.setMessage("disponible maintenant");
        return ResponseEntity.ok().body(response);
    }
}