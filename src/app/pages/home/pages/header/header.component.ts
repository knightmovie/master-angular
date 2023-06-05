import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from 'src/app/shares/modules/materials.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}
