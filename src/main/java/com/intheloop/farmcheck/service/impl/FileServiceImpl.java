package com.intheloop.farmcheck.service.impl;

import com.intheloop.farmcheck.service.FileService;
import org.springframework.stereotype.Service;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public String upload(String fileName, byte[] fileContent) {

        return null;
    }

    @Override
    public byte[] getContent(String fileName) {
        return new byte[0];
    }

    @Override
    public byte[] download(String fileName) {
        return new byte[0];
    }

    @Override
    public void delete(String fileName) {

    }
}
