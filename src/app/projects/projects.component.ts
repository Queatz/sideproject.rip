import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {BehaviorSubject, Subject, switchMap, takeUntil} from "rxjs";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  selectedProject?: any

  projects: Array<any> = []
  comments: Array<any> = []

  currentOffset = 0

  searchText = ''

  page = {
    start: 0,
    end: 0,
    total: 0
  }

  newProject = {
    name: '',
    link: '',
    purpose: ''
  }

  newComment = ''

  private destroyed = new Subject<void>()
  private changes = new BehaviorSubject(null)

  constructor(private api: ApiService, private cr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.changes.pipe(
      takeUntil(this.destroyed),
      switchMap(() => this.api.projects(this.searchText, this.currentOffset, 10))
    ).subscribe({
      next: result => {
        this.page.start = result.offset + 1
        this.page.end = result.offset + (result.data.length || 1)
        this.page.total = result.total
        this.projects = result.data
      },
      error: err => alert(err.statusText)
    })
  }

  ngOnDestroy() {
    this.destroyed.next()
    this.destroyed.complete()
    this.changes.complete()
  }

  submitProject() {
    this.newProject.name = this.newProject.name.trim()
    this.newProject.link = this.newProject.link.trim()
    this.newProject.purpose = this.newProject.purpose.trim()

    if (!this.newProject.name || !this.newProject.link || !this.newProject.purpose) {
      alert('Missing fields')
      return
    }

    this.api.createProject(this.newProject).pipe(
      takeUntil(this.destroyed)
    ).subscribe({
      next: () => {
        this.newProject = {
          name: '',
          link: '',
          purpose: ''
        }

        this.changes.next(null)

        this.cr.detectChanges()
      },
      error: err => alert(err.statusText)
    })
  }

  prevPage() {
    this.currentOffset -= 10

    if (this.currentOffset < 0) {
      this.currentOffset = 0
    }

    this.changes.next(null)
  }

  nextPage() {
    this.currentOffset += 10

    this.changes.next(null)
  }

  addComment() {
    if (!this.selectedProject) {
      return
    }

    if (!this.newComment.trim()) {
      alert('Missing text')
      return
    }

    this.api.createComment(this.selectedProject.id, { text: this.newComment.trim() }).pipe(
      takeUntil(this.destroyed)
    ).subscribe({
      next: () => {
        this.newComment = ''

        this.loadComments()

        this.cr.detectChanges()
      },
      error: err => alert(err.statusText)
    })
  }

  selectProject(project: any) {
    if (this.selectedProject === project) {
      this.selectedProject = undefined
    } else {
      this.selectedProject = project
    }

    this.loadComments()
  }

  private loadComments() {
    this.comments = []

    if (!this.selectedProject) {
      return
    }

    this.api.projectComments(this.selectedProject.id).pipe(
      takeUntil(this.destroyed)
    ).subscribe({
      next: result => {
        this.comments = result

        this.cr.detectChanges()
      },
      error: err => alert(err.statusText)
    })
  }

  reload() {
    this.changes.next(null)
  }
}
