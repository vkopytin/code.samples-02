import { Component, OnInit } from '@angular/core';
import { WorkBookService } from '../../services/work-book.service';
import { BehaviorSubject, debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-word-book',
  imports: [],
  templateUrl: './word-book.component.html',
  styleUrl: './word-book.component.scss',
})
export class WordBookComponent implements OnInit {
    searchTerm = this.workBook.searchTerm;
    results = this.workBook.results;

    enText = '';
    deText = '';

    searchTerm$ = new BehaviorSubject<string>(this.searchTerm || '');
    ngUnsubscribe = new Subject<void>();

    constructor(private workBook: WorkBookService) {

    }

    ngOnInit(): void {
        this.searchTerm$.pipe(
            debounceTime(500),
            takeUntil(this.ngUnsubscribe),
        ).subscribe(async term => {
            this.workBook.searchTerm = term;
            await this.workBook.search();
            this.results = this.workBook.results;
        })
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
        await this.workBook.search();
        this.results = this.workBook.results;
    }

    async addEntry(): Promise<void> {
        await this.workBook.addEntry(this.enText, this.deText);
        this.enText = '';
        this.deText = '';
        this.results = this.workBook.results;
    }
}
