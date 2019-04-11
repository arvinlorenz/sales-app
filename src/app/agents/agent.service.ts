import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  agents = [
    {
      id: '21421',
      name: 'Arvin Pineda',
      email: 'arvinlorenz@gmail.com',
      phone: '99999999',
      company: 'DR',
      teamLeaderId: '214211'
    },
    {
      id: '214211',
      name: 'Jay',
      email: 'jay@gmail.com',
      phone: '99999999',
      company: 'DR',
      teamLeaderId: null
    },
    {
      id: '214210',
      name: 'Gabriel',
      email: 'gabe@gmail.com',
      phone: '99999999',
      company: 'DR',
      teamLeaderId: '214211'
    },
  ]

  private agentsUpdated = new Subject<any>();
  constructor() { }

  getAllAgents(){
    return [...this.agents]
  }
  getAgent(id){
    return this.getAllAgents().find(agent=>{
      return id == agent.id
    })
  }
  getMembers(id){
    return this.getAllAgents().filter(agent=>{
      return agent.teamLeaderId === id
    })
  }

  updateAgent(id, newData){
    let allAgents = this.getAllAgents();
    let i = allAgents.findIndex(agent=>{
      return agent.id === id 
    })
    allAgents[i] = {...allAgents[i], ...newData};
    this.agents = allAgents
    console.log(this.agents)
    this.agentsUpdated.next(this.agents)
  }

  updateAgentListener(){
    return this.agentsUpdated.asObservable();
  }

  addAgent(agent){
    let id = new Date().getTime().toString()
    
    let allAgents = this.getAllAgents();
    allAgents.push({id, ...agent})
    this.agents = allAgents
    this.agentsUpdated.next(this.agents)
    console.log(this.agents)
  }
}
