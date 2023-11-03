package com.example.productservice.service;

import com.example.productservice.dto.req.ProductRequest;
import com.example.productservice.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {

    List<ProductRequest> findAllProduct();

    ProductRequest createProduct(ProductRequest productRequest);

    ProductRequest findProductById(Long id);
}
