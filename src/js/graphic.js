/* eslint-disable prettier/prettier */

let data;
let $prose;

let chartWidth;
let screenWidth;
let $cover;

let $chartStatic;
let $chartStaticBox;
let $chartStaticImg;
let $chartStaticTitle;
let $chartDynamic;
let $chartDynamicLegend;
let $chartDynamicContainer;
let $chartPara;
let $story;

let $legend;
let $legendTitle;
let $legendItemContainer;
let $legendItemLabelsContainer;
let $legendItems;
let $legendItemsText;


let currentStep = 1
let coverHidden = false;
let mob;
let $backButton;
let $fwdButton;
let $backOverlay;
let $fwdOverlay;
let $slideIndicator;

let sentencesJoin;
let $sentences;
let likelihoodScale;
let colScale;

let legendPercentages = [90,80,70,62.5]

let paraHeight;

const $arrow = d3.select('.arrow')
const $coverRight = d3.select('.cover-right')
const $coverLeft = d3.select('.cover-left')
const $btnfwd = d3.select('.btn-fwd')
const $slideContents = d3.select('.chart-static')
const $storyContents = d3.select('.story')
const $navBar = d3.select('.nav-bar')

let FONT_SIZE_SMALL;
let FONT_SIZE_LARGE;
let LINE_HEIGHT_SMALL; 
let LINE_HEIGHT_LARGE;

let TEXT_BOX_BUMP = '75%'

/* global d3 */

function handleCoverClick(){
    coverHidden=true;

    d3.select('section.story').classed('hidden', false)
    $navBar.classed('hidden', false)

    $coverRight.classed('slide', true)
    $coverLeft.classed('slide', true)
    d3.select('.intro').transition().delay(250).style('display', 'none')
    

}

function updateCopy(){
    $prose.selectAll('.prose-para')
    .classed('hidden',true)

    $prose.select(`div.part-${currentStep}`)
    .classed('hidden',false)
}

