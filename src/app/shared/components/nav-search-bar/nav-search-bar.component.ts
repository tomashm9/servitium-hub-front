import { Component, OnInit } from '@angular/core';
import { ServiceType } from '../../../core/enums/service.type';

@Component({
  selector: 'app-nav-search-bar',
  templateUrl: './nav-search-bar.component.html',
  styleUrls: ['./nav-search-bar.component.scss'],
})
export class NavSearchBarComponent implements OnInit {
  locationQuery: string = '';
  selectedServiceType: ServiceType | '' = '';
  selectedSubServiceType: string = '';
  serviceTypes = Object.values(ServiceType);
  subServiceTypes: string[] = [];

  serviceSubtypes: Record<ServiceType, string[]> = {
    [ServiceType.Accommodation]: [
      'Apartment rentals',
      'Hostels and guesthouses',
    ],
    [ServiceType.RestaurantsAndCafes]: [
      'Restaurant table reservations',
      'Catering services',
    ],
    [ServiceType.BeautyAndWellness]: [
      'Hair salons',
      'Barbers',
      'Spas and massages',
      'Manicure and pedicure services',
      'Personal trainers',
    ],
    [ServiceType.EventsAndEntertainment]: [
      'Event venue hire',
      'Photography and videography services',
      'DJ services',
      'Event and party planning',
    ],
    [ServiceType.Transport]: ['Car rentals', 'Private transport services'],
    [ServiceType.OutdoorActivitiesAndSports]: [
      'Tour guides',
      'Adventure activities',
      'Football pitches',
      'Futsal courts',
      'Padel courts',
    ],
    [ServiceType.DomesticServices]: ['Home cleaning', 'Gardening'],
  };

  ngOnInit(): void {
    this.onServiceTypeChange(this.selectedServiceType);
  }

  onServiceTypeChange(type: ServiceType | '') {
    if (type === '' || !this.serviceSubtypes[type]) {
      this.subServiceTypes = Object.values(this.serviceSubtypes).flat();
    } else {
      this.subServiceTypes = this.serviceSubtypes[type];
    }
    this.selectedSubServiceType = '';
  }

  onSearch(): void {
    // Handle search logic here
    console.log('Searching with', {
      location: this.locationQuery,
      serviceType: this.selectedServiceType,
      subServiceType: this.selectedSubServiceType,
    });
  }
}
