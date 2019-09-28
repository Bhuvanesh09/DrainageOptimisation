var cy = cytoscape({

    container: $("#graphDiv"), // container to render in
  
    elements: [ // list of graph elements to start with
    //   { // node a
    //     data: { id: 'a' }
    //   },
    //   { // node b
    //     data: { id: 'b' }
    //   },
    //   { // node a
    //     data: { id: 'c' }
    //   },
    //   { // node a
    //     data: { id: 'd' }
    //   },
    //   { // node a
    //     data: { id: 'e' }
    //   },
    //   { // edge ab
    //     data: { id: 'ab', source: 'a', target: 'b' }
    //   }
    ],
  
    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': '#00f'
          //'label': 'data(id)'
        }
      },
  
      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ccc',
          'mid-target-arrow-color': '#ccc',
      //    'mid-target-arrow-shape': 'vee',
          'arrow-scale': 2
        }
      }
    ],
  
    layout: {
      name: 'grid',
      rows: 4
    }
  
  });

function hToR(height){
    var low = 30;
    var high = 70;
    var lowH = 0;
    var highH = 250 ;

    return low + (high - low) * (height - lowH) / (highH - lowH);
}
function fToW(flow){
    var low = 0;
    var high = 10;
    var lowF = 0;
    var highF = 250;
    return low + (high -low )* (flow - lowF) / (highF - lowF);
}
  function callme () {
      cy.nodes().positions(
          function(ele,i){
            return {
                x : Math.random()*cy.width() ,
                y: Math.random()*cy.height()
            }
          });
  };


function makeGraph(input) {
    //making nodes here:
    for (node of input[0]){
        var col,size;
        if(node["fill"]){
            col = "#f00";
        }else {
            col = "#00f";
        }

        size = hToR(node["size"]);
        var object = { 
            group : 'nodes',
            data: {id: node["id"], size: node["size"] , fill: node["fill"]},
            position: { x : node["x"] , y: node["y"]},
            style: {
                'background-color': col,
                'height' : size,
                'width' : size
            }
        };

        cy.add(object);
    }

    for (edge of input[1]) {
        if(edge["col"]=="gray"){
            col = "#ccc";
        }
        else if(edge["col"]=="red"){
            col = "#f00"
        }
        else {
            col = "#00f";
        }

        var object = {
            group: 'edges',
            data: {id: edge["id"], flow: edge["flow"] , source: edge["source"] , target: edge["target"]},
            style: {
             //   'target-arrow-shape': 'triangle',
                'mid-target-arrow-color': col,
                'mid-source-arrow-color': col,
                'line-color': col,
                'width': fToW(edge["flow"])
            }
        }
        cy.add(object);
        if(edge["flow"]>0){
            cy.$id(edge["id"]).style('mid-target-arrow-shape', 'vee')
        }
        else {
            cy.$id(edge["id"]).style('mid-source-arrow-shape', 'vee')
        }
           // cy.$id(edge["id"]).style("")
    }
}

var inp = [[{"id":1,"size":100,"fill":1,"x":200,"y":60},{"id":2,"size":200,"fill":0,"x":600,"y":60},{"id":3,"size":50,"fill":0,"x":200,"y":260},{"id":4,"size":50,"fill":1,"x":600,"y":260}],[{"id":13,"flow":200,"source":1,"target":3,col:"red"},{col:"gray","id":32,"flow":100,"source":3,"target":2},{col:"blue","id":24,"flow":50,"source":2,"target":4}]]

