package com.example.productservice.service;

import com.example.productservice.dto.ProductDto;
import com.example.productservice.dto.req.QuantityRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {

    List<ProductDto> getAllProducts();

    ProductDto createProduct(ProductDto productDto);

    ProductDto getProductById(Long id);

    void deleteProduct(ProductDto productDto);

    ProductDto getProductByProCode(String productCode);

    void updateProduct(ProductDto productDto);

    List<ProductDto> getProductByType(String type);

    void updateQuantity(QuantityRequest request);
}
