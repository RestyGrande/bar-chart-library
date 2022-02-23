window.onload = () =>{
const min= 1;
const max=300
const targetId = "chart"
const canvasWidth =600
const canvasHeight=450

const data =[
    {
        label:'Jan',value:getRandomInt(min,max)  
      },
    {
        label:'Feb',value:getRandomInt(min,max)
    },
    {
        label:'Mar',value:getRandomInt(min,max)  
      },
    {
        label:'March',value:getRandomInt(min,max)
    },
    {
        label:'April',value:getRandomInt(min,max)
    },
    {
        label:'May',value:getRandomInt(min,max)  
      },
    {
        label:'June',value:getRandomInt(min,max)
    },
    {
        label:'July',value:getRandomInt(min,max)  
      },
    {
        label:'Sept',value:getRandomInt(min,max) 
      },
    {
        label:'Oct',value:getRandomInt(min,max)
    },
    {
        label:'Nov',value:getRandomInt(min,max)
    },
    {
        label:'Dec',value:getRandomInt(min,max)
    },
    

]

const chart = new Barchart(targetId,canvasWidth,canvasHeight,data)

function getRandomInt(min,max){
    min = Math.ceil(min);
    max=Math.floor(max)
    return Math.floor(Math.random()*(max-min))+min
}

}