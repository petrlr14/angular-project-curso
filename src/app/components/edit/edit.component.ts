import { Component, OnInit } from '@angular/core';
import { Global } from './../../services/global';
import { ProjectService } from './../../services/project.service';
import { Project } from './../../models/project';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadService } from './../../services/upload.service';


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['../create/create.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public url: string;
  public project: Project;
  public title: string;
  public status: string;
  public filesToUpload: Array<File>;
  public fileReady: boolean;
  public id: string;
  public messageSuccess:string;
  public messageFail:string;

  constructor(
    private _client: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _uploadService: UploadService
  ) {
    this.title = 'Edit Project'
    this.url = Global.url;
    this.messageSuccess='editado'
    this.messageFail='editar';
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.id = id;
      this.getProject(id);
    });


  }
  getProject(id) {
    this._client.getProject(id).subscribe(result => {
      this.project = result.project;
    }, error => {
      console.log(<any>error);
    });
  }

  onSubmit(form) {
    this._client.updateProject(this.project).subscribe(response => {
      if (response.project) {
        if (this.filesToUpload) {
          this._uploadService.makeFileRequest(this.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
            .then((result: any) => {
              console.log(result);

            });
        }
        this.status = response.project ? 'success' : 'fail';
        this.fileReady = false;
        form.reset();
      }
    }, error => {
      console.log(<any>error);
    });
  }

  fileChange(file: any) {
    this.filesToUpload = <Array<File>>file.target.files;/* asi se castea en ts */
    this.fileReady = true;
  }

}
