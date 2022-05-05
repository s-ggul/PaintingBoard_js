const canvas = document.querySelector('#jsCanvas');
// canvas는 context를 가지는 엘리먼트로 context를 정의해줘야함
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');


const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// 추가적으로 canvas는 해당 canvas의 사이즈를 지정해줘야한다.

ctx.fillStyle = 'white';
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
//PNG 처럼 배경이 투명이 되는것을 막기위함 => 초기 배경색을 설정하는 것

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting()
{
    painting = false;
}

function startPainting()
{
    painting = true;
}

function onMouseMove(event)
{
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting)
    {
        ctx.beginPath();
        ctx.moveTo(x, y);
        // 그리기전 이전 위치를 구하기 위함
        // 이전 위치를 구함으로써 마우스를 눌렀을때 그때의 위치까지 라인을 그릴 수 있게함
    } else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    range.style.accentColor = color;
}

function handleRangeChange(event)
{
    const size = parseInt(event.target.value);
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling)
    {
        filling = false;
        mode.innerText = 'Fill';
    }
    else{
        filling = true;
        mode.innerText = 'Paint';
        
    }
}

function handleCanvasClick()
{
    if (filling){
        ctx.fillRect(0,0, canvas.width,canvas.height);
    }
}

function handleCM(event)
{
    event.preventDefault();
}

function handleSaveClick()
{
    const image = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = image;
    link.download = "PaintJS[🎨]";
    //download 는 이미지의 이름이 되어야함.
    link.click();
}

if(canvas)
{
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mousedown',startPainting);
    canvas.addEventListener('mouseup',stopPainting);
    canvas.addEventListener('mouseleave',stopPainting);
    //이벤트 들은 canvas 엘리먼트를 기준으로 발생.
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
    //마우스 우클릭 이벤트를 감지하는 코드
}

if(colors){
    Array.from(colors).forEach(
        (color) => color.addEventListener('click', handleColorClick)
        );
}


if(range)
{
    range.addEventListener('input', handleRangeChange);
}

if(mode)
{
    mode.addEventListener('click', handleModeClick);
}

if(saveBtn)
{
    saveBtn.addEventListener('click', handleSaveClick);
}