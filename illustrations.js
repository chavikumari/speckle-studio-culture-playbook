// Editable vector drawings extend the original Speckle postal illustration system.
const C={ink:'#5F130D',cream:'#F3EFD0',coral:'#FF7D65',blue:'#BAD6FE',peach:'#FFDED4',yellow:'#FFDE59'};
const wrap=(body,view='0 0 180 180',cls='drawing')=>`<svg class="${cls}" viewBox="${view}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g stroke="${C.ink}" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`;
export function drawing(kind,cls='drawing') {
 const paths={
  spark:`<path d="M90 12 103 63 148 34 117 78 169 90 117 105 148 148 104 119 90 171 76 119 32 148 61 104 10 90 61 76 32 32 76 61Z" fill="${C.coral}"/><path d="M70 89v7m40-7v7m-33 16q13 13 27-1" fill="none"/>`,
  together:`<path d="M23 52h48v31H57v33H23Z" fill="${C.blue}"/><path d="M108 53h49v64h-33V87h-16Z" fill="${C.coral}"/><path d="M54 89h66v56H54Z" fill="${C.yellow}"/><circle cx="45" cy="70" r="2"/><circle cx="135" cy="70" r="2"/><path d="m45 119 19 16m71-17-19 17M80 108v5m19-5v5m-18 13q9 6 17-1" fill="none"/>`,
  eye:`<path d="M15 92q75-91 150 0-75 85-150 0Z" fill="${C.peach}"/><circle cx="90" cy="90" r="33" fill="${C.blue}"/><circle cx="90" cy="90" r="13" fill="${C.ink}"/><circle cx="98" cy="80" r="5" fill="${C.cream}" stroke="none"/><path d="m47 45-8-15m51 1V12m40 34 12-17M54 143l-7 14m44-6v17m40-27 8 14" fill="none"/>`,
  trust:`<path d="M32 35h116v64q-9 43-58 62-49-19-58-62Z" fill="${C.blue}"/><path d="m61 90 21 23 39-47" fill="none" stroke-width="8"/><path d="M51 22h78m-70 150h62" fill="none"/>`,
  flower:`<path d="M90 63C43 4 3 60 56 87 1 124 57 170 86 119c33 57 87 15 40-28 57-29 15-89-29-30Z" fill="${C.yellow}"/><circle cx="90" cy="90" r="20" fill="${C.coral}"/><path d="M82 86v4m17-4v4m-17 10q9 7 16-1" fill="none"/>`,
  chat:`<path d="M16 32h116v77H74l-29 28v-28H16Z" fill="${C.blue}"/><path d="M77 73h88v70h-20v20l-25-20H77Z" fill="${C.peach}"/><path d="M37 55h72M37 72h46m13 23h48m-48 17h37" fill="none"/>`,
  file:`<path d="M28 45h123v108H28Z" fill="${C.blue}"/><path d="M44 27h81l23 24v97H44Z" fill="${C.cream}"/><path d="M125 27v25h23M62 72h63m-63 18h53m-53 18h29" fill="none"/><circle cx="128" cy="135" r="27" fill="${C.yellow}"/><path d="m116 134 8 9 16-20" fill="none"/>`,
  live:`<rect x="18" y="27" width="144" height="105" rx="10" fill="${C.blue}"/><path d="M90 134v20m-35 6h70M31 50h118" fill="none"/><circle cx="53" cy="82" r="13" fill="${C.peach}"/><path d="M33 113q20-30 40 0" fill="${C.coral}"/><circle cx="124" cy="82" r="13" fill="${C.cream}"/><path d="M104 113q20-30 40 0" fill="${C.yellow}"/><circle cx="30" cy="38" r="2"/><circle cx="40" cy="38" r="2"/>`,
  coffee:`<path d="M34 68h85v45q0 37-42 37-43 0-43-37Z" fill="${C.coral}"/><path d="M120 78h14q37 0 14 42-7 9-29 9M23 156h110M62 51c-18-15 15-20 0-36m32 36c-18-15 15-20 0-36" fill="none"/><path d="M62 97v7m30-7v7m-27 14q12 11 24-1" fill="none"/>`,
  book:`<path d="M90 46q-36-28-71-11v110q35-13 71 12 36-25 71-12V35q-35-17-71 11Z" fill="${C.blue}"/><path d="M90 46v111M35 61l35 11m-35 9 35 11m-35 9 23 8m37-42 39-12m-39 32 39-12m-39 33 26-8" fill="none"/>`,
  pencil:`<path d="m45 131 74-108 23 17-74 108-40 17Z" fill="${C.yellow}"/><path d="m119 23 11-15 24 17-12 15" fill="${C.coral}"/><path d="m45 131 23 17m-30 9-6-5m24-14 75-108" fill="none"/><path d="m37 45 7-19m-20 13 21 7m83 88 11 17m3-24-18 11" fill="none"/>`,
  clock:`<circle cx="90" cy="93" r="65" fill="${C.blue}"/><circle cx="90" cy="93" r="51" fill="${C.cream}"/><path d="M90 58v36l28 17m-39 47-9 15m35-15 8 15M42 27 24 52m113-25 19 25" fill="none"/><path d="m24 52 27-30q-34-20-27 30Zm104-30 28 30q6-50-28-30Z" fill="${C.coral}"/>`,
  send:`<path d="m13 80 151-57-53 139-29-54Z" fill="${C.blue}"/><path d="m82 108 82-85M60 121l-25 24m26-3-13 16m-12-46-17 17" fill="none"/>`,
  revise:`<path d="M41 50q48-39 95 7m0 0V27m0 30h-31M139 129q-50 40-96-7m0 0v30m0-30h31" fill="none" stroke-width="5"/><path d="M66 58h50v70H66Z" fill="${C.peach}"/><path d="m78 103 23-28 9 8-23 28-13 4Z" fill="${C.yellow}"/>`,
  tick:`<circle cx="90" cy="90" r="62" fill="${C.yellow}"/><path d="m57 90 23 24 48-53" fill="none" stroke-width="8"/><path d="m22 22 9 10m118-10-9 10m10 116 9 10m-136-3 11-11" fill="none"/>`,
  parcel:`<path d="m25 58 66-30 65 30v74l-65 31-66-31Z" fill="${C.coral}"/><path d="m25 58 66 33 65-33M91 91v72M58 43l65 32v30l16-8V68L74 36" fill="${C.yellow}"/><path d="m43 111 27 13" fill="none"/>`,
 };
 return wrap(paths[kind]||paths.spark,'0 0 180 180',cls);
}
export function character(index=0,cls='character') {
 const fills=[C.coral,C.blue,C.yellow,C.peach,C.blue,C.coral];
 const tops=[
  `<path d="M42 46q-6-34 27-33 35 0 28 38l-15-9-23 9Z" fill="${C.ink}"/>`,
  `<path d="M43 44q-8-28 12-27 7-21 20-5 24-9 24 14 11 12-3 28Z" fill="${C.ink}"/>`,
  `<path d="M39 42q-2-28 37-25 30 2 25 34M36 42h67" fill="${C.yellow}"/>`,
  `<path d="M39 68V39q1-31 32-31 33 0 33 31v35l-15-9-4-32-39 32Z" fill="${C.ink}"/>`,
  `<path d="m41 46 3-31 18 9L78 7l9 18 17-2-7 33Z" fill="${C.ink}"/>`,
  `<path d="M42 46q-9-38 23-37 37-6 34 40L76 30Z" fill="${C.ink}"/>`
 ];
 const props=[`<path d="M88 99h41v47H88Z" fill="${C.cream}"/><path d="m98 118 7 8 13-17" fill="none"/>`,`<path d="m22 135 19-48 12 5-19 48-14 10Z" fill="${C.yellow}"/>`,`<path d="M26 109h86v43H26Z" fill="${C.cream}"/><path d="M38 122h61m-61 11h44" fill="none"/>`,`<circle cx="108" cy="112" r="18" fill="${C.cream}"/><path d="m120 127 15 18m-31-33h9m-5-5v10" fill="none"/>`,`<path d="M29 100h83v50H29Z" fill="${C.yellow}"/><path d="m61 111 20 14-20 14Z" fill="${C.ink}"/>`,`<path d="M24 104h90l10 47H15Z" fill="${C.blue}"/><path d="m50 119-9 8 9 8m33-16 9 8-9 8m-21 1 7-19" fill="none"/>`];
 return wrap(`<path d="M18 151q2-62 53-62 52 0 54 62Z" fill="${fills[index]}"/><path d="M61 77v22q10 9 20-1V77" fill="${C.cream}"/>${tops[index]}<path d="M47 41q7-6 15-7l22-1 10 13v20q-2 24-22 24-25-1-25-24Z" fill="${C.cream}"/><path d="M60 53v5m23-5v5m-13 0-3 12h7m-13 5q11 8 21-1" fill="none"/>${index===1||index===3?'<circle cx="59" cy="56" r="10" fill="none"/><circle cx="84" cy="56" r="10" fill="none"/><path d="M69 55h5"/>':''}${props[index]}<path d="M12 153h124" fill="none"/>`,'0 0 145 165',cls);
}
export function collectiveArt(){
 return `<svg class="collective-art" viewBox="0 0 390 230" aria-hidden="true"><path d="M28 203C1 117 59 144 105 141S113 27 207 40s63 116 157 149" stroke="${C.ink}" stroke-width="2" stroke-dasharray="4 6" fill="none"/>${[0,1,2,3,4,5].map((i)=>`<g transform="translate(${[0,125,248,22,140,260][i]} ${i<3?0:83}) scale(.82)">${character(i).replace(/<svg[^>]*>|<\/svg>/g,'')}</g>`).join('')}</svg>`;
}
export function postmark(text='GOOD THINGS TRAVEL') {return `<svg class="postal-mark" viewBox="0 0 260 110" aria-hidden="true"><g fill="none" stroke="${C.ink}" stroke-width="1.6"><circle cx="62" cy="55" r="46"/><circle cx="62" cy="55" r="38"/>${[24,39,54,69,84].map(y=>`<path d="M105 ${y}q30-14 60 0t65 0"/>`).join('')}</g><text x="62" y="52" text-anchor="middle" font-family="Space Mono, monospace" font-size="9" fill="${C.ink}">SPECKLE</text><text x="62" y="68" text-anchor="middle" font-family="Space Mono, monospace" font-size="9" fill="${C.ink}">WITH CARE</text></svg>`;}
