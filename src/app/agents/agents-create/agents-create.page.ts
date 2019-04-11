import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AgentService } from '../agent.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-agents-create',
  templateUrl: './agents-create.page.html',
  styleUrls: ['./agents-create.page.scss'],
})
export class AgentsCreatePage implements OnInit {
  allAgents
  editMode = false
  agentId
  agent
  form

  constructor(private route: ActivatedRoute, private agentService: AgentService, private router: Router) { }

  ngOnInit() {
    this.allAgents = this.agentService.getAllAgents()
    
    this.form = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      company: new FormControl(null),
      phone: new FormControl(null),
      teamLeaderId: new FormControl(null)
    })
    this.route.paramMap
        .subscribe(
        (paramMap: ParamMap)=>{
            
          if(paramMap.has('agentId')){
           this.editMode = true
           this.agentId = paramMap.get('agentId');         
           this.agent = this.agentService.getAgent(this.agentId)
           this.allAgents = this.agentService.getAllAgents().filter(agent=>{
             return agent.id != this.agentId
           })
           let teamLeaderId = this.agent.teamLeaderId != null ? this.agentService.getAgent(this.agent.teamLeaderId).id : null;
           this.form.setValue({
             name: this.agent.name,
             email: this.agent.email,
             company: this.agent.company,
             phone: this.agent.phone,
             teamLeaderId
           })
          }
        }    
        ); 
  }

  saveAgent(){
    if(this.editMode){
      this.agentService.updateAgent(this.agentId, this.form.value)
    }
    else{
      this.agentService.addAgent(this.form.value)
    }
    this.router.navigate(['agents'])
  }
}
