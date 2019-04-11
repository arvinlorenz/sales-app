import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.page.html',
  styleUrls: ['./agent-details.page.scss'],
})
export class AgentDetailsPage implements OnInit {

  agentId;
  agent;
  teamLeader;
  hasTeamLeader = false
  members;
  hasMembers = false
  constructor(private route: ActivatedRoute, private agentService: AgentService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap
        .subscribe(
        (paramMap: ParamMap)=>{
            
          if(paramMap.has('agentId')){
            this.agentId = paramMap.get('agentId');          
            this.agent = this.agentService.getAgent(this.agentId)
            if(this.agent.teamLeaderId){
              this.hasTeamLeader = true
              this.teamLeader = this.agentService.getAgent(this.agent.teamLeaderId)
            }
            if(this.agentService.getMembers(this.agentId).length > 0){
              this.hasMembers = true;
              this.members = this.agentService.getMembers(this.agentId)
              console.log(this.members)
            }
          }
        }    
        ); 
  }
  editDetails(){
    this.router.navigate(['agents/edit', this.agentId])
  }


}
