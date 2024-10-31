import { LangChangeEvent, TranslateModule } from '@ngx-translate/core';

import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, MatCardModule, MatButtonModule],
  // providers: [TranslateService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-bidi';

  private rtlLanguages = ['he', 'ar', 'fa', 'ur'];

  constructor(
    private translate: TranslateService,
    private renderer: Renderer2
  ) {
    // Add all supported languages
    this.translate.addLangs(['en', 'he']);

    // Set the default language
    this.translate.setDefaultLang('en');

    // Use a specific language
    this.translate.use('he');
  }

  ngOnInit(): void {
    // Initial text direction setup
    this.updateTextDirection(this.translate.currentLang);
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.updateTextDirection(lang);
  }

  private updateTextDirection(lang: string): void {
    const isRtl = this.rtlLanguages.includes(lang);

    // Update the `dir` attribute on the root element
    const htmlElement = document.documentElement as HTMLElement;
    this.renderer.setAttribute(htmlElement, 'dir', isRtl ? 'rtl' : 'ltr');

    // Optional: Update the `lang` attribute
    this.renderer.setAttribute(htmlElement, 'lang', lang);
  }
}
