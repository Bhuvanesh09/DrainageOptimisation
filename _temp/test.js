var cy = cytoscape({
  container: $("#graphDiv"), // container to render in

  elements: [
    // list of graph elements to start with
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

  style: [
    // the stylesheet for the graph
    {
      selector: "node",
      style: {
        "background-color": "#00f"
        //'label': 'data(id)'
      }
    },

    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "#ccc",
        "mid-target-arrow-color": "#ccc",
        //    'mid-target-arrow-shape': 'vee',
        "arrow-scale": 2
      }
    }
  ],

  layout: {
    name: "grid",
    rows: 4
  }
});

function hToR(height) {
  var low = 30;
  var high = 70;
  var lowH = 0;
  var highH = 250;

  return low + ((high - low) * (height - lowH)) / (highH - lowH);
}
function fToW(flow) {
  var low = 0;
  var high = 10;
  var lowF = 0;
  var highF = 250;
  return low + ((high - low) * (flow - lowF)) / (highF - lowF);
}
function callme() {
  cy.nodes().positions(function(ele, i) {
    return {
      x: Math.random() * cy.width(),
      y: Math.random() * cy.height()
    };
  });
}

function makeGraph1(inp) {
  //making nodes here:
  for (node of inp[0]) {
    var col, size;
    if (node["fill"] == 5) {
      col = "#1a0000";
    } else if (node["fill"] == 4) {
      col = "#660000";
    } else if (node["fill"] == 3) {
      col = "#990000";
    } else if (node["fill"] == 2) {
      col = "#cc0000";
    } else if (node["fill"] == 1) {
      col = "#ff1a1a";
    } else if (node["fill"] == 0) {
      col = "#ff4d4d";
    } else if (node["fill"] == 9) {
      col = "#faa94d";
    } else if (node["fill"] == 8) {
      col = "#000";
    }

    size = hToR(node["size"]);
    var object = {
      group: "nodes",
      data: { id: node["id"], size: node["size"], fill: node["fill"] },
      position: { x: node["x"], y: node["y"] },
      style: {
        "background-color": col,
        height: size,
        width: size
      }
    };

    cy.add(object);
  }

  for (edge of inp[1]) {
    if (edge["col"] == "gray") {
      col = "#ccc";
    } else if (edge["col"] == "red") {
      col = "#f00";
    } else {
      col = "#00f";
    }

    var object = {
      group: "edges",
      data: {
        id: edge["id"],
        flow: edge["flow"],
        source: edge["source"],
        target: edge["target"]
      },
      style: {
        //   'target-arrow-shape': 'triangle',
        "mid-target-arrow-color": col,
        "mid-source-arrow-color": col,
        "line-color": col,
        width: fToW(edge["flow"])
      }
    };
    cy.add(object);
    if (edge["flow"] > 0) {
      cy.$id(edge["id"]).style("mid-target-arrow-shape", "vee");
    } else {
      cy.$id(edge["id"]).style("mid-source-arrow-shape", "vee");
    }
    // cy.$id(edge["id"]).style("")
  }
}

var inp = [
  [
    { id: 1, size: 100, fill: 1, x: 300, y: 60 },
    { id: 2, size: 200, fill: 0, x: 500, y: 60 },
    { id: 3, size: 50, fill: 3, x: 200, y: 260 },
    { id: 4, size: 50, fill: 5, x: 600, y: 260 }
    // {"id":5,"size":50,"fill":5,"x":700,"y":360},
    // {"id":6,"size":50,"fill":5,"x":700,"y":360}
  ],
  [
    { id: 13, flow: 200, source: 1, target: 3, col: "red" },
    { col: "gray", id: 32, flow: 100, source: 3, target: 2 },
    { col: "blue", id: 24, flow: 50, source: 2, target: 4 }
  ]
];
var inp2 = [
  [
    { id: 1, size: 150, fill: 8, x: 300, y: 60 },
    { id: 2, size: 50, fill: 9, x: 500, y: 60 },
    { id: 3, size: 50, fill: 9, x: 300, y: 260 },
    { id: 4, size: 50, fill: 9, x: 400, y: 260 },
    { id: 5, size: 50, fill: 9, x: 600, y: 160 },
    { id: 6, size: 50, fill: 9, x: 300, y: 500 },
    { id: 7, size: 50, fill: 9, x: 500, y: 480 },
    { id: 8, size: 50, fill: 9, x: 700, y: 480 }
  ],
  [
    { id: 10, flow: 100, target: 1, source: 2, col: "red" },
    { id: 11, flow: 100, target: 1, source: 3, col: "red" },
    { id: 12, flow: 100, target: 2, source: 5, col: "red" },
    { id: 13, flow: 100, target: 3, source: 5, col: "blue" },
    { id: 14, flow: 100, target: 3, source: 4, col: "red" },
    { id: 15, flow: 100, target: 3, source: 6, col: "blue" },
    { id: 16, flow: 100, target: 4, source: 7, col: "red" },
    { id: 17, flow: 100, target: 5, source: 8, col: "red" },
    { id: 18, flow: 100, target: 7, source: 6, col: "red" },
    { id: 19, flow: 100, target: 7, source: 8, col: "blue" }
  ]
];

function flowChange(i) {
  const timeFlow = [];
}
