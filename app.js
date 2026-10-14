import {toolRequestText} from './tool-request.js';
import {giftMarkup,coffeeRule,receiptText} from './gift.js';
import {editorialArt} from './reference-art.js';
import {currentArt} from './current-art.js';
import {GUIDES,normalizeExplored} from './content.js';
import {icon,symbols,mailroomArt} from './art.js';
import {tableMarkup,guideMarkup,deskMarkup} from './guide.js';
const STORAGE_KEY = 'speckle-postal-visual-draft-v2';
const colors = [{name:'Postal Coral',hex:'#FF7D65'},{name:'Postcard Blue',hex:'#BAD6FE'},{name:'Blush Peach',hex:'#FFDED4'},{name:'Stamp Yellow',hex:'#FFDE59'},{name:'Paper Cream',hex:'#F3EFD0'}];
const artifacts=[...GUIDES,{id:'treat',title:'The Little Treat Card',type:'A little bonus'}];
const safe = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let stored = {};
try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; } catch { /* The experience also works without browser storage. */ }
const state = {
  name:typeof stored.name === 'string' ? stored.name.slice(0,32) : '',
  symbol:symbols.some(s=>s.id===stored.symbol) ? stored.symbol : 'spark',
  color:colors.some(c=>c.hex===stored.color) ? stored.color : '#FF7D65',
  explored:normalizeExplored(stored.explored),
  checklist:Array.isArray(stored.checklist) ? stored.checklist.filter(i=>Number.isInteger(i)&&i>=0&&i<6) : [],
  coffeeReceipts:Array.isArray(stored.coffeeReceipts)?stored.coffeeReceipts.filter(r=>r&&typeof r.id==='string'&&typeof r.date==='string'&&Number.isFinite(r.amount)&&r.amount>0&&r.amount<=500).map(r=>({id:r.id.slice(0,80),date:r.date.slice(0,10),amount:r.amount,cafe:String(r.cafe||'').slice(0,100),filename:String(r.filename||'').slice(0,180)})):[],
  toolRequests:Array.isArray(stored.toolRequests)?stored.toolRequests.filter(r=>r&&typeof r.id==='string'&&typeof r.tool==='string'&&typeof r.reason==='string').map(r=>({id:r.id.slice(0,80),tool:r.tool.slice(0,120),plan:String(r.plan||'').slice(0,120),project:String(r.project||'').slice(0,160),reason:r.reason.slice(0,1500)})):[],
  founderContact:typeof stored.founderContact==='string'?stored.founderContact.slice(0,200):'',
  receiptContact:typeof stored.receiptContact==='string'?stored.receiptContact.slice(0,200):'',
  planner:{}, treat:[0,1,2].includes(stored.treat)?stored.treat:null,
  arrived:stored.arrived===true
};
const plannerKeys=['week','focus','priority1','priority2','priority3','deadlines','people','anticipation','win'];
for(const key of plannerKeys) state.planner[key]=typeof stored.planner?.[key]==='string'?stored.planner[key].slice(0,2000):'';
// Every visit starts at hello; saved progress is resumed only by choice.
let screen = 'welcome';
let identityReturn = 'mailroom';
let modal=null, page=0;
let ui={channel:null,route:null,proof:0,person:null,value:0,coffee:false,form:false,toolkit:false,receiptId:null,toolRequestId:null};
let lastOpener = null, toastTimer, saveTimer;
const app = document.getElementById('app'), dialog = document.getElementById('artifact-dialog');
const $ = selector => document.querySelector(selector);
const displayName = () => state.name || 'creative friend';
function persist() {try {localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true;} catch{return false;}}
function announce(message) {$('#announcement').textContent='';requestAnimationFrame(()=>$('#announcement').textContent=message);}
function toast(message) {clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3500);}
function go(next) {screen=next;render();window.scrollTo({top:0,behavior:'instant'});}
function header() {return `<header class="site-header"><button class="brand" data-action="home" aria-label="Speckle Postal Service home"><span class="brand-mark">speckle${icon('spark')}</span><span class="brand-divider"></span><span class="brand-service mono">POSTAL<br>SERVICE</span></button><div class="header-actions">${screen==='table'?`<button class="visitor-button" data-action="edit-id" aria-label="Edit postal identity for ${safe(displayName())}">${icon(state.symbol)}${safe(displayName())}</button>`:''}<button class="about-button" data-action="about" aria-label="About this little place"><span>About this little place</span><span aria-hidden="true">↗</span></button><div class="edition mono">EST.<br>TOGETHER</div></div></header>`;}
function footer() {return `<footer class="site-footer mono"><span class="footer-note">${icon('spark')} Independent by nature. Connected by design.</span><span>A CULTURE PLAYBOOK BY SPECKLE STUDIOS</span><span>HANDLED WITH CARE ↗</span></footer>`;}
function journey(current) {return `<nav class="journey-strip" aria-label="Your delivery journey">${[['Say hello','welcome'],['Make your mark','identity'],["You’ve got mail",'mailroom']].map(([label,destination],i)=>`${i?'<span class="journey-line" aria-hidden="true"></span>':''}<button type="button" class="journey-item ${i===current?'current':''}" data-action="journey" data-screen="${destination}" ${i===current?'aria-current="step"':''}><span class="step-number">0${i+1}</span>${label}</button>`).join('')}</nav>`;}
function illustration(interactive=false){if(!interactive)return `<div class="welcome-editorial"><span class="welcome-window"><span class="window-controls"><i></i><i></i><i></i></span><span class="mono">A VERY SPECIAL DELIVERY</span>${editorialArt('letter')}<span class="welcome-sticker mono">FROM SPECKLE<br>WITH CARE.</span></span><span class="welcome-spark" aria-hidden="true">✳</span><span class="welcome-mini-folder" aria-hidden="true"></span></div>`;return `<div class="illustration original-mailroom">${mailroomArt()}<button style="background:${state.color}" class="envelope-target interactive" data-action="open-mail" aria-label="Open your special delivery, addressed to ${safe(displayName())}"><span class="envelope-symbol">${icon(state.symbol)}</span><span>SPECIAL DELIVERY</span><strong>${safe(displayName())}</strong><span class="target-from">FROM: SPECKLE STUDIOS</span></button></div>`;}
function welcome(){return `<main id="main" class="welcome-main restored-welcome"><div class="welcome-copy"><div class="eyebrow mono">A LITTLE SOMETHING, JUST FOR YOU</div><h1 tabindex="-1">Oh, hello<br>there!</h1><p>Good ideas travel. Your welcome packet has arrived.</p><form class="name-form" id="name-form"><label for="visitor-name">What should we call you?</label><div class="input-row"><input id="visitor-name" name="name" autocomplete="given-name" placeholder="Your name…" maxlength="32" required value="${safe(state.name)}"><button class="primary" type="submit">That's me! ${icon('arrow')}</button></div></form><p class="small-note mono">A SMALL STUDIO. A WORLD OF DIFFERENT MINDS.</p>${state.arrived?'<button class="text-button resume-link" data-action="table">Your packet is waiting. Back to the table ↗</button>':''}</div><div class="welcome-art-wrap">${illustration()}<p class="art-note hand">Good things are on their way.</p></div></main>${journey(0)}`;}
function identity() {return `<main id="main" class="stage-main"><button class="back-button" data-action="identity-back">← ${identityReturn==='table'?'Back to the table':'Back to hello'}</button><div class="identity-layout"><div class="identity-copy"><div class="eyebrow mono">A stamp of individuality</div><h1 tabindex="-1">One of a kind.<br>Just like you.</h1><p>Your colour. Your mark. Your little corner of Speckle.</p><fieldset class="field-group"><legend>01 / Pick your little mark</legend><div class="symbol-options">${symbols.map(s=>`<button class="symbol-choice" data-action="select-symbol" data-symbol="${s.id}" aria-label="${s.name}" aria-pressed="${state.symbol===s.id}">${icon(s.id)}</button>`).join('')}</div></fieldset><fieldset class="field-group"><legend>02 / Add a little colour</legend><div class="color-options">${colors.map(c=>`<button class="color-choice" data-action="select-color" data-color="${c.hex}" style="background:${c.hex}" aria-label="${c.name}" aria-pressed="${state.color===c.hex}"></button>`).join('')}</div></fieldset><button class="primary" data-action="seal">Seal the deal! ${icon('arrow')}</button><p class="small-note mono">Officially unofficial. Uniquely yours.</p></div><div class="identity-preview"><div class="id-card"><div class="id-card-header"><strong>speckle postal service</strong><span class="mono">COLLECTIVE<br>POSTAL ID</span></div><div class="id-card-body"><div class="personal-stamp" style="--stamp-color:${state.color}">${icon(state.symbol)}<span class="mono">ONE OF A KIND</span></div><div><span class="mono">THIS ONE BELONGS TO</span><div class="id-name">${safe(displayName())}</div><span class="mono" style="font-size:9px">INDEPENDENT CREATIVE<br>PART OF THE PICTURE</span></div></div><div class="id-card-footer mono"><span>VALID WHEREVER YOU CREATE.</span><span>SP / 001</span></div></div><p class="identity-scribble hand">Looks a little like you already.</p></div></div></main>${journey(1)}`;}
function mailroom() {return `<main id="main" class="mailroom-main"><div class="mailroom-copy"><div class="eyebrow mono">The good stuff has arrived</div><h1 tabindex="-1">You've<br>got mail!</h1><p>One of these has your name on it. Go find it.</p><p class="hand">A busy little place, this.</p><button class="text-button open-mail-shortcut" data-action="open-mail">Need a hand? Open my letter ↗</button></div>${illustration(true)}</main>${journey(2)}`;}
function reveal() {return `<main id="main" class="reveal-main"><div class="reveal-envelope" aria-hidden="true"></div><article class="reveal-letter"><div class="letter-top"><span class="mono">SPECKLE STUDIOS<br>A VERY SPECIAL DELIVERY</span>${icon(state.symbol)}</div><p class="hand">Dear ${safe(displayName())},</p><h1 tabindex="-1">Welcome to Speckle!</h1><div class="welcome-letter-copy"><p>We’re so glad you’re here. Every person brings a different way of seeing, making and thinking. There’s a place for yours at our table.</p><p>We’re a small creative collective, working from different places and coming together around thoughtful projects. We share ideas, ask questions and make room for each other’s strengths. You don’t need to have everything figured out on day one.</p><p>This little welcome packet is here to help you settle in: meet the people, find our working rhythm and see how we make good things together. Explore it at your own pace, and reach out to your buddy or project lead whenever you need a hand.</p><p>Bring your curiosity, your perspective and a little of what makes you, you. We’re looking forward to what we’ll make together.</p></div><div class="vd-letter-illustration">${currentArt('team')}</div><p class="signature">With care,<br><span class="hand">The Speckle Team</span></p><button class="primary coral" data-action="table">Let's have a look! ${icon('arrow')}</button></article></main>`;}
function table(){return tableMarkup(state);}
function render(focus=true) {app.innerHTML=`<div class="page ${['mailroom','reveal'].includes(screen)?'mailroom-page':screen==='table'?'table-page':''}">${header()}${({welcome,identity,mailroom,reveal,table}[screen]||welcome)()}${footer()}</div>`;if(focus) $('#main h1')?.focus({preventScroll:true});}

