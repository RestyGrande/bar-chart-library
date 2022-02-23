"use strict"

function Barchart(targetId,width,height,data){
 const chart =this;
 chart.configureChart(targetId,width,height,data);
chart.performPreOperations()
chart.drawChart()
console.log(chart);

}
Barchart.prototype.configureChart = function (targetId,width,height,data) {
    const chart =this;

  chart.setCanvasParameters(targetId,width,height,data)
  chart.setChartParameters()
}
Barchart.prototype.setCanvasParameters = function (targetId,width,height,data){
    const chart =this;

    chart.id = targetId
    chart.width=width
    chart.height=height
    chart.data = data
}
Barchart.prototype.setChartParameters = function(){
    const chart =this;

    chart.axisRatio=10
    chart.verticalMargin = (chart.height * chart.axisRatio) /100
    chart.horizontalMargin = (chart.width * chart.axisRatio) /100
    chart.axisColor="#1167b1"
    chart.axisWidth=0.75
   
    chart.fontRatio = 3
    chart.fontFamily= 'times'
    chart.fontStyle= 'normal'
    chart.fontWeight= '300'
    chart.fontColor = "#333"
    chart.verticalFontSize = (chart.height * chart.fontRatio) /100
    chart.horizontalFontSize = (chart.width * chart.fontRatio) /100
   
    chart.guideLineColor = "#333"
    chart.guideLineWidth = 0.5
}
Barchart.prototype.performPreOperations= function (){
const chart = this;
 chart.createCanvas()
chart.handleData()
chart.preapareData()

}
Barchart.prototype.createCanvas = function(){
    const chart = this
}
Barchart.prototype.createCanvas = function (){
    const chart = this;
    let canvas = document.createElement('canvas');
    canvas.id = chart.id+"-"+Math.random()
    canvas.width =chart.width
    canvas.height = chart.height
    document.getElementById(chart.id).innerHTML=''
    document.getElementById(chart.id).appendChild(canvas)
    chart.canvas= canvas
    chart.context=canvas.getContext('2d')
}
 Barchart.prototype.handleData=function(){
    const chart=this
    chart.labels =[]
    chart.values = []
    chart.data.forEach(item=>{
        chart.labels.push(item.label)
        chart.values.push(item.value)
    })
}
Barchart.prototype.preapareData = function (){
    const chart = this;
    chart.itemsNum = chart.data.length;
    chart.maxVal = Math.max.apply(null,chart.values)
    chart.minVal = Math.min.apply(null,chart.values)

    chart.verticalAxisWidth = chart.height -2 * chart.verticalMargin
    chart.horizontalAxisWidth = chart.width -2 * chart.horizontalMargin

    chart.verticalUpperBound = Math.ceil(chart.maxVal/ 10) * 10
    chart.verticalLabelFreq = chart.verticalUpperBound / chart.itemsNum
    chart.horizontalLabaelFreq = chart.horizontalAxisWidth / chart.itemsNum

}
Barchart.prototype.drawChart = function (){
    const chart = this

    chart.drawVerticalAxis()
    chart.drawVerticalLabel()
    chart.drawVerticalGuideLine()

    chart.drawHorizontalAxis()
    chart.drawHorizontalLabel()
    chart.drawHorizontalGuideLine()

    chart.drawBars()

}

