import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  allArticles = this.articles.lastArticles;

  constructor(public articles: ArticlesService) {

  }

  ngOnInit(): void {
    this.listArticles();
  }

  async listArticles(): Promise<void> {
    const res$ = this.articles.listArticles();
    this.allArticles = await lastValueFrom(res$);
  }
}
