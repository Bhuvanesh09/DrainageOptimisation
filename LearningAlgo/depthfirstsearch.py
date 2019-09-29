from graph import Node
from graph import Edge
import json
import numpy as np

nodes = list()

with open('input.json') as json_file:
    data = json.loads(json_file.read())
    # print(data)

for node in data:
    # assert type(node) is Node
    # n = Node(0, 0)
    print(node['neighbors'], node['inflow'], node['outflow'],
          node['generation'], node['threshold'], node['altitude'])
    # nodes.append(n)
    print()
