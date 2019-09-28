import numpy as np


class Node:

    def __init__(self, threshold, generation=0):
        self.neighbors = np.array([])
        self.inflow = 0
        self.outflow = generation
        self.threshold = threshold
        self.is_leaf = (generation != 0)


class Edge:

    def __init__(self, node_u: Node, node_v: Node):
        node_u.neighbors = np.append(node_u.neighbors, node_v)
        node_v.edges += np.append(node_v.neighbors, node_u)
        self.u = node_u
        self.v = node_v
