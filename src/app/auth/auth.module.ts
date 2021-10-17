import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './service/auth.service';
import { fab } from '@fortawesome/free-brands-svg-icons';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    AuthRoutingModule
  ],
  providers: [
    AuthService
  ]

})
export class AuthModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fab)
  }

}
