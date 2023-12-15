package com.example.orderservice.dto.req;

import com.example.orderservice.dto.OrderItemDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {

    private List<OrderItemDto> orderItemDtoList;
    private Long userId;
}
