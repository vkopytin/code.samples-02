import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { ArticlesService } from '../services/articles.service';
import { ArticleDraft } from '../services/models/articleDraft';
import { WebSiteModel } from '../services/models/webSiteModel';
import { WebSitesService } from '../services/webSites.service';
import { ContentEditorModule } from '../content-editor/content-editor.module';
import { debounce } from '../utils';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ContentEditorModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  articleForm!: FormGroup;
  articleTitle!: FormControl<string | null>;
  articleDescription!: FormControl<string | null>;
  allArticles?: ArticleDraft[] = this.articles.lastArticles;
  allWebSites?: WebSiteModel[] = this.webSites.lastWebsites;
  contentChange = debounce(this.contentChangeInternal, 500);

  constructor(public articles: ArticlesService, public webSites: WebSitesService) {
    this.articleForm = new FormGroup({
      articleTitle: this.articleTitle = new FormControl('', Validators.required),
      articleDescription: this.articleDescription = new FormControl('', Validators.required),
    });
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

  async createArticle(): Promise<void> {
    const res$ = this.articles.createArticle({
      title: this.articleTitle.value || '',
      description: this.articleDescription.value || '',
    });
    await lastValueFrom(res$);

    this.articleForm.reset();
    this.listArticles();
  }

  private async contentChangeInternal(article: ArticleDraft): Promise<void> {
    const res$ = this.articles.updateArticle(article);
    await lastValueFrom(res$);
  }
}
