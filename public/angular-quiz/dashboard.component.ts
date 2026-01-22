import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userEmail: string = '';

  ngOnInit(): void {
    // Get user email from sessionStorage (set during login)
    const storedEmail = sessionStorage.getItem('userEmail');
    this.userEmail = storedEmail || 'User';
  }

  logout(): void {
    // Clear session storage
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    
    // Redirect to login (you may need to adjust this based on your login setup)
    window.location.href = 'login.html';
  }
}
