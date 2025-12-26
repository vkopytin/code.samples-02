import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-catalog',
    imports: [RouterOutlet],
    template: '<router-outlet></router-outlet>'
})
export class CatalogComponent {
}
