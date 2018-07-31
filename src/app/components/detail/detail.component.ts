import { Component, OnInit } from '@angular/core';
import { Global } from './../../services/global';
import { ProjectService } from './../../services/project.service';
import { Project } from './../../models/project';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers:[ProjectService]
})
export class DetailComponent implements OnInit {

  public url:string;
  public project:Project;
  public id;

  constructor(
    private _client:ProjectService,
    private _router:Router,
    private _route:ActivatedRoute
  ){
    this.url=Global.url;
    this.project=new Project('','','','',1,'','');
  }

  ngOnInit() {
    this._route.params.subscribe(params=>{
      let id=params.id;
      this.getProject(id);
    });
  }

  getProject(id){
    this._client.getProject(id).subscribe(result=>{
      this.project=result.project;
    }, error=>{
      console.log(<any>error);
    });
  }

  deleteProject(id){
    this._client.deleteProject(id).subscribe(response=>{
        if(response.project){
            this._router.navigate(['/projects']);
        }
    }, error=>{
        console.log(<any>error);
    })
  }

}
