import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { ArticleBlock } from './models/articleBlock';
import { CommonResponse } from './models/commonResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  domain: string = environment.catalog.domain;

  uploadMediaUrl = (blockId: string) => `${this.domain}/media/block/${blockId}/upload`;
  updateMediaUrl = (id: string) => `${this.domain}/media/update/${id}`;

  constructor(
    private http: HttpClient,
  ) { }

  upload(blockId: string, media: HTMLInputElement) {
    const formData = new FormData();
    for (const file of [].slice.call(media.files, 0) as File[]) {
        formData.append(file.name, file);
    }
    return this.http.post<CommonResponse<ArticleBlock>>(this.uploadMediaUrl(blockId), formData).pipe(
      map(({ result }) => result)
    );
  }

  update(media: Partial<ArticleBlock>) {
    if (!media.id) {
      return;
    }

    return this.http.put<CommonResponse<ArticleBlock>>(this.updateMediaUrl(media.id), media).pipe(
      map(({ result }) => result)
    )
  }
}
