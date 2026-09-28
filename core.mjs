export function initialState(){return{task:null,pending:null,seen:[],sources:[],message:'Waiting for an eligible conversation.',writes:0,online:true,confidence:0.96,change:null}}
export function reduce(previous,event){
  const state=structuredClone(previous);
  if(event.id&&state.seen.includes(event.id)){state.message='Duplicate Bee event ignored.';return state}
  if(event.id)state.seen.push(event.id);
  if(event.source&&!state.sources.includes(event.source))state.sources.push(event.source);
  if(event.confidence)state.confidence=event.confidence;
  switch(event.kind){
    case'propose':state.pending={...event.task};state.change={type:'new',label:'Create one commitment'};state.message='BeeLoop found a commitment. Review before creating it.';break;
    case'approve':if(state.pending){state.task={...state.pending};state.pending=null;state.writes++;state.change=null;state.message='Approved. One source-linked commitment is active.'}break;
    case'change':if(state.task&&state.task.status==='open'){state.pending={...state.task,...event.patch};state.change={type:'repair',before:event.before,after:event.after};state.message='A later Bee conversation changed this plan.'}break;
    case'correct':if(state.task){state.pending={...state.task,...event.patch};state.change={type:'repair',before:event.before,after:event.after};state.message='An explicit correction overrides the earlier interpretation.'}break;
    case'ambiguous':state.change={type:'question',question:event.question};state.message='BeeLoop needs one clarification before changing the plan.';break;
    case'resolved':if(state.task)state.pending={...state.task,...event.patch};state.change={type:'repair',before:event.before,after:event.after};state.message='Clarification received. Review the repaired plan.';break;
    case'cancel':if(state.task){state.pending={...state.task,status:'cancelled',alarm:null};state.change={type:'repair',before:'Active pickup reminder',after:'Cancelled — reminder removed'};state.message='Cancellation detected.'}break;
    case'done':if(state.task){state.pending={...state.task,status:'complete',alarm:null};state.change={type:'repair',before:'Open commitment',after:'Completed — reminder cleared'};state.message='Completion detected.'}break;
    case'disconnect':state.online=false;state.message='Bee stream disconnected. Nothing changes silently.';break;
    case'reconcile':state.online=true;if(state.task&&event.patch){state.pending={...state.task,...event.patch};state.change={type:'repair',before:event.before,after:event.after};state.message='BeeLoop recovered a retained change after reconnection.'}break;
    case'noise':state.message='No commitment found. No action created.';break;
  }
  return state;
}
export const stateAt=(scenario,index)=>scenario.events.slice(0,index+1).reduce(reduce,initialState());
