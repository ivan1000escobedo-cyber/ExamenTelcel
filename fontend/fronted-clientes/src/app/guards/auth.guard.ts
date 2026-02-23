import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// auth.guard.ts

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('usuario')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}