import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { ArticlesService } from '../services/articles.service';
import { ArticleDraft } from '../services/models/articleDraft';
import { WebSiteModel } from '../services/models/webSiteModel';
import { WebSitesService } from '../services/webSites.service';
import { ContentEditorModule } from '../content-editor/content-editor.module';
import { debounce } from '../utils';

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
  contentChange = debounce(this.contentChangeInternal, 500);

  constructor(public articles: ArticlesService, public webSites: WebSitesService) {

  }

  ngOnInit(): void {
    this.listArticles();
    this.listWebSites();
    this.articles.listArticles2().subscribe(res => console.log(res));
  }

  async listArticles(): Promise<void> {
    const res$ = this.articles.listArticles();
    this.allArticles = await lastValueFrom(res$);
  }

  async listWebSites(): Promise<void> {
    const res$ = this.webSites.listWebSites();
    this.allWebSites = await lastValueFrom(res$);
  }

  private async contentChangeInternal(article: ArticleDraft): Promise<void> {
    const res$ = this.articles.updateArticle(article);
    await lastValueFrom(res$);
  }
}
