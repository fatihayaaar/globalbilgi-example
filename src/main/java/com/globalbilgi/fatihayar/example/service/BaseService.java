package com.globalbilgi.fatihayar.example.service;

import com.globalbilgi.fatihayar.example.dto.BaseDto;
import com.globalbilgi.fatihayar.example.service.abstracts.IBaseService;

public abstract class BaseService<T extends BaseDto> implements IBaseService<T> {
}
