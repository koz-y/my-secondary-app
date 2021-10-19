import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './service/auth.service';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { AuthGuard } from './service/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './service/token.interceptor';



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
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]

})
export class AuthModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fab)
  }

}
