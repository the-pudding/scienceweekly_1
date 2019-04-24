/* eslint-disable prettier/prettier */
let data;
let $svg;
let $chart;
let $chartPara;
let $steps;

let $step1;
let $step2;
let $step3;
let $step4;
let $step5;
let $step6;

let sentencesJoin;
let $sentences;
let likelihoodScale;
let colScale;



/* global d3 */

function handleStep(){
    const stepNum = +d3.select(this).at('id').split('-')[1]
    
    if(stepNum===1){
        $sentences
            .transition()
            .st('font-size',10)
        
        $chartPara
            .st('line-height','0.7')
    }
    else if (stepNum===2){
        $sentences
        .transition()
        .duration(1000)
        .st('font-size',d=>{
                return d.yr>20? '0': '10'
            })
        // .st('display',d=>{
        //     return d.yr>20? 'none': 'visible'
        // })
    }
    else if (stepNum===3){
        $sentences
        .transition()
        .st('display',d=>{
            return d.yr>15? 'none': 'visible'
        })
    }
    else if (stepNum===4){
        $sentences
        .transition()
        .st('display',d=>{
            return d.yr>10? 'none': 'visible'
        })
    }
    else if (stepNum===5){}
    else if (stepNum===6){}
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

    // $svg = d3.select('#viz');
    $chart = d3.select('figure.chart-fig');
    $steps = d3.selectAll('.btn')
  }
  
  function render() {
    $chartPara = $chart
        .append('p.sentence-box')

    sentencesJoin = $chartPara
      .selectAll('span.sentence')
      .data(data)
      .enter();
  
    $sentences = sentencesJoin.append('span.sentence');
  
    $sentences.text(d => d.sentence)
      .st('background-color',d=>{
        //   console.log(+d.yr);
          console.log(likelihoodScale(d.yr));
          console.log(colScale(likelihoodScale(d.yr)))

          return (colScale(likelihoodScale(d.yr)))
      });

    $steps.on('click',handleStep)
  }
  
  function init() {
    return new Promise((resolve, reject) => {
      const bumpDataFile = 'article_data.csv';
      const bumpDataPath = `assets/data/${bumpDataFile}`;
  
      d3.loadData(bumpDataPath, (error, response) => {
        if (error) {
          reject(error);
        } else {
          data = cleanData(response[0]);
  
          console.log(data)

          resize();
          setupDOM();
          render();
        }
      });
    });
  }
  
  export default { init, resize };
  