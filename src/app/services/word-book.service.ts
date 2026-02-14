import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

interface WordBookEntry {
    id: string;
    en: string;
    de: string;
    createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class WordBookService {
    domain: string = environment.catalog.domain;
    searchTerm: string | null = null;
    results: WordBookEntry[] = [];

    constructor(
        private http: HttpClient
    ) {

    }

    async search(): Promise<void> {
        const req = this.http.get<WordBookEntry[]>(`${this.domain}/wordbook/search`, {
            params: {
                term: this.searchTerm || ''
            }
        });

        const results = await lastValueFrom(req);

        this.results = results.map(r => ({
            ...r,
            createdAt: new Date(r.createdAt).toLocaleString()
        }));
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