Barchart.prototype.drawVerticalAxis= function (){
    const chart = this
//vertical axis
    chart.context.beginPath()
    chart.context.strokeStyle=chart.axisColor
    chart.context.lineWidth=chart.axisWidth
    chart.context.moveTo(chart.horizontalMargin,chart.verticalMargin)
    chart.context.lineTo(chart.horizontalMargin,chart.height - chart.verticalMargin)
    chart.context.stroke()

}
Barchart.prototype.drawHorizontalAxis = function (){
    const chart = this

    const labelFont =`${chart.fontStyle} ${chart.fontWeight} ${chart.verticalFontSize}px ${chart.fontFamily}`
    chart.context.font=labelFont
    chart.context.textAlign='center'
    chart.context.textBaseline='top'
    chart.context.fillStyle=chart.fontColor
    let i=0
    do{
        let horizontalLabelX = chart.horizontalMargin + i * chart.horizontalLabaelFreq + chart.horizontalLabaelFreq/2
        let horizontalLabelY=chart.height -  chart.verticalMargin + chart.verticalMargin/ this.axisRatio

        chart.context.fillText(chart.labels[i],horizontalLabelX,horizontalLabelY)
        i++
    }
      while(i<=chart.itemsNum-1)
}
Barchart.prototype.drawVerticalLabel= function (){
    const chart = this
    const labelFont =`${chart.fontStyle} ${chart.fontWeight} ${chart.verticalFontSize}px ${chart.fontFamily}`
    chart.context.font=labelFont
    chart.context.textAlign='right'
    chart.context.fillStyle=chart.fontColor

    const scaledVerticalLabelFreq = chart.verticalAxisWidth / chart.verticalUpperBound * chart.verticalLabelFreq

    let i=0
    do{
        let labelText = chart.verticalUpperBound - i  * chart.verticalLabelFreq
        let verticalLabelX  = chart.horizontalMargin - chart.horizontalMargin / chart.axisRatio 
        let verticalLabelY = chart.verticalMargin + i  * scaledVerticalLabelFreq
        chart.context.fillText(labelText,verticalLabelX,verticalLabelY)
        i++
    }
    while(i<=chart.itemsNum)


}
Barchart.prototype.drawHorizontalLabel = function (){
    const chart = this
       //horizontal axis
       chart.context.beginPath()
       chart.context.strokeStyle=chart.axisColor
       chart.context.lineWidth=chart.axisWidth
       chart.context.moveTo(chart.horizontalMargin,chart.height - chart.verticalMargin)
       chart.context.lineTo(chart.width- chart.horizontalMargin,chart.height - chart.verticalMargin)
       chart.context.stroke()
   
}
Barchart.prototype.drawHorizontalGuideLine = function (){
    const chart = this

    chart.context.strokeStyle=chart.guideLineColor
    chart.context.lineWidth= chart.guideLineWidth
    const scaledVerticalLabelFreq = chart.verticalAxisWidth / chart.verticalUpperBound * chart.verticalLabelFreq

    let i=0
    do{
        let horizontalGuideLineStartX = chart.horizontalMargin
        let horizontalGuideLineStartY = chart.verticalMargin + i  * scaledVerticalLabelFreq
        let horizontalGuideLineEndX = chart.horizontalMargin + chart.horizontalAxisWidth
        let horizontalGuideLineEndY = chart.verticalMargin + i  * scaledVerticalLabelFreq

        chart.context.beginPath()
        chart.context.moveTo(horizontalGuideLineStartX,horizontalGuideLineStartY)
        chart.context.lineTo(horizontalGuideLineEndX,horizontalGuideLineEndY)
        chart.context.stroke()
        i++
    }
    while(i<=chart.itemsNum)
}
Barchart.prototype.drawVerticalGuideLine= function(){
    const chart = this

    chart.context.strokeStyle=chart.guideLineColor
    chart.context.lineWidth= chart.guideLineWidth
   

    let i=0
    do{
        let verticalGuideLineStartX = chart.horizontalMargin + i * chart.horizontalLabaelFreq
        let verticalGuideLineStartY = chart.height - chart.verticalMargin 
        let verticalGuideLineEndX =  chart.horizontalMargin + i * chart.horizontalLabaelFreq
        let verticalGuideLineEndY =   chart.verticalMargin 

        chart.context.beginPath()
        chart.context.moveTo(verticalGuideLineStartX,verticalGuideLineStartY)
        chart.context.lineTo(verticalGuideLineEndX,verticalGuideLineEndY)
        chart.context.stroke()
        i++
    }
    while(i<=chart.itemsNum)
}
Barchart.prototype.drawBars = function (){
    const chart = this

   let i=0
   do{
    const color=  chart.createRnadomRGBColor()
    const fillOpacity = '0.3'
    const fillColor = `rgba(${color.r},${color.g},${color.b},${fillOpacity})`
    const strokeColor = `rgba(${color.r},${color.g},${color.b})`
 
       chart.context.beginPath()
       const barX =chart.horizontalMargin + i * chart.horizontalLabaelFreq + chart.horizontalLabaelFreq / chart.axisRatio
       const barY = chart.height - chart.verticalMargin
       const barWidth = chart.horizontalLabaelFreq -2 * chart.horizontalLabaelFreq / chart.axisRatio
       const barHeight = -1 * chart.verticalAxisWidth * chart.values[i]/ chart.maxVal

       chart.context.fillStyle=fillColor
       chart.context.strokeStyle=strokeColor
       chart.context.rect(barX,barY,barWidth,barHeight)
       chart.context.stroke()
       chart.context.fill()
       i++
   }
   while(i<=chart.itemsNum)

}
Barchart.prototype.createRnadomRGBColor = function (){
 const red = getRandomInt(0,257)
 const green = getRandomInt(0,257)
 const blue = getRandomInt(0,257)

 return {
     r:red,
    g:green,
    b:blue}
}
function getRandomInt(min,max){
    min = Math.ceil(min);
    max=Math.floor(max)
    return Math.floor(Math.random()*(max-min))+min
}