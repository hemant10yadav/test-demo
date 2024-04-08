import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { debounceTime } from 'rxjs/operators';
import { lastValueFrom, Subject } from 'rxjs';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent implements OnInit {
  formData: any = {};
  suggestions: any = [];
  searchTerm = '';
  searchTerm$ = new Subject();
  selectedLocation: any;
  showSuggestion = true;

  constructor(public router: Router, private apiService: ApiService) {
    this.searchTerm$
      .pipe(debounceTime(600))
      .subscribe(() => this.fetchLocations());
  }
  ngOnInit(): void {
    this.fetchLocations();
  }

  async submitForm() {
    try {
      const data = {
        name: this.formData.name,
        email: this.formData.email,
        place: this.selectedLocation['name'],
        country: this.selectedLocation['countryName'],
        lat: this.selectedLocation['lat'],
        long: this.selectedLocation['lng'],
      };

      this.apiService.post('/user/location', data).subscribe(
        (next) => {
          this.router.navigateByUrl('/home');
          console.log('@@@@@@@@@@, next', next);
        },
        (error) => console.log(error),
        () => {}
      );
      this.router.navigate['home'];
    } catch (error) {
      console.log(error);
    }
  }

  selectLocation(location) {
    this.showSuggestion = false;
    this.selectedLocation = location;
    this.formData.location = `${
      location['name'] + ' ' + location['countryName']
    }`;
  }

  searchLocations(event: any) {
    this.showSuggestion = true;
    this.searchTerm = event.target.value;
    this.searchTerm$.next(this.searchTerm);
  }

  async fetchLocations() {
    if (this.searchTerm) {
      try {
        const result: any = await lastValueFrom(
          this.apiService.getLocations(this.searchTerm)
        );
        if (result?.geonames) {
          this.suggestions = result.geonames;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
