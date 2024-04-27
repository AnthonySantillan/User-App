import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [{
      id: 1,
      name: 'Andres',
      lastname: 'Guzman',
      email: 'andres@gmail.com',
      username: 'andres',
      password: '123456'
    },
    {
      id: 2,
      name: 'Josefa',
      lastname: 'Doe',
      email: 'pepa.doe@gmail.com',
      username: 'pepa',
      password: '123456'
    }];

  constructor() { }

  findAll(): Observable<User[]>{
    return of(this.users);
  }
}
