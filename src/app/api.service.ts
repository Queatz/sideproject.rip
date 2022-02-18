import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  projects(search: string, offset: number, limit: number) {
    return this.http.get<any>(`${environment.apiUrl}/projects`, {
      params: {
        search,
        offset,
        limit
      }
    })
  }

  projectComments(projectId: string) {
    return this.http.get<Array<any>>(`${environment.apiUrl}/project/${projectId.split('/')[1]}/comments`)
  }

  createProject(project: any) {
    return this.http.post<any>(`${environment.apiUrl}/projects`, project)
  }

  createComment(projectId: string, comment: any) {
    return this.http.post<any>(`${environment.apiUrl}/project/${projectId.split('/')[1]}/comments`, comment)
  }
}
