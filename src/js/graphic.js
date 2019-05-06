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

/* global d3 */

function handleCoverClick(){
    d3.select('body').style('overflow', 'visible')
    d3.select('.cover-container')
    .classed('hidden',true)

    d3.select('section.story')
        .classed('hidden', false)


}

function updateCopy(){
    $prose.selectAll('.prose-para')
    .classed('hidden',true)

    $prose.select(`p.part-${currentStep}`)
    .classed('hidden',false)
}

function updateStepIndicator(){
    $slideIndicator
        .text(`${currentStep}/6`)

    if(currentStep===1){
        $chartStatic.classed('hidden', false)
        $chartDynamic.classed('hidden', true)

        $chartStaticImg
            .at('src','assets/images/crisis.png')

        $chartStaticTitle.text("1. A crisis in psychology")

        $chartPara
        .st('line-height','1.65')

        updateCopy()
    }

    if(currentStep===2){
        $chartStatic.classed('hidden', false)
        $chartDynamic.classed('hidden', true)



        $chartStaticImg
            .at('src','assets/images/availability_time.png')


        $chartStaticTitle.text("2. Likelihood that original study data is accessible varies by that study's age")

        $chartPara
        .st('line-height','1.65')

        updateCopy()
    }
    if(currentStep===3){
        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', false)

        $chartStaticTitle.text("3. A concrete example")

        $sentences
        .st('font-size',4.5)


        $chartPara
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

    if(currentStep===4){

        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', false)

        $chartStaticTitle.text("4. Citation, by citation: likelihood of data availability")

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

        paraHeight=d3.select('.sentence-box').st('height')

        updateCopy()
    }

    if(currentStep===5){

        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', false)

        $chartStaticTitle.text("5. What's left?")

        $sentences
        .classed('hidden',d=>{
            return d.yr>10? true : false
        })

        updateCopy()

        d3.select('footer')
        .classed('hidden',true)

        d3.select('.sentence-box').st('height', paraHeight)
    }

    if(currentStep===6){

        $chartStatic.classed('hidden', true)
        $chartDynamic.classed('hidden', true)

        $chartStaticTitle.text("6. Method")

        updateCopy()

        // d3.select('header')
        // .classed('hidden',false)

        d3.select('footer')
        .classed('hidden',false)
    }

}

function handleClickBack(){
    if (currentStep===1){
      $cover.classed('hidden', false)
      d3.select('body').style('overflow', 'hidden')
    }
    else{
        currentStep-=1
        updateStepIndicator()
    }
}
function handleClickForward(){
    if (currentStep===6){}
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
        .range(['#fff7f3','#49006a'])

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