function updateStepIndicator(){

    $slideIndicator
        .text(`${currentStep}/10`)

    if(currentStep===1){
        $chartStatic.classed('hidden', true)
        $chartDynamicContainer.classed('hidden', true)
        $btnfwd.classed('is-disabled', false)
        $slideContents.classed('is-chart', false)
        $storyContents.classed('is-chart', false)
        $navBar.classed('is-chart', false)

        $chartPara
        .st('line-height','1.65')

        updateCopy()
    }

    if(currentStep===2){
        $chartStatic.classed('hidden', false)
        $chartDynamicContainer.classed('hidden', true)
        $btnfwd.classed('is-disabled', false)
        $slideContents.classed('is-chart', false)
        $storyContents.classed('is-chart', false)
        $navBar.classed('is-chart', false)

        $chartPara
        .st('line-height','1.65')

        updateCopy()
    }
    if(currentStep===3){
        $chartStatic.classed('hidden', true)
        $chartDynamicContainer.classed('hidden', true)
        $btnfwd.classed('is-disabled', false)
        $slideContents.classed('is-chart', false)
        $storyContents.classed('is-chart', false)
        $navBar.classed('is-chart', false)

        $chartPara
        .st('line-height','1.65')

        updateCopy()
    }
    if(currentStep===4){
        $chartStatic.classed('hidden', true)
        $chartDynamicContainer.classed('hidden', true)
        $btnfwd.classed('is-disabled', false)
        $slideContents.classed('is-chart', true)
        $storyContents.classed('is-chart', true)
        $navBar.classed('is-chart', true)

        $chartPara
        .st('line-height','1.65')

        updateCopy()
    }
    if(currentStep===5){
        $chartStatic.classed('hidden', true)
        $chartDynamicContainer.classed('hidden', true)
        $btnfwd.classed('is-disabled', false)
        $slideContents.classed('is-chart', false)
        $storyContents.classed('is-chart', false)
        $navBar.classed('is-chart', false)

        $chartPara
        .st('line-height','1.65')

        $chartStaticBox
        .st('top', '50%')

        updateCopy()
    }
    if(currentStep===6){
        $chartStatic.classed('hidden', true)
        $chartDynamicContainer.classed('hidden', false)
        $btnfwd.classed('is-disabled', false)
        $slideContents.classed('is-chart', true)
        $storyContents.classed('is-chart', true)
        $navBar.classed('is-chart', true)
        $chartDynamicLegend.classed('is-visible', false)

        $chartPara
        .st('line-height',LINE_HEIGHT_SMALL)

        // $sentences
        // .st('font-size',8)

        $sentences
        .transition()
        .delay((d,i)=>data.length -i *5)
        .st('background-color','#FFFFFF')
        .st('color','#282828')
        .st('font-size',FONT_SIZE_SMALL)

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

        $chartStaticBox
            .st('top', ()=>{
                if(mob){return TEXT_BOX_BUMP}    
                return '50%'            
            })
            

        updateCopy()
    }

    if(currentStep===7){
        $chartStatic.classed('hidden', true)
        $chartDynamicContainer.classed('hidden', false)
        $btnfwd.classed('is-disabled', false)
        $slideContents.classed('is-chart', true)
        $storyContents.classed('is-chart', true)
        $navBar.classed('is-chart', true)
        $chartDynamicLegend.classed('is-visible', true)

        // $chartPara
        // .st('line-height',LINE_HEIGHT_SMALL)

        $sentences
        .transition()
        .delay((d, i) => i * 5)
        .st('background-color',d=>colScale(likelihoodScale(d.yr)))
        .st('color',d=>colScale(likelihoodScale(d.yr)))      
        .st('display','inline')   
        .st('font-size',FONT_SIZE_SMALL)
          


        $sentences
        .classed('hidden',false)

        paraHeight=d3.select('.sentence-box').st('height')

        $chartStaticBox
            .st('top', ()=>{
                if(mob){return TEXT_BOX_BUMP}    
                return '50%'            
            })

        updateCopy()
    }
    if(currentStep===8){
        $chartStatic.classed('hidden', true)
        $chartDynamicContainer.classed('hidden', false)
        $btnfwd.classed('is-disabled', false)
        $slideContents.classed('is-chart', true)
        $storyContents.classed('is-chart', true)
        $navBar.classed('is-chart', true)
        $chartDynamicLegend.classed('is-visible', true)

        $sentences
        .transition()
        .delay((d,i)=>i*5)
        .st('font-size',d=>{
            if (d.yr>10){return 0}
            return FONT_SIZE_SMALL
        })
        .st('line-height',d=>{
            if (d.yr>10){return 0}
            return LINE_HEIGHT_SMALL
        })
        .st('display',d=>{
            if (d.yr>10){return 'none'}
            return 'inline'
        })        

        
        
        // $sentences
        // .transition()
        // .delay(900)
        // .classed('hidden',d=>{
        //     return d.yr>10? true : false
        // })

        updateCopy()

        d3.select('footer')
        .classed('hidden',true)

        $chartStaticBox
            .st('top', ()=>{
                if(mob){return TEXT_BOX_BUMP}    
                return '50%'            
            })

        d3.select('.sentence-box').st('height', paraHeight)
        console.log(paraHeight)
    }
    if(currentStep===9){
        $chartStatic.classed('hidden', true)
        $chartDynamicContainer.classed('hidden', true)
        $btnfwd.classed('is-disabled', false)
        $slideContents.classed('is-chart', false)
        $storyContents.classed('is-chart', false)
        $storyContents.classed('is-methods', false)
        $navBar.classed('is-chart', false)
        $chartDynamicLegend.classed('is-visible', false)

        $chartStaticBox
        .st('top', '50%')

        updateCopy()
    }
    if(currentStep===10){
        $chartStatic.classed('hidden', true)
        $chartDynamicContainer.classed('hidden', true)
        $btnfwd.classed('is-disabled', true)
        $slideContents.classed('is-chart', false)
        $storyContents.classed('is-chart', false)
        $storyContents.classed('is-methods', true)
        $navBar.classed('is-chart', false)

        updateCopy()

    }

}

function handleClickBack(){
    if (currentStep===1){
      $coverRight.classed('slide', false)
      $coverLeft.classed('slide', false)
      $navBar.classed('hidden', true)
      d3.select('.intro').transition().style('display', 'block')
      coverHidden=false;
    }
    else{
        currentStep-=1
        updateStepIndicator()
    }
}
function handleClickForward(){
    if (currentStep===10){}
    else{
        currentStep+=1
        updateStepIndicator()
    }
}


function cleanData(dirtyData){
  return dirtyData.map(item=>({
        ...item,
        yr: (2013 - +item.alt_year)
    }))
}

