import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  test : Date = new Date()

  focus1: boolean = false
  focus2: boolean = false
  focus3: boolean = false
  focus4: boolean = false

  errors: any = []

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  register(registerForm: any) {

    this.authService.register(registerForm.value).subscribe(
      (resust) => {
        console.log("success")
        this.router.navigate(['/login'])
      },
      (err: HttpErrorResponse) => {
        console.error(err)
        this.errors = err.error.errors
      },
      () => {
        console.log('done')
      }
    )
  }

}
