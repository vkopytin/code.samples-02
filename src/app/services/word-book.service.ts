import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { WordBookEntry } from './models/WordBookEntry';
import { PagedResult } from './models/pagedResult';

@Injectable({
  providedIn: 'root'
})
export class WordBookService {
    domain: string = environment.catalog.domain;
    searchTerm: string | null = null;
    results: WordBookEntry[] = [];
    total: number = 0;

    constructor(
        private http: HttpClient
    ) {

    }

    async search(from = 0, limit = 20): Promise<void> {
        const req = this.http.get<PagedResult<WordBookEntry>>(`${this.domain}/wordbook/search`, {
            params: {
                term: this.searchTerm || '',
                from,
                limit
            }
        });

        const results = await lastValueFrom(req);

        this.results = results.items.map(r => ({
            ...r,
            createdAt: new Date(r.createdAt).toLocaleString()
        }));
        this.total = results.total;
    }

    async addEntry(en: string, de: string): Promise<void> {
        const req = this.http.post<WordBookEntry>(`${this.domain}/wordbook/add`, {
            en,
            de
        });

        await lastValueFrom(req);
        await this.search();
    }

    async update(entry: WordBookEntry): Promise<void> {
        const req = this.http.put<WordBookEntry>(`${this.domain}/wordbook/${entry.id}`, entry);
        await lastValueFrom(req);
        await this.search();
    }

    async addBulkEntries(entries: string): Promise<void> {
        const req = this.http.post<WordBookEntry[]>(`${this.domain}/wordbook/add-batch`, {
            entries
        });
        await lastValueFrom(req);
        await this.search();
    }
}
