import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users: any = [];
  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      this.users = await lastValueFrom(this.apiService.get('/users'));
      console.log(this.users);
    } catch (error) {
      console.log(error);
    }
  }
}
