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
          'background-color': '#00f',
          'label': 'data(id)'
        }
      },
  
      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle'
        }
      }
    ],
  
    layout: {
      name: 'random',
      rows: 1
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