import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { PerformanceLayoutComponent } from './layouts/performance-layout/performance-layout.component';
import { PerformanceDetailLayoutComponent } from './layouts/performance-detail-layout/performance-detail-layout.component';
import { HomePageComponent } from './layouts/home-page/home-page.component';
import { AuthGuard } from './guard/auth-guard.service';

const routes: Routes = [
  { path: 'user-layout', component: UserLayoutComponent, canActivate: [AuthGuard]  },
  { path: 'performance-layout', component: PerformanceLayoutComponent, canActivate: [AuthGuard]  },
  { path: 'performance-detail-layout', component: PerformanceDetailLayoutComponent, canActivate: [AuthGuard]  },
  { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard]  },
  { path: 'login-page', component: LoginLayoutComponent },
  { path: '**', component: HomePageComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