function bar(label) {return `<div class="dialog-bar"><span class="mono">SPECKLE POSTAL SERVICE / ${label}</span><button class="close-button" data-action="close" autofocus>Put it back <span aria-hidden="true">×</span></button></div>`;}
function aboutContent() {return `${bar('A LITTLE CONTEXT')}<div class="about-content">${icon('spark')}<h2 id="dialog-title">Different minds.<br>One collective.</h2><p>A small, distributed consultancy. Independent contractors making thoughtful things together.</p><p>This is a separate visual draft of our fictional culture guide.</p><hr class="rule"><p class="mono">YOUR NAME, STAMP, CHECKLIST, PLANNER, TOOL REQUESTS AND COFFEE RECORDS STAY IN THIS BROWSER. REIMBURSEMENT EMAILS OPEN AS DRAFTS IN YOUR EMAIL APP.</p><p class="small-note">The Little Treat Card is a concept demo. It doesn't issue a gift or voucher. Fonts are served by Google Fonts.</p><button class="primary coral" data-action="close">Back to the good stuff ${icon('arrow')}</button></div>`;}

function explorePanel(){
 const p=GUIDES.find(g=>g.id===modal)?.panels[page];
 if(!p||state.explored.includes(p.id))return;
 state.explored.push(p.id);persist();
 const n=state.explored.length;
 announce(`${n} of 12 sections explored.`);
 if(n===12)toast('Special delivery complete! 100% explored.');
}
function renderDialog(focusKey=null){
 const scroll=dialog.scrollTop;
 dialog.classList.toggle('modal-small',modal==='about');dialog.classList.toggle('gift-dialog',modal==='treat');
 dialog.classList.toggle('vd-focus',GUIDES.some(g=>g.id===modal));
 if(modal==='about')$('#dialog-content').innerHTML=aboutContent();
 else if(modal==='treat')$('#dialog-content').innerHTML=`${bar('A LITTLE BONUS')}<article class="artifact-body"><h2 id="dialog-title" class="sr-only" tabindex="-1">Your studio gift coupons</h2>${giftMarkup(state,ui)}</article>`;
 else $('#dialog-content').innerHTML=guideMarkup(modal,page,state,ui);
 if(focusKey){(dialog.querySelector(`[data-focus="${focusKey}"]`)||$('#dialog-title'))?.focus({preventScroll:true});dialog.scrollTop=scroll;}
}
function openModal(id,opener){
 if(!['about',...artifacts.map(a=>a.id)].includes(id))return;
 if(!dialog.open)lastOpener=opener?.id||null;
 modal=id;page=0;ui={channel:null,route:null,proof:0,person:null,value:0,coffee:false,form:false,toolkit:false,receiptId:null,toolRequestId:null};
 explorePanel();renderDialog();dialog.scrollTop=0;
 if(!dialog.open)dialog.showModal();
}
function updateIdentity(action,value) {if(action==='select-symbol'&&symbols.some(s=>s.id===value))state.symbol=value;if(action==='select-color'&&colors.some(c=>c.hex===value))state.color=value;persist();render(false);const selector=action==='select-symbol'?`[data-symbol="${value}"]`:`[data-color="${value}"]`;$(selector)?.focus({preventScroll:true});}

