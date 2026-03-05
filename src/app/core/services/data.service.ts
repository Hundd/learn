import { environment } from 'src/environments/environment';
import { api } from './api.constant';
import { HttpClient } from '@angular/common/http';

interface CardAudiConfigItem {
  slow: string;
  normal: string;
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http.get<Record<string, CardAudiConfigItem[]>>(resolveUrl(api.config));
  }

  loadDictionary() {
    return this.http.get<unknown>(resolveUrl(api.dict));
  }

  resolveAssetUrl(url: string): string {
    if (url[0] === '.') {
      return resolveUrl('/assets' + url.slice(1));
    }
    return url;
  }
}

function resolveUrl(url: string): string {
  return environment.base + url;
}
