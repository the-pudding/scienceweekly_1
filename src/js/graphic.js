/* eslint-disable prettier/prettier */
let data;
let $prose;

let chartWidth;

let $chartStatic;
let $chartStaticTitle;
let $chartDynamic;
let $chartPara;

let $legend;
let $legendTitle;
let $legendItemContainer;
let $legendItemLabelsContainer;
let $legendItems;
let $legendItemsText;


let currentStep = 1
let $backButton;
let $fwdButton;
let $slideIndicator;

let sentencesJoin;
let $sentences;
let likelihoodScale;
let colScale;

let legendPercentages = [90,80,70,62.5]

/* global d3 */

function updateCopy(){
    $prose.selectAll('.prose-para')
    .classed('hidden',true)

    $prose.select(`p.part-${currentStep}`)
    .classed('hidden',false)
}

function updateStepIndicator(){
    $slideIndicator
        .text(`${currentStep}/5`)
    
    if(currentStep===1){
        $chartStatic.classed('hidden', false)
        $chartDynamic.classed('hidden', true)

        $chartStaticTitle.text("1. Likelihood that original study data is accessible varies by that study's age")

        $sentences        
        .st('font-size',18)

        $chartPara
        .st('line-height','1.65')

        updateCopy()
    }
    if(currentStep===2){
        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', false)

        $chartStaticTitle.text("2. A concrete example")

        $sentences
        .transition()
        .delay(1000)
        .st('font-size',4.5)
 
        $chartPara
        .transition()
        .delay(1000)
        .st('line-height','0.4')

        $sentences        
        .st('background-color','#FFFFFF')
        .st('color','#000000')



        $legendTitle
            .classed('hidden',true)
        $legendItemContainer
            .classed('hidden',true)
        $legendItemLabelsContainer
            .classed('hidden',true)
        $legendItems
            .classed('hidden',true)
        $legendItemsText
            .classed('hidden',true)


        updateCopy()
    }

    if(currentStep===3){

        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', false)

        $chartStaticTitle.text("3. Citation, by citation: likelihood of data availability")

        $chartPara
        .st('line-height','0.4')

        $sentences
        .st('font-size',5)

        $sentences
        .transition()
        .st('background-color',d=>colScale(likelihoodScale(d.yr)))
        .st('color',d=>colScale(likelihoodScale(d.yr)))
        .st('display','visible')

        $sentences
        .classed('hidden',false)

        $legendTitle
            .classed('hidden',false)
        $legendItemContainer
            .classed('hidden',false)
        $legendItemLabelsContainer
            .classed('hidden',false)
        $legendItems
            .classed('hidden',false)
        $legendItemsText
            .classed('hidden',false)
        

        updateCopy()
    }
    
    if(currentStep===4){

        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', false)

        $chartStaticTitle.text("4. What's left?")

        $sentences
        .classed('hidden',d=>{
            return d.yr>10? true : false
        })
        
        updateCopy()
    }
    
    if(currentStep===5){

        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', true)

        $chartStaticTitle.text("5. Method")
   
        
        updateCopy()
    }

}

function handleClickBack(){
    if (currentStep===1){}
    else{
        currentStep-=1
        updateStepIndicator()
    }
}
function handleClickForward(){
    if (currentStep===5){}
    else{
        currentStep+=1
        updateStepIndicator()
    }
}


function cleanData(dirtyData){
  return dirtyData.map(item=>({
        ...item,
        yr: (2013 - +item.yr)
    }))
}

function resize() {
    likelihoodScale = d3.scaleThreshold()
        .domain([0,	2,	4,	6,	8,	10,	12,	14,	16,	18,	20,	22,	100])
        .range([0.625,	0.625,	0.739130434782609,	0.742424242424242,	0.742424242424242,	0.760869565217391,	0.813953488372093,	0.85,	0.85,	0.85,	0.923076923076923,	0.923076923076923,	0.923076923076923])

    colScale = d3.scaleLinear()
        .domain([.625,1])
        .range(['#fff7f3','#49006a'])

}


function setupDOM() {

    $chartStatic = d3.select('div.chart-static-container');
    $chartDynamic = d3.select('div.chart-dynamic');

    $chartStaticTitle = d3.select('p.chart-static-title')

    $prose = d3.select('div.prose')

    $backButton = d3.select('.btn-back')
    $fwdButton = d3.select('.btn-fwd')
    $slideIndicator = d3.select('.current-slide-num')
  }
  
  function render() {

    $chartPara = $chartDynamic
        .append('p.sentence-box')

    sentencesJoin = $chartPara
      .selectAll('span.sentence')
      .data(data)
      .enter();
  
    $sentences = sentencesJoin.append('span.sentence');
    $sentences.text(d => d.sentence)

    $backButton.on('click',handleClickBack)
    $fwdButton.on('click',handleClickForward)

    $legendTitle = $chartDynamic.append('p.legend-title')
    $legend = $chartDynamic.append('div.legend')
    $legendItemLabelsContainer = $legend.append('p.legend-item-labels-container')
    $legendItemContainer = $legend.append('p.legend-item-container')

    $legendTitle
        .text('Likelihood of original data availability')
        // .classed('hidden', true)


    $legendItemsText = $legendItemLabelsContainer
        .selectAll('span.legend-item-text')
        .data(legendPercentages)
        .enter()
        .append('span.legend-item-text')

    $legendItems = $legendItemContainer
        .selectAll('span.legend-item')
        .data(legendPercentages)
        .enter()
        .append('span.legend-item')

    $legendItemsText
        .text(d=>`>${d}%`)

    $legendItems        
        .st('background-color', d=>colScale(d/100))
        .text(d=>`>${d}%`)
        .st('color', d=>colScale(d/100))

    $legendTitle
        .classed('hidden',true)
    $legendItemContainer
        .classed('hidden',true)
    $legendItemLabelsContainer
        .classed('hidden',true)
    $legendItems
        .classed('hidden',true)
    $legendItemsText
        .classed('hidden',true)
    
    
    chartWidth = $chartStatic.node().offsetWidth
    
    $legend 
        .st('max-width',chartWidth/3)

    // $legend
    
  }

  
  function init() {
    return new Promise((resolve, reject) => {
        
      const thesisFile= 'assets/data/thesis_chunked.csv'
      const articleFile = 'assets/data/article_data.csv';
     
      const dataFiles = [articleFile, thesisFile] 
  
      d3.loadData(...dataFiles, (error, response) => {
        if (error) {
          reject(error);
        } else {
          data = cleanData(response[0]);

          resize();
          setupDOM();
          render();
        }
      });
    });
  }
  
  export default { init, resize };
  