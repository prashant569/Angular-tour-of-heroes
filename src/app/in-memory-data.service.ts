// import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


export class InMemoryDataService implements InMemoryDbService {
  // constructor() { }
  createDb() {
    const heroes = [

      { id: 11, name: 'Mr Nice' },
      { id: 12, name: 'Mr james' },
      { id: 13, name: 'Mr Prashant' },
      { id: 14, name: 'Mr Aadhar' },
      { id: 15, name: 'Mr Caprio' },
      { id: 16, name: 'Mr Bond' },
      { id: 17, name: 'Mr Brook' },
      { id: 18, name: 'Mr Jenny' },
      { id: 19, name: 'Mr Hulk' },
      { id: 20, name: 'Mr Groot' }
    ];

    return { heroes };

  }
  constructor() { 

  }
  
}
