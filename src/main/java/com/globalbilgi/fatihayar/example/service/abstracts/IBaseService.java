package com.globalbilgi.fatihayar.example.service.abstracts;

import com.globalbilgi.fatihayar.example.dto.BaseDto;

public interface IBaseService<T extends BaseDto> {

    void add(T entity);

    void delete(long id);

    void update(T entity);
}
