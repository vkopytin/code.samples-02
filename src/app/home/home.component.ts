import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public articles: ArticlesService) {

  }

  async listArticles(): Promise<void> {
    const res$ = this.articles.listArticles();
    const articles = await lastValueFrom(res$);
    console.log(articles);
  }
}
