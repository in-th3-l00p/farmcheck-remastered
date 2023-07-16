package com.intheloop.farmcheck.service;

public interface FileService {
    String upload(String fileName, byte[] fileContent);
    byte[] getContent(String fileName);
    byte[] download(String fileName);
    void delete(String fileName);
}
