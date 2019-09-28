var cy = cytoscape({

    container: $("#graphDiv"), // container to render in
  
    elements: [ // list of graph elements to start with
      { // node a
        data: { id: 'a' }
      },
      { // node b
        data: { id: 'b' }
      },
      { // node a
        data: { id: 'c' }
      },
      { // node a
        data: { id: 'd' }
      },
      { // node a
        data: { id: 'e' }
      },
      { // edge ab
        data: { id: 'ab', source: 'a', target: 'b' }
      }
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
          'mid-target-arrow-shape': 'vee',
          'arrow-scale': 2
        }
      }
    ],
  
    layout: {
      name: 'grid',
      rows: 4
    }
  
  });


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
    for (node in input[0]){
        var object = { 
            group : 'nodes',
            data: {id: node["id"], size: node["size"] , size: node["fill"]},
            position: { x : node["x"] , y: node["y"]}
        };

        cy.add(object);
    }

    for (edge in input[1]) {
        var object = {
            group: 'edges',
            data: {id: edge["id"], flow: edge["flow"] , source: edge["source"] , target: edge["target"]},
            style: {'target-arrow-shape': 'triangle'}
        }
    }
}