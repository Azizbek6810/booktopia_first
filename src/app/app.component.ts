import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { SeoService } from './seo.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'booktopia';

  constructor(
    private transloco: TranslocoService,
    private router: Router,
    private seoService: SeoService,
  ) {
    this.router.events
      .pipe(filter((e: any) => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.seoService.updateHreflangLinks(event.urlAfterRedirects);
      });
  }
}
