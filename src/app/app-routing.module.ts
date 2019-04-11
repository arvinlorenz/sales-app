import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'agents',
    pathMatch: 'full'
  },
  { path: 'agents', loadChildren: './agents/agents.module#AgentsPageModule' },
  // { path: 'agent-details', loadChildren: './agents/agent-details/agent-details.module#AgentDetailsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
