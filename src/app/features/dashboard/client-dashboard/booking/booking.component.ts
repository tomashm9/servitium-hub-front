import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { CompanyService } from '../services/company.service';
import { ServiceService } from '../services/service.service';
import { OpeningHoursService } from '../services/opening-hours.service';
import { formatDate } from '@angular/common';
import { OpeningHours } from '../models/company.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit {
  @ViewChild('stepper') private stepper!: MatStepper;

  company: any = {
    id: 0,
    name: '',
    description: '',
    images: [],
    locations: [],
    openingHours: [],
  };
  selectedService: any;
  selectedDescription: string | null = null;
  services: any[] = [];
  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  availableTimes: string[] = [];
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private serviceService: ServiceService,
    private openingHoursService: OpeningHoursService,
    private reservationService: ReservationService,
    private authService: AuthService,
    protected router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.route.queryParams.subscribe((params) => {
      const companyId = params['companyId'];
      if (companyId) {
        this.companyService.getCompanyById(companyId).subscribe({
          next: (data) => {
            this.company = data;
            console.log('Company data:', this.company);
            this.company.openingHours = this.company.openingHours || [];
            this.fetchServices(companyId);
            if (this.company.locations.length > 0) {
              this.fetchOpeningHours(this.company.locations[0].id);
            }
          },
          error: (error) => {
            console.error('Error fetching company data:', error);
          },
        });
      }
    });
  }

  fetchServices(companyId: number): void {
    this.serviceService.getServicesByCompany(companyId).subscribe({
      next: (data) => {
        console.log('Fetched services:', data);
        this.services = data;
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      },
    });
  }

  fetchOpeningHours(companyLocationId: number): void {
    this.openingHoursService
      .getOpeningHoursByCompanyLocation(companyLocationId)
      .subscribe({
        next: (data) => {
          this.company.openingHours = data;
        },
        error: (error) => {
          console.error('Error fetching opening hours:', error);
        },
      });
  }

  onServiceChange(service: any) {
    this.selectedService = service;
    this.selectedDescription = null;
    this.selectedDate = null;
    this.selectedTime = null;
  }

  onDescriptionChange(description: string) {
    this.selectedDescription = description;
  }

  goToNext() {
    if (this.stepper.selectedIndex === 0) {
      if (!this.selectedService || !this.selectedDescription) {
        alert('Please select a service and description.');
        return;
      }
    } else if (this.stepper.selectedIndex === 1) {
      if (!this.selectedDate || !this.selectedTime) {
        alert('Please select a date and time.');
        return;
      }
    }
    this.stepper.next();
  }

  loadAvailableTimes(): void {
    if (this.selectedDate) {
      this.availableTimes = this.getAvailableTimesForDate(this.selectedDate);
      console.log('Loaded available times:', this.availableTimes);
    }
  }

  getAvailableTimesForDate(date: Date | null): string[] {
    if (
      !date ||
      !this.company.openingHours ||
      this.company.openingHours.length === 0
    ) {
      console.warn('No opening hours available or date is invalid.');
      return [];
    }

    const dayNameToNumber: { [key: string]: number } = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const dayOfWeek =
      dayNameToNumber[
        new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
      ];

    console.log('Day of Week as Number:', dayOfWeek);

    const hoursForDay = this.company.openingHours.find(
      (hours: OpeningHours) => dayNameToNumber[hours.dayOfWeek] === dayOfWeek,
    );

    if (!hoursForDay) {
      console.warn('No opening hours found for the selected day.');
      return [];
    }

    const availableTimes: string[] = [];
    const startTime = this.parseTime(hoursForDay.startTime);
    const endTime = this.parseTime(hoursForDay.endTime);
    const interval = 30;

    for (
      let time = startTime;
      time < endTime;
      time = this.addMinutes(time, interval)
    ) {
      availableTimes.push(formatDate(time, 'HH:mm', 'en-US'));
    }

    console.log('Available times:', availableTimes);
    return availableTimes;
  }

  parseTime(timeString: string | null): Date {
    if (!timeString) {
      return new Date();
    }
    const [hours, minutes] = timeString.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  }

  addMinutes(date: Date, minutes: number): Date {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
  }

  onDateChange(date: Date) {
    this.selectedDate = date;
    console.log('Selected date:', this.selectedDate);
    this.loadAvailableTimes();
  }

  onTimeChange(time: string) {
    this.selectedTime = time;
  }

  addReservation() {
    if (!this.isLoggedIn) {
      alert('You need to log in to make a reservation.');
      return;
    }

    if (
      this.selectedService &&
      this.selectedDescription &&
      this.selectedDate &&
      this.selectedTime
    ) {
      const reservation = {
        serviceId: this.selectedService.id,
        description: this.selectedDescription,
        date: new Date(
          `${this.selectedDate.toISOString().split('T')[0]}T${this.selectedTime}:00`,
        ),
        status: 0,
      };

      this.reservationService.addReservation(reservation).subscribe({
        next: (data: any) => {
          console.log('Reservation confirmed:', data);
          alert('Reservation confirmed!');
          this.router.navigate(['/client-dashboard']);
        },
        error: (error: any) => {
          console.error('Error making reservation:', error);
          alert(
            'An error occurred while making the reservation. Please try again.',
          );
        },
      });
    } else {
      alert('Please complete all steps before making a reservation.');
    }
  }

  protected readonly formatDate = formatDate;
}
