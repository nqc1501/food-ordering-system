package com.example.productservice.controller;

import com.example.productservice.dto.ProductDto;
import com.example.productservice.dto.req.ProductRequest;
import com.example.productservice.model.Product;
import com.example.productservice.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

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

    @PutMapping("/put-product")
    public ResponseEntity<?> updateProduct(@ModelAttribute ProductDto productDto) {
        Product product = productService.getProductByProCode(productDto.getProductCode());
        if (product == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't find this product.");
        }
        productService.saveProduct(product);
        return ResponseEntity.ok("");
    }

    @DeleteMapping("/delete-product/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't find this product.");
        }
        productService.deleteProduct(product);
        return ResponseEntity.ok("");
    }

}
