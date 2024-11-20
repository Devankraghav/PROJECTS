const start = document.getElementById('startBtn')
const stop = document.getElementById('stopBtn')
const scr1 = document.getElementById('scr1')
const scr2 = document.getElementById('scr2')

start.addEventListener('click',()=>{
  document.addEventListener('keydown', handleDown)
  document.addEventListener('keyup', handleUp)
  start.disabled = true;
  stop.disabled = false;
})

stop.addEventListener('click',()=>{
  document.removeEventListener('keydown', handleDown)
  document.removeEventListener('keyup', handleUp)
  scr1.textContent='';
  scr2.textContent='';
  stop.disabled = true;
  start.disabled = false;
})

function handleDown(e){
  scr1.textContent=`Key ${e.key} is pressed down`
  scr2.textContent=`Key is down`
}

function handleUp(e){
  scr1.textContent=`Key ${e.key} is pressed up`
  scr2.textContent=`Key is up`
}
