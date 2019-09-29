import numpy as np
import json

time = 0


class Node:

    def __init__(self, threshold, generation=0, altitude=0, rain=0):
        self.neighbors = np.array([])
        self.inflow = 0
        self.outflow = generation
        self.threshold = threshold
        # Things for Graph 1
        self.fill_level = 0
        self.altitude = altitude
        self.rain = 0
        self.index = 0

    def evolve(self):
        self.fill_level += self.inflow - \
            self.outflow + (self.rain if time < 5 else 0)

    def load_from_json(self, neighbors, inflow, outflow, generation, threshold, altitude):
        self.neighbors = np.array(neighbors)
        self.inflow = inflow
        self.outflow = outflow + generation
        self.threshold = threshold
        self.is_leaf = (generation != 0)
        self.altitude = altitude

    def is_flooded(self):
        return self.fill_level > self.threshold

    def will_flood(self):
        return self.threshold + self.outflow - self.inflow <= self.fill_level

    def to_flood(self):
        return self.threshold - self.fill_level - self.outflow


class Edge:

    def __init__(self, node_u: Node, node_v: Node, capacity: int):
        node_u.neighbors = np.append(node_u.neighbors, node_v)
        node_v.neighbors = np.append(node_v.neighbors, node_u)
        self.u = node_u
        self.v = node_v
        self.capacity = capacity
        self.flow = 0


node0 = Node(rain=0, altitude=0,  generation=100, threshold=1000)
node1 = Node(rain=0, altitude=200, generation=100, threshold=1000)
node2 = Node(rain=100, altitude=50, generation=100, threshold=1000)
node3 = Node(rain=0, altitude=200, generation=100, threshold=1000)
node4 = Node(rain=0, altitude=200, generation=100, threshold=1000)
node5 = Node(rain=0, altitude=150, generation=100, threshold=1000)
node6 = Node(rain=200, altitude=150, generation=100, threshold=1000)
node7 = Node(rain=200, altitude=50, generation=150, threshold=1000)
node8 = Node(rain=200, altitude=14, generation=250, threshold=1000)
node9 = Node(rain=0, altitude=20, generation=-1000, threshold=1000)

edge12 = Edge(node1, node2, 50)
edge13 = Edge(node1, node3, 50)
edge24 = Edge(node2, node4, 10000)
edge56 = Edge(node5, node6, 10000)
edge45 = Edge(node4, node5, 10000)
edge46 = Edge(node4, node6, 10000)

nodes = [node0, node1, node2, node3, node4, node5, node6, node7, node8, node9]
for i in range(len(nodes)):
    nodes[i].index = i


total_time = 10
for i in range(total_time):
    for node in nodes:
        for neighbor in node.neighbors:
            if not neighbor.is_flooded():
                neighbor.inflow += max(node.outflow -
                                       node.inflow, neighbor.will_flood())
                neighbor.outflow -= max(node.outflow -
                                        node.inflow, neighbor.will_flood())
        node.evolve()

result = {
    "node_list": [
        {
            "inflow": node.inflow,
            "outflow": node.outflow,
            "threshold": node.threshold,
            "fill_level": node.fill_level,
            "altitude": node.altitude,
            "rain": node.rain
        } for node in nodes],
    "edges_list": [
        {
            "u_node_index": edge.u.index,
            "v_node_index": edge.v.index,
            "capacity": edge.capacity,
            "flow": edge.flow
        } for edge in [edge12, edge13, edge24, edge45, edge56, edge46]
    ]
}
output = json.dumps(result)

with open('graph1.json', 'w') as file:
    file.write(output)
