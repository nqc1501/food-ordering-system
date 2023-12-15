package com.example.productservice.service.impl;

import com.example.productservice.dto.ProductDto;
import com.example.productservice.dto.req.QuantityRequest;
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
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream().map(this::mapToProductDto).toList();
    }

    @Override
    public ProductDto createProduct(ProductDto productDto) {
        if (productRepository.findByProductCode(productDto.getProductCode()).isEmpty()) {
            Product product = Product.builder()
                    .name(productDto.getName())
                    .productCode(productDto.getProductCode())
                    .image(productDto.getImage())
                    .type(productDto.getType())
                    .price(productDto.getPrice())
                    .quantity(productDto.getQuantity())
                    .description(productDto.getDescription())
                    .build();
            return mapToProductDto(productRepository.save(product));
        }
        return null;
    }

    @Override
    public ProductDto getProductById(Long id) {
        Optional<Product> optional = productRepository.findById(id);
        return optional.map(this::mapToProductDto).orElse(null);
    }

    @Override
    public void deleteProduct(ProductDto productDto) {
        Product product = productRepository.findByProductCode(productDto.getProductCode()).orElseThrow();
        productRepository.delete(product);
    }

    @Override
    public ProductDto getProductByProCode(String productCode) {
        Optional<Product> optional = productRepository.findByProductCode(productCode);
        return optional.map(this::mapToProductDto).orElse(null);
    }

    @Override
    public void updateProduct(ProductDto productDto) {
        Product product = productRepository.findByProductCode(productDto.getProductCode()).orElseThrow();
        product.setName(productDto.getName());
        product.setImage(productDto.getImage());
        product.setType(productDto.getType());
        product.setPrice(productDto.getPrice());
        product.setQuantity(productDto.getQuantity());
        product.setDescription(productDto.getDescription());
        productRepository.save(product);
    }

    @Override
    public List<ProductDto> getProductByType(String type) {
        return productRepository.findAllByType(type)
                .stream()
                .map(this::mapToProductDto)
                .toList();
    }

    @Override
    public void updateQuantity(QuantityRequest request) {
        Product product = productRepository.findByProductCode(request.getProductCode()).orElseThrow();
        product.setQuantity(request.getQuantity());
        productRepository.save(product);
    }

    private ProductDto mapToProductDto(Product product) {
        return ProductDto.builder()
                .name(product.getName())
                .productCode(product.getProductCode())
                .image(product.getImage())
                .type(product.getType())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .description(product.getDescription())
                .build();
    }

}
