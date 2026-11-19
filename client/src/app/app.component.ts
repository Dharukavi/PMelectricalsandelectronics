import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface BookingRequest {
  name: string;
  phone: string;
  appliance: string;
  issue: string;
  area: string;
  preferredTime: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly phone = '+918489818963';
  readonly displayPhone = '+91 84898 18963';
  readonly mapsUrl = 'https://maps.app.goo.gl/2Zc32mgmUMHJCiBU6?g_st=awb';
  menuOpen = false;
  bookingState: 'idle' | 'success' | 'error' = 'idle';
  booking: BookingRequest = { name: '', phone: '', appliance: '', issue: '', area: '', preferredTime: '' };

  readonly services = [
    { number: '01', title: 'Air conditioning', copy: 'Cooling issues, servicing and repairs to help your home feel comfortable again.', icon: '❄', image: 'https://images.unsplash.com/photo-1762341123870-d706f257a12e?auto=format&fit=crop&w=900&q=85', alt: 'Wall mounted air conditioner in a modern home' },
    { number: '02', title: 'Refrigerators', copy: 'Practical help with cooling, unusual sounds, leaks and everyday fridge concerns.', icon: '◈', image: 'https://images.unsplash.com/photo-1722942431679-72fc53fe9707?auto=format&fit=crop&w=900&q=85', alt: 'White refrigerator in a bright kitchen' },
    { number: '03', title: 'Washing machines', copy: 'Diagnosis and repair for wash, spin, drain and other machine problems.', icon: '◉', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=85', alt: 'Front-load washing machine in a laundry room' },
    { number: '04', title: 'Microwave ovens', copy: 'Help with heating, turntable, buttons and other everyday microwave issues.', icon: '◌', image: 'https://images.unsplash.com/photo-1723259461381-59ab9fa18f5d?auto=format&fit=crop&w=900&q=85', alt: 'Black and silver microwave oven in a polished modern kitchen' }
  ];
  readonly reviews = [
    { name: 'Priyadharshini S.', rating: 4, text: 'They listened the feedback and done the best service with patience in next attempt. Overall good experience.', note: 'AC service · patient follow-up' },
    { name: 'Aryan A.', rating: 5, text: 'Very much satisfied with the service.', note: 'The reviewer also appreciated the post-service follow-up.' },
    { name: 'Google customer', rating: 5, text: 'Excellent service and Reasonable price, such a good technician.', note: '' }
  ];
  activeReviewIndex = 0;

  get activeReview() { return this.reviews[this.activeReviewIndex]; }

  shiftReview(direction: number): void {
    this.activeReviewIndex = (this.activeReviewIndex + direction + this.reviews.length) % this.reviews.length;
  }

  closeMenu(): void { this.menuOpen = false; }

  submitBooking(): void {
    const message = [
      'Hello PM Electricals & Electronics, I would like to request a service visit.',
      '',
      `Name: ${this.booking.name}`,
      `Phone: ${this.booking.phone}`,
      `Appliance: ${this.booking.appliance}`,
      `Issue: ${this.booking.issue}`,
      `Area: ${this.booking.area}`,
      `Preferred time: ${this.booking.preferredTime}`
    ].join('\n');
    const whatsappUrl = `https://wa.me/918489818963?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    this.bookingState = 'success';
  }
}



