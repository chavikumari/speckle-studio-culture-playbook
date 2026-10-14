const ink='#5F130D', cream='#F3EFD0', coral='#FF7D65', blue='#BAD6FE', peach='#FFDED4', yellow='#FFDE59';
export const symbols = [
  {id:'spark',name:'A little spark'}, {id:'flower',name:'A wildflower'}, {id:'bird',name:'A little bird'}, {id:'sun',name:'A sunny thought'}
];
export function icon(id, cls='') {
  const shapes = {
    spark:'<path d="M50 8c5 23 11 31 34 42-23 5-31 11-34 42-5-23-11-31-34-42 23-5 31-11 34-42Z" fill="currentColor"/>',
    flower:'<path d="M50 35C17-6 3 38 34 48 0 65 25 97 47 67 60 101 98 76 66 53 102 36 77 3 55 34Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="50" cy="51" r="8" fill="currentColor"/>',
    bird:'<path d="M16 58c1-20 17-34 37-32 10 1 17 7 21 16l16 5-15 7c-3 16-16 25-35 24-10 0-19-3-26-9L7 76l5-16-9-7Z" fill="currentColor"/><path d="M30 58q12-13 25-7-5 15-20 17m31-26h1" fill="none" stroke="var(--paper, #F3EFD0)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>',
    sun:'<circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="4"/><path d="M50 9v11m0 60v11M9 50h11m60 0h11M21 21l8 8m42 42 8 8m0-58-8 8m-42 42-8 8" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',
    arrow:'<path d="M15 50h68M57 23l28 27-28 27" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
    coffee:'<path d="M23 38h46v27c0 15-10 25-23 25S23 80 23 65Zm46 7h7c17 0 18 23-5 25M15 91h63M37 28c-9-9 8-11 0-21m17 21c-9-9 8-11 0-21" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
    pencil:'<path d="m27 73 39-53 17 13-39 53-24 8Zm0 0 17 13m22-66 8-10 17 13-8 10" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
    book:'<path d="M50 84c-12-9-26-11-40-6V18c15-6 29-3 40 6 11-9 25-12 40-6v60c-14-5-28-3-40 6Zm0-60v60" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  return `<svg class="icon ${cls}" viewBox="0 0 100 100" aria-hidden="true">${shapes[id]||shapes.spark}</svg>`;
}
function envelope(x,y,w,h,c,angle=0) {
  return `<g transform="translate(${x} ${y}) rotate(${angle} ${w/2} ${h/2})"><path d="M5 1h${w-10}q5 0 5 5v${h-10}q0 5-5 5H5q-5 0-5-5V6q0-5 5-5Z" fill="${c}"/><path d="M2 4 ${w/2} ${h*.57} ${w-2} 4M3 ${h-3} ${w*.34} ${h*.42}M${w-3} ${h-3} ${w*.66} ${h*.42}" fill="none"/></g>`;
}
export function mailroomArt() {
  let mail='';
  [[105,202,112,67,cream,-2],[482,213,104,63,yellow,2],[113,334,106,63,peach,2]].forEach(a=>mail+=envelope(...a));
  return `<svg class="mailroom-art" viewBox="0 0 700 520" role="img" aria-label="An original illustration of the Speckle post room, with a simple letter sorter and a friendly postal pigeon beside the featured delivery.">
  <g stroke="${ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M92 475V137q0-33 34-33h448q34 0 34 33v338" fill="${blue}"/>
    <path d="M66 475h568v13H66Z" fill="${cream}"/>
    <path d="M111 153h478v290H111Z" fill="${cream}"/>
    <path d="M111 188h478M111 299h478M111 409h478M347 188v221" fill="none"/>
    <path d="M97 143h506v22H97Z" fill="${coral}"/>
    <path d="M109 142v23m36-23v23m36-23v23m36-23v23m36-23v23m36-23v23m36-23v23m36-23v23m36-23v23m36-23v23m36-23v23m36-23v23m36-23v23" fill="none" stroke="${cream}" stroke-width="3"/>
    <rect x="189" y="69" width="322" height="54" rx="27" fill="${cream}"/>
    <text x="350" y="103" text-anchor="middle" stroke="none" fill="${ink}" font-family="Bricolage Grotesque, sans-serif" font-size="23" font-weight="800" letter-spacing="1">SPECKLE POSTAL SERVICE</text>
    ${mail}
    <path d="M245 463h210" fill="none" stroke-width="2"/>
    <g transform="translate(23 333)">
      <path d="M54 102c-1-29 15-51 39-52 19-1 31 10 36 27l27 6-23 11c-5 20-23 31-49 29-12-1-22-5-29-12l-22 10 9-18-19-10Z" fill="${yellow}"/>
      <path d="M79 87q18-18 35-8-5 20-27 23m42-25h2M110 122l-3 15m18-16 3 15m-30 0h18m5 0h17" fill="none" stroke-width="3"/>
      <circle cx="116" cy="69" r="2.5" stroke="none" fill="${ink}"/>
    </g>
    <path d="M154 493c23 12 46 13 69 2m254-4c24 10 47 10 70-1" fill="none" stroke-width="2"/>
  </g></svg>`;
}
