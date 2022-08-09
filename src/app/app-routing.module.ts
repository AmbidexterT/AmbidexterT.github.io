import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'header',
    pathMatch: 'full'
  },
  {
    path: 'header',
    loadChildren: () => import('./header/header.module').then(m => m.HomeModule),
  },*/
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
