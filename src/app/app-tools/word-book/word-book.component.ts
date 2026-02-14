import { Component, OnInit } from '@angular/core';
import { WordBookService } from '../../services/word-book.service';
import { BehaviorSubject, debounceTime, Subject, takeUntil } from 'rxjs';
import { ContentEditorModule } from '../../content-editor/content-editor.module';

@Component({
  selector: 'app-word-book',
  imports: [ContentEditorModule],
  templateUrl: './word-book.component.html',
  styleUrl: './word-book.component.scss',
})
export class WordBookComponent implements OnInit {
    searchTerm = this.wordBook.searchTerm;
    results = this.wordBook.results;

    enText = '';
    deText = '';
    bulkText = '';

    selectedItem: WordBookComponent['results'][0] | null = null;

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

    getValue(event: Event): string {
        const target = event.target as HTMLInputElement;
        return target.value;
    }

    changeSelectedItem(item: WordBookComponent['results'][0]): void {
        this.selectedItem = item;
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
        if (!this.enText || !this.deText) {
            return;
        }

        await this.wordBook.addEntry(this.enText, this.deText);
        this.enText = '';
        this.deText = '';
        this.results = this.wordBook.results;
    }

    onChangeBulkText(event: Event): void {
        const target = event.target as HTMLTextAreaElement;
        this.bulkText = target.value;
    }

    async addBulkEntries(): Promise<void> {
        await this.wordBook.addBulkEntries(this.bulkText);
        this.bulkText = '';
        this.results = this.wordBook.results;
    }

    async saveEntry(entry: WordBookComponent['results'][0]): Promise<void> {
        if (!this.selectedItem) {
            return;
        }

        await this.wordBook.update(entry);

        this.selectedItem = null;
    }
}
