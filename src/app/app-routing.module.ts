import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full'
  },
  {
    path: 'table',
    loadChildren: () => import('./modules/table/table.module').then(m => m.TableModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
