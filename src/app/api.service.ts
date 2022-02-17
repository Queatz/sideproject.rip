import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  projects(search: string, offset: number, limit: number) {
    return of({
      total: 100,
      offset: 10,
      data: [
        { name: 'Cool', link: 'cool.site', purpose: 'Cool stuff', created: new Date()},
        { name: 'Cool', link: 'cool.site', purpose: 'Cool stuff', created: new Date()},
        { name: 'Cool', link: 'cool.site', purpose: 'Cool stuff', created: new Date()},
        { name: 'Cool', link: 'cool.site', purpose: 'Cool stuff', created: new Date()},
      ]
    })
  }

  projectComments(projectId: string) {
    return of([
      { text: 'Cool' },
      { text: 'Cool' },
      { text: 'Cool' }
    ])
  }

  createProject(project: any) {
    return of(null)
  }

  createComment(projectId: string, comment: any) {
    return of(null)
  }
}