function resize() {
    likelihoodScale = d3.scaleThreshold()
        .domain([0,	2,	4,	6,	8,	10,	12,	14,	16,	18,	20,	22,	100])
        .range([0.625,	0.625,	0.739130434782609,	0.742424242424242,	0.742424242424242,	0.760869565217391,	0.813953488372093,	0.85,	0.85,	0.85,	0.923076923076923,	0.923076923076923,	0.923076923076923])

    colScale = d3.scaleLinear()
        .domain([.625,.923076923076923])
        .range(['#ff533d','#fff4f3'])
    
        // Figuring out character font size
    // const charWidth = d3.select('span.sneaky-span').node().offsetWidth;
    // const chartHeight = d3.select('span.sneaky-span').node().offsetHeight;
    screenWidth = d3.select('.cover-container').node().offsetWidth;
    mob = screenWidth<600? true:false;
    LINE_HEIGHT_SMALL =  mob? '0.195':'0.8'  

    FONT_SIZE_LARGE = '6px'
    FONT_SIZE_SMALL = mob? '2px': '6px'
    
    // const screenHeight = d3.select('.cover-container').node().offsetHeight;
    
    // console.log(`char width: ${charWidth}, char height: ${chartHeight}`)
    // console.log(`screen width: ${screenWidth}, screen height: ${screenHeight}`)
    // console.log(`updated char width: ${charWidth}, updated char height: ${chartHeight}`)

    // const allSentences = []    
    // data.forEach(item=>allSentences.push(item.sentence))
    // let allSentencesFlat = allSentences.join('')

    // const numChars = allSentencesFlat.length
    // const screenArea = screenWidth * screenHeight
    // const areaOfEachChar = Math.floor(areaOfEachChar)

    // d3.select('span.sneaky-span').st('font-size',8)
    // console.log(d3.select('span.sneaky-span').node().offsetWidth * d3.select('span.sneaky-span').node().offsetHeight)
    

    // console.log(`items in string ${allSentencesFlat.length}`)
    // console.log(`area of one item in string: ${charWidth * chartHeight}`)
    // console.log(`available area: ${screenWidth * screenHeight}`)

}


function setupDOM() {

    $chartStatic = d3.select('div.chart-static-container');
    $chartDynamicContainer = d3.select('div.chart-dynamic')
    $chartDynamic = d3.select('div.chart-dynamic-chart');
    $chartDynamicLegend = d3.select('div.chart-dynamic-legend');

    $chartStaticBox = d3.select('.chart-static-meta')
    $chartStaticTitle = d3.select('p.chart-static-title')
    $chartStaticImg = $chartStatic.select('img')

    $prose = d3.select('div.prose')

    $backOverlay = d3.select('.overlay__left')
    $fwdOverlay = d3.select('.overlay__right')
    $backButton = d3.select('.btn-back')
    $fwdButton = d3.select('.btn-fwd')
    $slideIndicator = d3.select('.current-slide-num')
    $cover = d3.select('.cover-container')
    $story = d3.select('section.story')

    document.addEventListener('keydown', (event) => {
        const keyName = event.key;        
    
        if (keyName === 'ArrowRight') {

            if(!coverHidden){
                handleCoverClick()
            }
            else{
                handleClickForward()
            }
            
        }
        else if (keyName==='ArrowLeft'){
            handleClickBack()
        }         
    }, false);    
  }

  function render() {

    $chartPara = $chartDynamic
        .append('p.sentence-box')

    sentencesJoin = $chartPara
      .selectAll('span.sentence')
      .data(data)
      .enter();

    console.log(d3.select('.link').st('left'))

    $sentences = sentencesJoin.append('span.sentence');
    $sentences.text(d => d.sentence)
        .st('line-height',LINE_HEIGHT_SMALL)
    
    LINE_HEIGHT_LARGE = $sentences.st('line-height') 

    // console.log(`font size is ${FONT_SIZE_LARGE}, line height is ${LINE_HEIGHT_LARGE}`) 

    $arrow.on('click', handleCoverClick)
    $backButton.on('click',handleClickBack)
    $fwdButton.on('click',handleClickForward)
    $backOverlay.on('click',handleClickBack)
    $fwdOverlay.on('click',handleClickForward)

    $legendTitle = $chartDynamicLegend.append('p.legend-title')
    $legend = $chartDynamicLegend.append('div.legend')
    $legendItemLabelsContainer = $legend.append('p.legend-item-labels-container')
    $legendItemContainer = $legend.append('p.legend-item-container')

    $legendTitle
        .text('Likelihood of data being inaccessible')
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
