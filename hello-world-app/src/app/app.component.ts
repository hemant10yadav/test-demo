import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hello-world-app';

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
   /*  try {
      const result = await lastValueFrom(this.apiService.get('/'));
      console.log(result);
    } catch (error) {
      console.log(error);
    } */
  }
}
