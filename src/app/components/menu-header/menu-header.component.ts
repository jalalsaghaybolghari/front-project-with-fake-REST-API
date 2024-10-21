import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '@modules/Material.Module';

@Component({
  selector: 'app-menuheader',
  standalone: true,
  imports: [RouterLink, MaterialModule],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss'
})
export class MenuHeaderComponent {

}
