import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from 'src/app/shares/modules/materials.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {}
