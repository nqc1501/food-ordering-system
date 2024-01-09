package com.example.productservice.controller;

import com.example.productservice.dto.ProductDto;
import com.example.productservice.dto.req.QuantityRequest;
import com.example.productservice.model.Product;
import com.example.productservice.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/post-product")
    public ResponseEntity<?> createProduct(@ModelAttribute ProductDto productDto) {
        if (productService.createProduct(productDto) == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Product already exists.");
        }
        return ResponseEntity.ok("");
    }

    @GetMapping("/get-products")
    public ResponseEntity<?> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/get-product/{code}")
    public ResponseEntity<?> getProductByProductCode(@PathVariable String code) {
        return ResponseEntity.ok(productService.getProductByProCode(code));
    }

    @GetMapping("/get-product-by-type/{type}")
    public ResponseEntity<?> getProductByType(@PathVariable String type) {
        return ResponseEntity.ok(productService.getProductByType(type));
    }

    @PutMapping("/put-product")
    public ResponseEntity<?> updateProduct(@ModelAttribute ProductDto productDto) {
        productService.updateProduct(productDto);
        return ResponseEntity.ok("");
    }

    @PutMapping("/update-quantity")
    public ResponseEntity<?> updateQuantity(@RequestBody QuantityRequest request) {
        productService.updateQuantity(request);
        return ResponseEntity.ok("ok");
    }

    @DeleteMapping("/delete-product/{code}")
    public ResponseEntity<?> deleteProduct(@PathVariable String code) {
        ProductDto productDto = productService.getProductByProCode(code);
        if (productDto == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't find this product.");
        }
        productService.deleteProduct(productDto);
        return ResponseEntity.ok("");
    }

}
