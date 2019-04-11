import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { AgentService } from './agent.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.page.html',
  styleUrls: ['./agents.page.scss'],
})
export class AgentsPage implements OnInit, OnDestroy {

  agents;
  displayedAgents
  agentUpdatedSub: Subscription
  @ViewChild("searchBar") searchBar;
  constructor(private agentService: AgentService, private router: Router) { }

  ngOnInit() {
    
    this.agents = this.agentService.getAllAgents()
    this.displayedAgents = this.agents
   
    this.agentUpdatedSub = this.agentService.updateAgentListener()
      .subscribe(agents=>{
        this.agents = agents
        this.displayedAgents = this.agents
        this.displayedAgents = this.displayedAgents.filter((agent) => {
          return agent.name.toLowerCase().includes(this.searchBar.value.toLowerCase().trim())
        })
      })
  }
  addAgent(){
    this.router.navigate(['agents/create'])
  }
  getItems(event){
    
    this.displayedAgents = this.agents
    if (event.target.value.trim() != '') {
      this.displayedAgents = this.displayedAgents.filter((agent) => {
        return agent.name.toLowerCase().includes(event.target.value.toLowerCase().trim())
      })
    }
    
  }

  ngOnDestroy() {
    this.agentUpdatedSub.unsubscribe()

  }

}
