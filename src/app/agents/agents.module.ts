import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgentsPage } from './agents.page';

const routes: Routes = [
  {
    path: '',
    component: AgentsPage
  },
  { path: 'create', loadChildren: './agents-create/agents-create.module#AgentsCreatePageModule' },
  { path: 'edit/:agentId', loadChildren: './agents-create/agents-create.module#AgentsCreatePageModule' },
  { path: ':agentId', loadChildren: './agent-details/agent-details.module#AgentDetailsPageModule' },
 
  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgentsPage]
})
export class AgentsPageModule {}
