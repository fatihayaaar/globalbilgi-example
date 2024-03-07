package com.globalbilgi.fatihayar.example.service.abstracts;

import com.globalbilgi.fatihayar.example.dto.BaseDto;
import com.globalbilgi.fatihayar.example.dto.UserDto;

import java.util.List;

public interface IUserService<T extends BaseDto> extends IBaseService<T> {

    List<T> getAllUsers();
}
