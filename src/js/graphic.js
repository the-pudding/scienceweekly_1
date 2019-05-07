/* eslint-disable prettier/prettier */

let data;
let $prose;

let chartWidth;
let $cover;

let $chartStatic;
let $chartStaticImg;
let $chartStaticTitle;
let $chartDynamic;
let $chartPara;
let $story;

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

let paraHeight;

const $arrow = d3.select('.arrow')
const $coverRight = d3.select('.cover-right')
const $coverLeft = d3.select('.cover-left')
const $btnfwd = d3.select('.btn-fwd')

/* global d3 */

function handleCoverClick(){
    //d3.select('body').style('overflow', 'visible')

    d3.select('section.story').classed('hidden', false)

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

  console.log(currentStep)
    $slideIndicator
        .text(`${currentStep}/10`)

    if(currentStep===1){
        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', true)
        $btnfwd.classed('is-disabled', false)

        $chartPara
        .st('line-height','1.65')

        updateCopy()
    }

    if(currentStep===2){
        $chartStatic.classed('hidden', false)
        $chartDynamic.classed('hidden', true)
        $btnfwd.classed('is-disabled', false)

        $chartPara
        .st('line-height','1.65')

        updateCopy()
    }
    if(currentStep===3){
        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', true)
        $btnfwd.classed('is-disabled', false)

        $chartPara
        .st('line-height','1.65')

        updateCopy()
    }
    if(currentStep===4){
        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', true)
        $btnfwd.classed('is-disabled', false)

        $chartPara
        .st('line-height','1.65')

        updateCopy()
    }
    if(currentStep===5){
        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', true)
        $btnfwd.classed('is-disabled', false)

        $chartPara
        .st('line-height','1.65')

        updateCopy()
    }
    if(currentStep===6){
        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', false)
        $btnfwd.classed('is-disabled', false)

        $chartPara
        .st('line-height','0.6')

        $sentences
        .st('font-size',6)

        $sentences
        .st('background-color','#FFFFFF')
        .st('color','#282828')

        updateCopy()
    }

    if(currentStep===7){
        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', false)
        $btnfwd.classed('is-disabled', false)

        $chartPara
        .st('line-height','0.6')

        $sentences
        .st('font-size',6)

        $sentences
        .transition(2000)
        .delay((d, i) => i * 5)
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

        paraHeight=d3.select('.sentence-box').st('height')

        updateCopy()
    }
    if(currentStep===8){
        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', false)
        $btnfwd.classed('is-disabled', false)

        $sentences
        .classed('hidden',d=>{
            return d.yr>10? true : false
        })

        updateCopy()

        d3.select('footer')
        .classed('hidden',true)

        d3.select('.sentence-box').st('height', paraHeight)
    }
    if(currentStep===9){
        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', true)
        $btnfwd.classed('is-disabled', false)

        updateCopy()

        // d3.select('header')
        // .classed('hidden',false)

        //d3.select('footer')
        //.classed('hidden',false)
    }
    if(currentStep===10){
        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', true)
        $btnfwd.classed('is-disabled', true)
        updateCopy()

    }

}

function handleClickBack(){
    if (currentStep===1){
      $coverRight.classed('slide', false)
      $coverLeft.classed('slide', false)
      d3.select('.intro').transition().style('display', 'block')
      //d3.select('body').style('overflow', 'hidden')
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
        .domain([.625,1])
        .range(['#ff533d','#ffddd8'])

}


function setupDOM() {

    $chartStatic = d3.select('div.chart-static-container');
    $chartDynamic = d3.select('div.chart-dynamic');

    $chartStaticTitle = d3.select('p.chart-static-title')
    $chartStaticImg = $chartStatic.select('img')

    $prose = d3.select('div.prose')

    $backButton = d3.select('.btn-back')
    $fwdButton = d3.select('.btn-fwd')
    $slideIndicator = d3.select('.current-slide-num')
    $cover = d3.select('.cover-container')
    $story = d3.select('section.story')
  }

  function render() {


    $arrow.on('click', handleCoverClick)

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
