import { Observable } from 'rxjs';
import { api } from './api.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http.get<any>(api.config);
  }

  loadDictionary() {
    return this.http.get<any>(api.dict);
  }

  resolveAssetUrl(url: string): string {
    if (url[0] === '.') {
      return '/assets' + url.slice(1);
    }
  }
}
