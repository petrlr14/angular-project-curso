import { Component, OnInit } from '@angular/core';
import { Project } from './../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from './../../services/upload.service';
import { Global } from './../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public url;
  public fileReady: boolean;
  public id: string;
  public messageSuccess: string;
  public messageFail: string;

  constructor(
    /* public snackBar: MatSnackBar */
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = 'Create Project';
    this.project = new Project('', '', '', '', 2018, '', '');
    this.url = Global.url;
    this.fileReady = false;
    this.messageSuccess = 'creado';
    this.messageFail = 'crear';
  }
  ngOnInit() {
  }

  onSubmit(form) {
    this._projectService.saveProject(this.project).subscribe(response => {
      if (response.project) {
        this._uploadService.makeFileRequest(this.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
          .then((result: any) => {
            console.log(result);
            this.status = response.project ? 'success' : 'fail';
            this.fileReady = false;
            this.id = response.project._id;
            form.reset();
          });
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
