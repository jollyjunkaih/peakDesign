#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Raspberry Pi to Arduino I2C Communication
#i2cdetect -y 1
#library
import json
import sys
import smbus2 as smbus#,smbus2
import time
import urllib.request
import requests
import uuid
# Slave Addresses
I2C_SLAVE_ADDRESS = 0x08 #0x0b ou 11
I2C_SLAVE2_ADDRESS = 12
I2C_SLAVE3_ADDRESS = 13

# This function converts a string to an array of bytes.
def ConvertStringsToBytes(src):
  return [ord(b) for b in src]


def main():
  index = 0
  times = [9,10,11,12,13,14,15]
  # Create the I2C bus
  I2Cbus = smbus.SMBus(1)
  cmd = ""
  slaveAddress = I2C_SLAVE_ADDRESS
  BytesToSend = ConvertStringsToBytes(cmd)
  print(f"Sent {slaveAddress} the {cmd} command\n{BytesToSend}")
  I2Cbus.write_i2c_block_data(slaveAddress, 0x00, BytesToSend)
  time.sleep(0.5)
  while True:
    try:
      data = I2Cbus.read_i2c_block_data(slaveAddress, 0x00, 9)
      data = "".join([chr(b) for b in data])
      data1 = {}
      if data[0] == '0' or data[1] == '1':
         print("")
      else:
         continue
      if data[4] != '|':
         continue
      data1['id'] = str(uuid.uuid4())
      data1['officeID'] = 1
      data1['time'] = times[index]
      index += 1
      data1['energyConsumption'] = data[0:4]
      url = 'https://7dndfz6dlc.execute-api.ap-southeast-1.amazonaws.com/items'
      headers = {'Authorization':'....', 'Content-Type': 'application/json'}
      r = requests.request("PUT", url, data = json.dumps(data1), headers=headers)
      data1['officeID'] = 2
      data1['energyConsumption'] = data[5:9]
      print(f"TIME: {data1['time']}")
      print(f"Energy Consumption Office 1 :{data[0:4]}")
      print(f"Energy Consumption Office 2 :{data[5:9]}")
      r1 = requests.request("PUT", url, data = json.dumps(data1), headers = headers)
      #print("status: ", r1)
      #print("content: ", r1.content)
      #print(f"received from slave: {data}")
    except:
      print("remote i/o error")
      time.sleep(0.5)
  return 0

if __name__ == '__main__':
     main()