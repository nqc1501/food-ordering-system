package com.example.productservice.service.impl;

import com.example.productservice.dto.ProductDto;
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
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public ProductDto createProduct(ProductDto productDto) {
        if (productRepository.findByProductCode(productDto.getProductCode()).isEmpty()) {
            Product product = Product.builder()
                    .name(productDto.getName())
                    .productCode(productDto.getProductCode())
                    .image(productDto.getImage())
                    .price(productDto.getPrice())
                    .quantity(productDto.getQuantity())
                    .description(productDto.getDescription())
                    .build();
            return mapToProductDto(productRepository.save(product));
        }
        return null;
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow();
    }

    @Override
    public void deleteProduct(Product product) {;
        productRepository.delete(product);
    }

    @Override
    public ProductDto updateProduct(ProductDto productDto) {
        Product product = productRepository.findByProductCode(productDto.getProductCode()).orElseThrow();
        product.setName(productDto.getName());
        product.setImage(productDto.getImage());
        product.setPrice(productDto.getPrice());
        product.setQuantity(product.getQuantity());
        product.setDescription(product.getDescription());
        return mapToProductDto(productRepository.save(product));
    }

    @Override
    public Product getProductByProCode(String productCode) {
        return productRepository.findByProductCode(productCode).orElseThrow();
    }

    @Override
    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    private ProductDto mapToProductDto(Product product) {
        return ProductDto.builder()
                .name(product.getName())
                .productCode(product.getProductCode())
                .image(product.getImage())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .description(product.getDescription())
                .build();
    }

}
