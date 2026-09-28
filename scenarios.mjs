const laptop={title:'Collect the repaired laptop',owner:'You',due:'Friday, before 6 pm',dependency:'Bring the collection receipt',status:'open',alarm:'Friday, 4 pm'};
const base=[
  {id:'p1',kind:'propose',source:'conversation-a',time:'Thu · 8:30 AM',speaker:'You',spoken:'I’ll collect the laptop tomorrow. The shop closes at six; I need the receipt.',task:laptop,confidence:.96},
  {id:'a1',kind:'approve',time:'Thu · 8:31 AM',speaker:'BeeLoop',spoken:'You approve the commitment.'}
];
export const scenarios=[
  {name:'The shop changes its closing time',events:[...base,
    {id:'c1',kind:'change',source:'conversation-b',time:'Thu · 1:05 PM',speaker:'Shop assistant',spoken:'Quick correction: we’re closing at four tomorrow, not six.',patch:{due:'Friday, before 4 pm',alarm:'Friday, 2 pm'},before:'Friday, before 6 pm · reminder at 4 pm',after:'Friday, before 4 pm · reminder at 2 pm',confidence:.94},
    {id:'a2',kind:'approve',time:'Thu · 1:06 PM',speaker:'BeeLoop',spoken:'You approve the repaired deadline.'},
    {id:'c2',kind:'change',source:'conversation-c',time:'Thu · 7:10 PM',speaker:'You',spoken:'I found the receipt. I’ll leave it by the door.',patch:{dependency:'Receipt by the door — take it when leaving'},before:'Bring the collection receipt',after:'Receipt by the door — take it when leaving',confidence:.98},
    {id:'a3',kind:'approve',time:'Thu · 7:11 PM',speaker:'BeeLoop',spoken:'You approve the preparation update.'},
    {id:'d1',kind:'done',source:'conversation-d',time:'Fri · 2:32 PM',speaker:'You',spoken:'I collected the laptop. It’s home now.',before:'Open commitment',after:'Completed — reminder cleared',confidence:.99},
    {id:'a4',kind:'approve',time:'Fri · 2:33 PM',speaker:'BeeLoop',spoken:'You confirm completion.'}
  ]},
  {name:'The wrong person was assigned',events:[...base,
    {id:'k1',kind:'correct',source:'user-correction',time:'Thu · 8:34 AM',speaker:'You',spoken:'Correction: Sam promised to collect it. I was the one asking.',patch:{owner:'Sam',alarm:null,dependency:'Share approved pickup details with Sam'},before:'Owner: You · personal alarm active',after:'Owner: Sam · personal alarm cleared',confidence:1},
    {id:'a2',kind:'approve',time:'Thu · 8:35 AM',speaker:'BeeLoop',spoken:'You approve the repaired owner.'}
  ]},
  {name:'A tentative handoff becomes confirmed',events:[...base,
    {id:'q1',kind:'ambiguous',source:'conversation-e',time:'Thu · 11:20 AM',speaker:'You',spoken:'Maybe Sam can collect it if the meeting finishes early.',question:'Is Sam confirmed, or are you still responsible?',confidence:.61},
    {id:'r1',kind:'resolved',source:'conversation-f',time:'Thu · 2:45 PM',speaker:'Sam',spoken:'Confirmed. I’ll collect it before four.',patch:{owner:'Sam',due:'Friday, before 4 pm',alarm:null},before:'Owner uncertain · Friday before 6 pm',after:'Sam confirmed · Friday before 4 pm',confidence:.97},
    {id:'a2',kind:'approve',time:'Thu · 2:46 PM',speaker:'BeeLoop',spoken:'You approve the confirmed handoff.'}
  ]},
  {name:'The pickup is cancelled',events:[...base,
    {id:'x1',kind:'cancel',source:'conversation-g',time:'Thu · 4:10 PM',speaker:'Shop assistant',spoken:'Don’t come in—the shop is delivering it instead.',confidence:.97},
    {id:'a2',kind:'approve',time:'Thu · 4:11 PM',speaker:'BeeLoop',spoken:'You approve cancellation and clear the reminder.'}
  ]}
];
