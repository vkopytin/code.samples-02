import { Component, OnInit } from '@angular/core';
import { WordBookService } from '../../services/word-book.service';
import { BehaviorSubject, debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-word-book',
  imports: [],
  templateUrl: './word-book.component.html',
  styleUrl: './word-book.component.scss',
})
export class WordBookComponent implements OnInit {
    searchTerm = this.wordBook.searchTerm;
    results = this.wordBook.results;

    enText = '';
    deText = '';

    searchTerm$ = new BehaviorSubject<string>(this.searchTerm || '');
    ngUnsubscribe = new Subject<void>();

    constructor(private wordBook: WordBookService) {

    }

    ngOnInit(): void {
        this.searchTerm$.pipe(
            debounceTime(500),
            takeUntil(this.ngUnsubscribe),
        ).subscribe(async term => {
            this.wordBook.searchTerm = term;
            await this.wordBook.search();
            this.results = this.wordBook.results;
        });

        this.searchTerm$.next(this.searchTerm || '');
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    async changeSearchTerm(term: string): Promise<void> {
        this.searchTerm$.next(term);
    }

    resetSearchTerm(): void {
        this.searchTerm = null;
        this.changeSearchTerm('');
    }

    async doSearch(): Promise<void> {
        await this.wordBook.search();
        this.results = this.wordBook.results;
    }

    async addEntry(): Promise<void> {
        await this.wordBook.addEntry(this.enText, this.deText);
        this.enText = '';
        this.deText = '';
        this.results = this.wordBook.results;
    }
}
