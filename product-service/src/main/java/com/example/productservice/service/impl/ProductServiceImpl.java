package com.example.productservice.service.impl;

import com.example.productservice.dto.req.ProductRequest;
import com.example.productservice.model.Product;
import com.example.productservice.repository.ProductRepository;
import com.example.productservice.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<ProductRequest> findAllProduct() {
        List<Product> productList = productRepository.findAll();
        return productList.stream().map(this::mapToProductRequest).toList();
    }

    @Override
    public ProductRequest createProduct(ProductRequest productRequest) {
        Product product = Product.builder()
                .name(productRequest.getName())
                .price(productRequest.getPrice())
                .description(productRequest.getDescription())
                .build();
        productRepository.save(product);

        return productRequest;
    }

    @Override
    public ProductRequest findProductById(Long id) {
        Optional<Product> optional = productRepository.findById(id);
        return optional.map(this::mapToProductRequest).orElse(null);
    }

    private ProductRequest mapToProductRequest(Product product) {
        return ProductRequest.builder()
                .name(product.getName())
                .price(product.getPrice())
                .description(product.getDescription())
                .build();
    }

}
