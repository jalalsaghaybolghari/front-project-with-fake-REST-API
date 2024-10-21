import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuHeaderComponent } from "@components/menu-header/menu-header.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [ RouterOutlet, MenuHeaderComponent]
})
export class AppComponent {
  title = 'material-with-json-mock';
}
