package com.example.productservice.service;

import com.example.productservice.dto.ProductDto;
import com.example.productservice.dto.req.ProductRequest;
import com.example.productservice.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {

    List<Product> getAllProducts();

    ProductDto createProduct(ProductDto productDto);

    Product getProductById(Long id);

    void deleteProduct(Product product);

    ProductDto updateProduct(ProductDto productDto);

    Product getProductByProCode(String productCode);

    void saveProduct(Product product);
}
