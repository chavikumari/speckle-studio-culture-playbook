// Original editorial vignettes generated from the user's chosen grainy reference.
// Each viewport selects one square of an atlas without distorting its proportions.
const sheets={
 'welcome-moments':'./assets/welcome-moments.png',
 'creative-workflow':'./assets/creative-workflow.png',
 'creative-decisions':'./assets/creative-decisions.png'
};
const scenes={
 buddy:['welcome-moments',0],team:['welcome-moments',1],brief:['welcome-moments',2],
 clock:['welcome-moments',3],gathering:['welcome-moments',4],checkin:['welcome-moments',5],
 chat:['creative-workflow',0],project:['creative-workflow',1],live:['creative-workflow',2],
 revise:['creative-workflow',3],approval:['creative-workflow',4],deliver:['creative-workflow',5],
 founder:['creative-decisions',0],lead:['creative-decisions',1],designer:['creative-decisions',2],
 coordinate:['creative-decisions',3],consult:['creative-decisions',4],proof:['creative-decisions',5]
};
export function currentArt(kind,cls=''){
 const [sheet,cell]=scenes[kind]||scenes.team;
 const x=(cell%3)*512,y=Math.floor(cell/3)*512;
 return `<span class="ink-art ink-art-${kind} ${cls}" aria-hidden="true"><svg viewBox="${x} ${y} 512 512" preserveAspectRatio="xMidYMid meet" focusable="false"><image href="${sheets[sheet]}" width="1536" height="1024"/></svg></span>`;
}
