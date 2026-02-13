import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

interface WorkBookEntry {
    id: string;
    en: string;
    de: string;
    createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkBookService {
    domain: string = environment.catalog.domain;
    searchTerm = '';
    results: WorkBookEntry[] = [];

    constructor(
        private http: HttpClient
    ) {

    }

    async search(): Promise<void> {
        const req = this.http.get<WorkBookEntry[]>(`${this.domain}/api/workbook/search`, {
            params: {
                q: this.searchTerm
            }
        });

        this.results = await lastValueFrom(req);
    }

    async addEntry(en: string, de: string): Promise<void> {
        const req = this.http.post<WorkBookEntry>(`${this.domain}/api/workbook/add`, {
            en,
            de
        });

        await lastValueFrom(req);
        await this.search();
    }
}
