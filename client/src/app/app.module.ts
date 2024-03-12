import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, HttpClient, HTTP_INTERCEPTORS, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PerformanceLayoutComponent } from './layouts/performance-layout/performance-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PerformanceListComponent } from './components/performance-list/performance-list.component';
import { PerformanceDetailLayoutComponent } from './layouts/performance-detail-layout/performance-detail-layout.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HomePageComponent } from './layouts/home-page/home-page.component';
import { PerformanceUserListComponent } from './components/performance-user-list/performance-user-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CorsInterceptor } from './cors.interceptor';
import { AuthInterceptor } from './auth.interceptor';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PerformanceLayoutComponent,
    UserLayoutComponent,
    LoginLayoutComponent,
    SidebarComponent,
    FooterComponent,
    PerformanceListComponent,
    PerformanceDetailLayoutComponent,
    ConfirmDialogComponent,
    HomePageComponent,
    PerformanceUserListComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        NgOptimizedImage,
    ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
