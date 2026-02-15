import { Component, OnInit, ViewChild } from '@angular/core';
import { WordBookService } from '../../services/word-book.service';
import { BehaviorSubject, debounceTime, Subject, takeUntil } from 'rxjs';
import { ContentEditorModule } from '../../content-editor/content-editor.module';
import { WordBookEntry } from '../../services/models/WordBookEntry';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-word-book',
  imports: [ReactiveFormsModule, ContentEditorModule],
  templateUrl: './word-book.component.html',
  styleUrl: './word-book.component.scss',
})
export class WordBookComponent implements OnInit {
    searchForm: FormGroup;
    results = this.wordBook.results;
    pages = [0];

    enText = '';
    deText = '';
    bulkText = '';

    selectedItem: WordBookEntry | null = null;
    page = 1;
    pageSize = 20;

    ngUnsubscribe = new Subject<void>();

    constructor(private wordBook: WordBookService) {
        this.searchForm = new FormGroup({
            search: new FormControl<string>(''),
        });
    }

    ngOnInit(): void {
        this.searchForm.valueChanges.pipe(
            debounceTime(500),
            takeUntil(this.ngUnsubscribe),
        ).subscribe(async value => {
            this.wordBook.searchTerm = value.search;
            await this.doSearch();
        });

        this.doSearch();
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    getValue(event: Event): string {
        const target = event.target as HTMLInputElement;
        return target.value;
    }

    changeSelectedItem(item: WordBookEntry): void {
        this.selectedItem = {...item };
    }

    async doSearch(event?: Event): Promise<void> {
        event?.preventDefault();

        await this.wordBook.search((this.page - 1) * this.pageSize, this.pageSize);
        this.pages = this.makePagesMap(this.wordBook.total, this.pageSize);
        this.results = this.wordBook.results;
    }

    goToPage(page: number): void {
        this.page = page;
        this.doSearch();
    }

    makePagesMap(total: number, pageSize: number): number[] {
        const allPages = Array(Math.ceil(total / pageSize)).fill(0).map((_, i) => i);
        if (allPages.length <= 10) {
            return allPages;
        }
        if (this.page <= 5) {
            return allPages.slice(0, 10);
        }
        if (this.page > allPages.length - 5) {
            return allPages.slice(-10);
        }
        return allPages.slice(this.page - 5, this.page + 5);
    }

    onEntryChange(value: string): void {
        if (!this.selectedItem) {
            return;
        }

        const [de, en] = value.split(' - ');
        this.selectedItem.de = de.trim();
        this.selectedItem.en = en.trim();
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

    async saveEntry(): Promise<void> {
        if (!this.selectedItem) {
            return;
        }

        await this.wordBook.update(this.selectedItem);

        this.selectedItem = null;
    }
}
