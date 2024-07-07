import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { ArticlesService } from '../services/articles.service';
import { ArticleDraft } from '../services/models/articleDraft';
import { WebSiteModel } from '../services/models/webSiteModel';
import { WebSitesService } from '../services/webSites.service';
import { ContentEditorModule } from '../content-editor/content-editor.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ContentEditorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  allArticles?: ArticleDraft[] = this.articles.lastArticles;
  allWebSites?: WebSiteModel[] = this.webSites.lastWebsites;

  constructor(public articles: ArticlesService, public webSites: WebSitesService) {

  }

  ngOnInit(): void {
    this.listArticles();
    this.listWebSites();
  }

  async listArticles(): Promise<void> {
    const res$ = this.articles.listArticles();
    this.allArticles = await lastValueFrom(res$);
  }

  async listWebSites(): Promise<void> {
    const res$ = this.webSites.listWebSites();
    this.allWebSites = await lastValueFrom(res$);
  }

  contentChange(html: any): void {
    console.log(this.allArticles?.find(() => true)?.description);
  }
}
