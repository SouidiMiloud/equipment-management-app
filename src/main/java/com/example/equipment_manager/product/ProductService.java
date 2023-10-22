package com.example.equipment_manager.product;

import com.example.equipment_manager.reservation.ReservationRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;


@Service
@AllArgsConstructor
public class ProductService {

    private ProductRepo productRepo;
    private ReservationRepo reservationRepo;
    private ItemRepo itemRepo;


    public ResponseEntity<String> saveProduct(String name, Category categ, String desc, Integer stock, MultipartFile file, String productId) throws IOException {

        String uniqueFileName;
        if (!file.isEmpty()) {
            uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            File dest = new File("C:/Users/Electro Ragragui/Downloads/inptprjt-master/public/product_images/" + uniqueFileName);
            file.transferTo(dest);
        }else return ResponseEntity.badRequest().body("file could't be processed");

        Product product;
        if(productId.equals("-1")) {
            product = new Product(name, categ, uniqueFileName, desc, stock);
            productRepo.save(product);
            List<Item> items = new ArrayList<>();
            System.out.println(product.getId() + "-----------------------");
            for(int i=0; i != stock; i++) items.add(new Item(product));
            product.setItems(items);
        }
        else {
            product = productRepo.findById(Integer.parseInt(productId)).orElseThrow();
            product.setName(name);
            product.setCategory(categ);
            product.setDescription(desc);
            product.setStock(stock);
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
        mp.put("stock", product.getStock().toString());
        return ResponseEntity.ok().body(mp);
    }

    public ResponseEntity<List<Product>> getProducts(String category, String searchTerm) {

        List<Product> products;
        if(category.equals("Tout"))
            products = productRepo.searchProducts(searchTerm);
        else{
            Category categ = Category.valueOf(category.toUpperCase());
            products = productRepo.getFilteredProducts(categ, searchTerm);
        }
        for(Product product : products){
            List<Item> items = itemRepo.findAllByProduct(product);
            int availableItems = 0;
            for(Item item : items)
                if(item.getAvailableAt().isBefore(LocalDateTime.now()))
                    availableItems++;
            product.setAvailableItems(availableItems);
            productRepo.save(product);
        }
        return ResponseEntity.ok().body(products);
    }

    public ResponseEntity<ProductResponse> productInfo(Integer ProductId) {

        Product product = productRepo.findById(ProductId).orElseThrow();
        ProductResponse response = new ProductResponse();
        response.setName(product.getName());
        response.setCategory(product.getCategory());
        response.setImagePath(product.getImagePath());
        response.setDescription(product.getDescription());
        response.setMessage(product.getAvailableItems() + "/" + product.getStock() + " disponibles");
        return ResponseEntity.ok().body(response);
    }
}