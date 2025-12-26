import { Component } from '@angular/core';
import { WebSitesService } from '../services/webSites.service';
import { lastValueFrom } from 'rxjs';
import { ContentEditorModule } from '../content-editor/content-editor.module';
import { WebSiteModel } from '../services/models/webSiteModel';
import { debounce } from '../utils';

@Component({
    selector: 'app-sites-structure',
    imports: [ContentEditorModule],
    templateUrl: './sites-structure.component.html',
    styleUrl: './sites-structure.component.scss'
})
export class SitesStructureComponent {
  saveChanges = debounce(this.saveChangesInternal, 500);

  constructor(
    public webSites: WebSitesService,
  ) {}

  async setParent(siteId: string | null, parentId: string | null): Promise<void> {
    const res$ = this.webSites.setParent(siteId, parentId);
    const res = await lastValueFrom(res$);
    Object.assign(this.webSites.lastWebsites.find(s => s.id === siteId) || {}, res);
  }

  async saveChangesInternal(site: WebSiteModel): Promise<void> {
    const res$ = this.webSites.updateWebSite(site);
    const updatedSite = await lastValueFrom(res$);
    Object.assign(site, updatedSite);
  }
}
