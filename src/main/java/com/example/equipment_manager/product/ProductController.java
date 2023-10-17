package com.example.equipment_manager.product;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;


@RestController
@AllArgsConstructor
@RequestMapping("/product")
public class ProductController {

    private ProductService productService;


    @GetMapping("/getProductInfo")
    public ResponseEntity<Map<String, String>> getProductInfo(@RequestParam String productId){

        return productService.getProductInfo(Integer.parseInt(productId));
    }

    @PostMapping("/addProduct")
    public ResponseEntity<String> newProduct(@RequestParam("file") MultipartFile file, @RequestParam("name") String name, @RequestParam("description") String desc,
                                               @RequestParam("category") Category categ, @RequestParam("productId") String productId) throws IOException {

        return productService.saveProduct(name, categ, desc, file, productId);
    }

    @PostMapping("/removeProduct")
    public ResponseEntity<String> removeProduct(@RequestBody Map<String, Integer> request){

        return productService.removeProduct(request.get("id"));
    }

    @GetMapping("/getProducts")
    public ResponseEntity<List<Product>> getProducts(@RequestParam String category, @RequestParam String searchTerm){

        return productService.getProducts(category, searchTerm);
    }

    @GetMapping("/details")
    public ResponseEntity<ProductResponse> details(@RequestParam Integer id){

        return productService.availableAt(id);
    }
}