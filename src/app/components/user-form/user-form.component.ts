import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {User} from "../../models/user";
import {SharingDataService} from "../../services/sharing-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{

  user: User;


  constructor(
    private sharingDataService: SharingDataService,
    private route: ActivatedRoute
  ) {
    this.user = new User();
  }

  onSubmit(userForm: NgForm): void {
    if(userForm.valid){
      this.sharingDataService.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }

  onClear(userForm: NgForm): void {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }

  ngOnInit(): void {
    this.sharingDataService.selectUserEventEmitter.subscribe(user => this.user = user);

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.sharingDataService.findUserByIdEventEmitter.emit(id);
      }
    });
  }
}
