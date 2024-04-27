import {Component, Input} from '@angular/core';
import {RouterModule} from "@angular/router";
import {User} from "../../models/user";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() users: User[] = [];

}
