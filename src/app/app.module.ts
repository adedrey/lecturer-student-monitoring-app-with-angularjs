import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatListModule,
  MatExpansionModule,
  MatDialogModule,
  MatSliderModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSidenavModule,
  MatTabsModule,
  MatRadioModule,
  MatSelectModule,
  MatPaginatorModule
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './admin/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserHeaderComponent } from './users/user-header/user-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminLoginComponent } from './auth/admin/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LecturersComponent } from './admin/lecturers/lecturers.component';
import { StudentsComponent } from './admin/students/students.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CreateLecturerComponent } from './admin/lecturers/create-lecturer/create-lecturer.component';
import { LecturerListComponent } from './admin/lecturers/lecturer-list/lecturer-list.component';
import { CreateStudentComponent } from './admin/students/create-student/create-student.component';
import { StudentListComponent } from './admin/students/student-list/student-list.component';
import { FacilitiesComponent } from './admin/facilities/facilities.component';
import { CreateFacilityComponent } from './admin/facilities/create-facility/create-facility.component';
import { FacilityListComponent } from './admin/facilities/facility-list/facility-list.component';
import { FacilityDetailComponent } from './admin/facilities/facility-detail/facility-detail.component';
import { GenerateTokenComponent } from './admin/lecturers/generate-token/generate-token.component';
import { UserStudentComponent } from './users/user-student/user-student.component';
import { UserFacilityComponent } from './users/user-facility/user-facility.component';
import { UserGraphComponent } from './users/user-graph/user-graph.component';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptorService } from './error/error.interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UsersComponent,
    HeaderComponent,
    UserHeaderComponent,
    SignupComponent,
    LoginComponent,
    AdminLoginComponent,
    LecturersComponent,
    StudentsComponent,
    DashboardComponent,
    CreateLecturerComponent,
    LecturerListComponent,
    CreateStudentComponent,
    StudentListComponent,
    FacilitiesComponent,
    CreateFacilityComponent,
    FacilityListComponent,
    FacilityDetailComponent,
    GenerateTokenComponent,
    UserStudentComponent,
    UserFacilityComponent,
    UserGraphComponent,
    UserDashboardComponent,
    UserProfileComponent,
    ErrorComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatExpansionModule,
    MatSliderModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTabsModule,
    ChartsModule,
    MatRadioModule,
    MatSelectModule,
    MatPaginatorModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