function downloadPlanner(){
 const fields={week:'Week of',priority1:'Priority 1',priority2:'Priority 2',priority3:'Priority 3',deadlines:'Deadlines',people:'Coordination reminders',win:'One small win'};
 const txt=`THE POCKET PLANNER\n${displayName()} · Speckle Studios\n\n${Object.entries(fields).map(([k,v])=>`${v}\n${state.planner[k]||'—'}`).join('\n\n')}\n\nYour week. Your way.`;
 const url=URL.createObjectURL(new Blob([txt],{type:'text/plain;charset=utf-8'}));
 const link=document.createElement('a');link.href=url;link.download='speckle-pocket-planner.txt';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);persist();toast('Your planner copy is ready to keep.');
}
function handleClick(event){
 const button=event.target.closest('button[data-action]');if(!button||button.disabled)return;
 const action=button.dataset.action,focus=button.dataset.focus;
 switch(action){
 case 'home':go('welcome');break;
 case 'journey':{const next=button.dataset.screen;if(!['welcome','identity','mailroom'].includes(next))break;if(screen==='welcome'&&next!=='welcome'){const name=$('#visitor-name')?.value.trim();if(name){state.name=name.slice(0,32);persist();}}if(next==='identity')identityReturn='mailroom';go(next);break;}
 case 'about':openModal('about',button);break;
 case 'edit-id':identityReturn='table';go('identity');break;
 case 'identity-back':go(identityReturn==='table'?'table':'welcome');break;
 case 'select-symbol':updateIdentity(action,button.dataset.symbol);break;
 case 'select-color':updateIdentity(action,button.dataset.color);break;
 case 'seal':persist();go(identityReturn);announce('Your postal identity is sealed.');break;
 case 'open-mail':go('reveal');break;
 case 'table':state.arrived=true;persist();go('table');break;
 case 'open-artifact':openModal(button.dataset.artifact,button);break;
 case 'close':dialog.close();finishClose();break;
 case 'guide-page':page=Number(button.dataset.page);explorePanel();renderDialog(focus);break;
 case 'check-step':{const i=Number(button.dataset.step);state.checklist=state.checklist.includes(i)?state.checklist.filter(n=>n!==i):[...state.checklist,i];persist();renderDialog(focus);break;}
 case 'value':ui.value=Number(button.dataset.value);renderDialog(focus);break;
 case 'person':ui.person=Number(button.dataset.value);renderDialog(focus);break;
 case 'channel':ui.channel=Number(button.dataset.value);renderDialog(focus);break;
 case 'route':ui.route=button.dataset.value;renderDialog(focus);break;
 case 'proof-note':ui.proof=Number(button.dataset.value);renderDialog(focus);break;
 case 'gift-coffee':ui.coffee=true;renderDialog();$('#dialog-title')?.focus();break;
 case 'gift-back':ui.coffee=false;ui.toolkit=false;ui.form=false;ui.receiptId=null;renderDialog();break;
 case 'gift-toolkit':ui.toolkit=true;ui.toolRequestId=null;renderDialog();dialog.scrollTop=0;break;
 case 'tool-remove':state.toolRequests=state.toolRequests.filter(r=>r.id!==ui.toolRequestId);ui.toolRequestId=null;persist();renderDialog();announce('Draft removed.');break;
 case 'tool-new':ui.toolRequestId=null;renderDialog();dialog.querySelector('[name=tool]')?.focus();break;
 case 'tool-request':ui.toolRequestId=button.dataset.id;renderDialog();dialog.querySelector('[name=founderContact]')?.focus();break;
 case 'tool-download':{const r=state.toolRequests.find(r=>r.id===ui.toolRequestId);if(r){const url=URL.createObjectURL(new Blob([toolRequestText(state,r)],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='speckle-tool-request.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}break;}
 case 'coffee-form':ui.form=true;renderDialog();dialog.querySelector('[name="amount"]')?.focus();break;
 case 'coffee-form-close':ui.form=false;renderDialog();break;
 case 'coffee-email':ui.receiptId=button.dataset.id;renderDialog();dialog.querySelector('[name="contact"]')?.focus();break;
 case 'coffee-remove':state.coffeeReceipts=state.coffeeReceipts.filter(r=>r.id!==button.dataset.id);if(ui.receiptId===button.dataset.id)ui.receiptId=null;persist();renderDialog();announce('Coffee removed from the demo pass.');break;
 case 'coffee-download':{const r=state.coffeeReceipts.find(r=>r.id===ui.receiptId);if(r){const url=URL.createObjectURL(new Blob([receiptText(state,r)],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='speckle-coffee-receipt.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}break;}
 case 'save-planner':downloadPlanner();break;
 case 'print-planner':persist();window.print();break;
 }
}
app.addEventListener('click',handleClick);dialog.addEventListener('click',handleClick);
app.addEventListener('submit',event=>{if(event.target.id!=='name-form')return;event.preventDefault();const input=$('#visitor-name'),name=input.value.trim();if(!name){input.setCustomValidity('A name or nickname will do.');input.reportValidity();input.addEventListener('input',()=>input.setCustomValidity(''),{once:true});return;}state.name=name.slice(0,32);persist();identityReturn='mailroom';go('identity');});
dialog.addEventListener('input',event=>{const key=event.target.dataset.planner;if(!plannerKeys.includes(key))return;state.planner[key]=event.target.value;clearTimeout(saveTimer);const saved=persist();const status=$('#save-status');if(status)status.textContent=saved?'SAVED IN THIS BROWSER':'SAVING UNAVAILABLE — DOWNLOAD A COPY';});
dialog.addEventListener('keydown',event=>{if(event.target.matches('[role="tab"]')&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();page=event.key==='Home'?0:event.key==='End'?3:(page+(event.key==='ArrowRight'?1:3))%4;explorePanel();renderDialog(`tab-${page}`);}});
function finishClose(){modal=null;if(screen==='table'){render(false);if(lastOpener)document.getElementById(lastOpener)?.focus({preventScroll:true});}}
dialog.addEventListener('close',()=>{if(dialog.open||modal===null)return;finishClose();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
window.addEventListener('pagehide',persist);
render(false);

dialog.addEventListener('submit',event=>{
 if(event.target.id==='tool-request-form'){
  event.preventDefault();const data=new FormData(event.target),reason=String(data.get('reason')||'').trim();
  if(!reason){toast('Tell us why you need this tool.');return;}
  const r={id:crypto.randomUUID(),tool:String(data.get('tool')).slice(0,120),plan:String(data.get('plan')||'').trim().slice(0,120),project:String(data.get('project')||'').trim().slice(0,160),reason:reason.slice(0,1500)};
  state.toolRequests.push(r);persist();ui.toolRequestId=r.id;renderDialog();dialog.querySelector('[name=founderContact]')?.focus();announce('Request prepared. Founder approval is required.');
 }
 if(event.target.id==='tool-email-form'){
  event.preventDefault();const r=state.toolRequests.find(r=>r.id===ui.toolRequestId);if(!r)return;
  state.founderContact=String(new FormData(event.target).get('founderContact')||'').trim();persist();
  window.location.href=`mailto:${encodeURIComponent(state.founderContact)}?subject=${encodeURIComponent('Creative tool request — '+r.tool)}&body=${encodeURIComponent(toolRequestText(state,r))}`;
 }
 if(event.target.id==='coffee-receipt-form'){
  event.preventDefault();const form=event.target,data=new FormData(form);const date=String(data.get('date')),amount=Number(data.get('amount')),error=coffeeRule(state,date,amount);
  if(error){toast(error);return;}
  const r={id:crypto.randomUUID(),date,amount,cafe:String(data.get('cafe')||'').trim().slice(0,100),filename:form.elements.receipt.files[0]?.name.slice(0,180)||''};
  state.coffeeReceipts.push(r);const saved=persist();ui.form=false;ui.receiptId=r.id;renderDialog();dialog.querySelector('[name="contact"]')?.focus();toast(saved?'Coffee recorded. Prepare your receipt email below.':'Recorded for this visit. Browser saving is unavailable.');
 }
 if(event.target.id==='coffee-email-form'){
  event.preventDefault();const r=state.coffeeReceipts.find(r=>r.id===ui.receiptId);if(!r)return;
  state.receiptContact=String(new FormData(event.target).get('contact')||'').trim();persist();
  window.location.href=`mailto:${encodeURIComponent(state.receiptContact)}?subject=${encodeURIComponent('Speckle coffee reimbursement — '+r.date)}&body=${encodeURIComponent(receiptText(state,r))}`;
  toast('Attach your receipt in the email draft before sending.');
 }
});
