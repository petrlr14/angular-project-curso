import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';

const appRoutes:Routes=[
    {path:'', component:AboutmeComponent},
    {path:'projects', component:ProjectsComponent},
    {path:'create', component:CreateComponent},
    {path: 'contact', component:ContactComponent},
    {path:'**', component:ErrorComponent} 
];

export const appRoutingProviders:any[]=[];
export const routing: ModuleWithProviders=RouterModule.forRoot(appRoutes);/* carga las rutas en el router de angular */