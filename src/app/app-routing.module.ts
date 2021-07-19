import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminLoginComponent } from './auth/admin/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminAuthGuard } from './auth/admin.auth.guard';
import { StudentsComponent } from './admin/students/students.component';
import { CreateStudentComponent } from './admin/students/create-student/create-student.component';
import { LecturersComponent } from './admin/lecturers/lecturers.component';
import { CreateLecturerComponent } from './admin/lecturers/create-lecturer/create-lecturer.component';
import { FacilitiesComponent } from './admin/facilities/facilities.component';
import { CreateFacilityComponent } from './admin/facilities/create-facility/create-facility.component';
import { FacilityDetailComponent } from './admin/facilities/facility-detail/facility-detail.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';


const routes: Routes = [
  {
    path: '', redirectTo: '/user', pathMatch: 'full'
  },
  {
    path: 'user/login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'admin/login', component: AdminLoginComponent
  },
  {
    path: 'user', component: UsersComponent, canActivate: [AuthGuard], children: [
      {
        path: '', redirectTo: '/user/dashboard', canActivate: [AuthGuard], pathMatch: 'full'
      },
      {
        path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuard]
      },
      {
        path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard], children: [
      {
        path: '', redirectTo: '/admin/home', canActivate: [AdminAuthGuard], pathMatch: 'full'
      },
      {
        path: 'home', component: DashboardComponent, canActivate: [AdminAuthGuard]
      },
      {
        path: 'students', component: StudentsComponent, canActivate: [AdminAuthGuard], children: [
          {
            path: 'create', component: CreateStudentComponent, canActivate: [AdminAuthGuard]
          },
          {
            path: ':id/edit', component: CreateStudentComponent, canActivate: [AdminAuthGuard]
          }
        ]
      },
      {
        path: 'lecturers', component: LecturersComponent, canActivate: [AdminAuthGuard], children: [
          {
            path: 'create', component: CreateLecturerComponent, canActivate: [AdminAuthGuard]
          },
          {
            path: ':id/edit', component: CreateLecturerComponent, canActivate: [AdminAuthGuard]
          }
        ]
      },
      {
        path: 'facilities', component: FacilitiesComponent, canActivate: [AdminAuthGuard], children: [
          {
            path: 'create', component: CreateFacilityComponent, canActivate: [AdminAuthGuard]
          },
          {
            path: ':id', component: FacilityDetailComponent, canActivate: [AdminAuthGuard]
          },
          {
            path: ':id/edit', component: CreateFacilityComponent, canActivate: [AdminAuthGuard]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminAuthGuard]
})
export class AppRoutingModule { }
