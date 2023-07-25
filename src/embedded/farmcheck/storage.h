#ifndef _STORAGE_H_
#define _STORAGE_H_

#include <EEPROM.h>

namespace Memory {
  class Storage {
    String token;
    const int EEPROMSIZE = 37;
  public:
    Storage() {
      EEPROM.begin(EEPROMSIZE);
    }

    void write(const String& strToWrite) {
      int offset = 0;

      byte length = strToWrite.length();
      EEPROM.write(offset, length);
      for (int i = 0; i < length; i++) {
        EEPROM.write(offset + 1 + i, strToWrite[i]);
      }
      EEPROM.commit();
    }
    
    void read() {
      int offset = 0;

      int length = EEPROM.read(offset);
      char data[length + 1];
      for (int i = 0; i < length; i++) {
        data[i] = EEPROM.read(offset + 1 + i);
      }
      data[length] = '\0';

      token = String(data);
    }

    String getToken() {
      return token;
    }

    void setToken(String token) {
      this->token = token;
    }
  };
}

#endif