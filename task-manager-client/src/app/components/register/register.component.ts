import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  imports: [
    FormsModule,
    RouterLink,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}


  async register() {
    try {
      await this.authService.register(this.username, this.password);
      this.snackBar.open('Registration successful 🎉', 'Close', { duration: 3000 });
      this.router.navigate(['/tasks']);
    } catch (error: any) {
      const msg = error?.response?.data?.error || 'Registration failed ❌';
      this.snackBar.open(msg, 'Close', { duration: 3000 });
    }
  }
}

