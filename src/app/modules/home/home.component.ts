import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/implementations/authentication.service';
import { HomeService } from 'src/app/core/services/implementations/home.service';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { LeftSideComponent } from './pages/left-side/left-side.component';
import { MaterialsModule } from 'src/app/shares/modules/materials.module';
import { RouterOutlet } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    HeaderComponent,
    LeftSideComponent,
    FooterComponent,
    RouterOutlet,
    MaterialsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authenService: AuthenticationService,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.homeService.getHome().subscribe((res) => {
      console.log(res);
    });
  }

  logout() {
    this.authenService.logOutAndRedirectToLogin();
  }
}
