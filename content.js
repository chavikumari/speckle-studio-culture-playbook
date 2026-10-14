// Twelve unique panels drive navigation and locally saved exploration progress.
export const GUIDES = [
 {id:'manifesto',title:'The Speckle Manifesto',short:'Manifesto',type:'Unfold a little of us',panels:[
  {id:'people',label:'Our people',title:'Different minds. One collective.',intro:'Independent contractors. One small, distributed studio.'},
  {id:'values',label:'Our values',title:'Different is good.',intro:'Five things we bring to the table.'},
  {id:'standards',label:'Our standards',title:'Handle with respect.',intro:'The things we always stand by.'},
  {id:'first-week',label:'Your first week',title:'You belong in the picture.',intro:'Six little hellos. Take them at your pace.'}
 ]},
 {id:'weekly',title:'The Weekly Dispatch',short:'Weekly Dispatch',type:'A little rhythm. A lot of room.',panels:[
  {id:'clock',label:'Our clock',title:'Your time. Your rhythm.',intro:'10 AM–7 PM: coordination, not attendance.'},
  {id:'week',label:'Our week',title:'Room to make. Time to meet.',intro:'Choose the shared day together each week.'},
  {id:'communication',label:'Keep in touch',title:'Good ideas travel.',intro:'A right place for every kind of message.'},
  {id:'planner',label:'Your planner',title:'Make a little room.',intro:'Big plans. Small wins. All yours.'}
 ]},
 {id:'directory',title:'The Decision Directory',short:'Decision Directory',type:'Good work. Clear decisions.',panels:[
  {id:'leadership',label:'Who decides?',title:'Every idea has a place.',intro:'Shared thinking. Clear responsibility.'},
  {id:'decisions',label:'Ask or act?',title:'Which way from here?',intro:'Follow the impact of your decision.'},
  {id:'quality',label:'Good work',title:'The Good Work Department.',intro:'Tap the notes. Look a little closer.'},
  {id:'feedback',label:'Feedback',title:'Send it. Shape it. Ship it.',intro:'Critique the work, not the person.'}
 ]}
];
export const PANEL_IDS = GUIDES.flatMap(g=>g.panels.map(p=>p.id));
export const normalizeExplored = value => [...new Set(Array.isArray(value)?value.filter(id=>PANEL_IDS.includes(id)):[])];
export function progressSummary(value){const ids=normalizeExplored(value);return {count:ids.length,total:12,percent:Math.round(ids.length/12*100),complete:GUIDES.filter(g=>g.panels.every(p=>ids.includes(p.id))).map(g=>g.id)};}
export const ROLES=[['Founder','Direction'],['Designers','Visual ideas'],['Writers','Stories'],['Strategists','Clear thinking'],['Motion creatives','Movement'],['Technical collaborators','Digital craft']];
export const VALUES=[
 ['spark','Individuality','Bring your own perspective.','Ask questions, challenge ideas and contribute your own way of thinking.'],
 ['together','Collaboration','Better ideas, together.','Share context, listen and ask for help. Independent work still needs connection.'],
 ['eye','Attention to detail','Small things. Big difference.','Give research, reasoning, words and execution the same thoughtful care.'],
 ['trust','Trust + accountability','Own it. Follow through.','Honour agreed deliverables and deadlines. Flag problems early and agree the next step.'],
 ['flower','Recognition + respect','See the person. Share the credit.','Respect every role and contribution. Celebrate little wins and give appropriate credit.']
];
export const ONBOARDING=[
 ['coffee','Meet your buddy','Your friendly first stop for questions.'],
 ['together','Meet your team','Get to know your collaborators and project lead.'],
 ['book','Know the project','Find the brief, resources, responsibilities and shared project space.'],
 ['clock','Set availability','Agree deliverables, deadlines, review times and response expectations.'],
 ['spark','Join the gathering','Meet the collective at the weekly gathering. Bring a reference or something to share.'],
 ['chat','First-week check-in','Check in with your buddy or project lead. Ask what you need to settle in.']
];
export const CHANNELS=[
 ['chat','Chat','Quick + casual','Updates + quick questions','Use chat for casual updates and quick questions. Replies follow declared availability and agreed deadlines; nobody needs to stay constantly online.'],
 ['file','Project space','The source of truth','Briefs · tasks · decisions','Keep tasks, deadlines, briefs, feedback and final decisions in the shared project space. Record changes so everyone can find them.'],
 ['live','Live session','Think together','Discuss + work together','Use a live session for discussions that need real-time collaboration. Arrange a time within agreed availability and record the decisions afterwards.']
];
export const CHECKPOINTS=[
 ['Research','Know the problem.','Understand the brief, the audience and what the work must solve.'],
 ['Concept','Have a clear reason.','Explain the logic behind the idea and why it serves the project.'],
 ['Relevance','Answer the brief.','Make the work useful in its intended context, not just attractive.'],
 ['Craft','Care for the details.','Refine the words, spacing, formats and execution. Small things count.'],
 ['Review','Take a second look.','Apply feedback and confirm approval. The project lead handles routine reviews; the founder approves major changes.']
];
export const FEEDBACK=[['send','Share work'],['chat','Explain why'],['eye','Hear feedback'],['revise','Revise'],['tick','Get approval'],['parcel','Document + deliver']];
