import { Component, OnInit } from '@angular/core';
import { Project } from './../../models/project';
import { ProjectService } from './../../services/project.service';
import { Global } from './../../services/global';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  
  public projects: Array<Project>;
  public url:string;

  constructor(
    private _service: ProjectService
  ) {
    this.projects = [];
    this.url=Global.url;
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this._service.getProjects().subscribe(response => {
      this.projects=response.projects;
      console.log(this.projects);
    }, error => {
      console.log(error);
    });
  }

}
