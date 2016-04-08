![SINGULARITY](/logo.png)
## Decentralized Architecture for Evolutionary Computation

<b>Singularity</b> is a blockchain-based decentralized network for optimization of mathematical model parameters using <a href="https://en.wikipedia.org/wiki/Evolutionary_computation">Evolutionary Computation</a> algorithms, allowing the use of the computational power of several computers to perform optimization and the use of the pre-optimized models from external applications by connecting to the Webtorrent network where optimization payloads are shared. This repository contains a Node.js and a C++ network node implementations.

## Optimization Framework 

To intuitively manage the decentralized optimization process, some components were identified with the following definitions:
<ul>
<li>
<b>Model</b>: an algorithm with input variables, a state represented by the set of all the variables used in the model and output variables that are a subset of the state. A model is represented by a program, i.e. a Javascript file.
</li><li>
<b>Evaluation of a Model</b>: the execution of the model's algoritm with it's parameters and input data to obtain output data.
</li><li>
<b>Parameters of a Model</b>:  a subset of values of state variables wich value is constant during the evaluation of the model.
</li><li>
<b>Optimizable Parameters of a Model</b>:  a subset of parameters wich are static during the evaluation of the model and wich can be optimized to maximize a Fitness or Efficiency function for a particular Universe Model.
</li>
<li>
 <b>Control Model (CM)</b>: The model to be optimized
 <ul>
  <li>Example of Control Model:  Artificial Neural Network implemented in a Javascript file</li> 
  <li>Examples of Optimizable Parameters: 
   <ol>
    <li>Topology and synapse weights of a ANN (optimization model: Neuroevolution Algorithm)  
    </li>
    <li>Values of design parameters of electronic circuits, solid 3D parts or industrial processes (optimization model: Genetic Algorithm)
    </li>
    <li>Relationships between data for Data Minning (optimization model: Genetic Programming)
    </li>
   </ol>
  </li>
 </ul>
</li>
<li><b>Universe Model (UM)</b>: A program wich generate sensory outputs with optional actuatory inputs. The output of this model is a dataset wich is feed to a control model. For example:
 <ul>
  <li>  A database-reading program wich generates a output dataset in each iteration wich is feed to the CM in a supervised-learning neuroevolution algorithm.
  </li>
  <li>  A simulator implemented in Javascript wich receives some inputs(CM actuatory outputs), an initial state and generate a new state with some of it's variables exported as sensory outputs to be feed to the  inputs of a CM in a non-supervised learning neuroevolution algorithm.  
  </li>
  </ul>
</li>
<li><b>Efficiency Model (EM)</b>: Function to calculate a measurement of efficiency of a Control Model with some parameters in a Universe Model</li>
<li><b>Optimization Model (OM)</b>: Evolutive computing algorithm (i.e. NEAT) to obtain the parameters of the Control Model wich maximize it´s Efficiency Model on a Universe Model.</li>
<li><b>Off-line Optimization</b>: The Universe Model generates data from a database or a simulation.</li>
<li><b>On-line Optimization</b>: The Universe Model creates data from a streaming connection to a data source.</li>
</ul>

## Network Architecture

The optimized parameters are shared vía Webtorrent/Bittorrent to be used from any Web/CLI application.
<br/>
A shared blockchain per CM is used as a distributed ledger of the optimization progress and serves to read the initial state for the the Evolutionary Computing algorithm (OM) in the network's nodes, wich execute this optimization model and generate new blocks for the blockchain when they find an increment in efficiency. This blockchains are called sidechains.
<br/>
The transactions on the blocks of the sidechains are composed of the parameters tested for each of the population individuals and the resulting efficiency, the blocks are ordered in descending order of efficiency so the first is always the fittest. 
<br/>
A separated blockchain is used as root ledger of the progress of all models available in the network and the complexity of the last optimum solution. This blockchain is called root-chain and contains blocks with transactions, the main of wich is the called Coinbase transaction wich is a set of a CM's identification, timestamp, measurement of complexity of actual solution and efficiency of actual solution currency generation can be associated to the Coinbase transaction, generating cryptocurrency for the node wich discovered the fittest parameters for a CM, this allows to have cryptocurrency transactions composed of source, target and quantity of currency to be saved in this blockchain like in Bitcoin.  
<br/>
The transactions on the blocks of the root-chain are composed of the identification of the CM, timestamp, eff and may also host fincancial transactions between únique node identifications (optional use of accounts?????????????????????????). The generation of coin is made with a "coinbase transaction" wich transfer to it's submiting address (like bitcoin address) a quantity of currency proportional to the increase of efficiency and invested bandwidth and cpu consumption spent by the optimization process (complexity of the CM with parameters).  
<br/>
A node can receive a payment based on a per-node, processing-power-based and bandwidth based, fee to exclusively evaluate or optimize a offline or on-line model(online optional????????????????). He would create a WebRTC Data Channel p2p connection with the requesting client and start streaming data to the CM to obtain an output stream.(only if online????????????????)


## Optimization Process 

The objective of the optimization process is to produce a set of optimized parameters saved in a shared file (JSON or any binary format) for a set of interacting models, all the models are represented by shared libraries or programs (i.e. Javascript libraries) and both the JSON parameters and the Javascript models are shared using Webtorrent thus being usables from external applications.  

A CLI network node implements a service wich receives JSON requests from external sources in a TCP port an returns a response. The main requests used to perform the optimization are:

1. GetOptimizedParams(model_id) Retorna un JSON que contiene la dirección de torrent del último bloque del sidechain para MC requerido. En el último bloque, se ecuentran como transacciones las direcciones de torrent de los últimos parámetros candidato (JSON files) que se usan como estado inicial del Modelo de Optimización. Si el parámetro model_id es 0, se retorna la dirección de torrent del último bloque del root-blockchain para que el cliente pueda seleccionar el model_id de las transacciones que contene el bloque que contienen la dirección de torrent, la complejidad actual(Kormogorov para ANNs) y la eficiencia de cada CM.
2. GetModelOutput(model_id) WIP.

WIP

## Blockchain Description
WIP 
## Block Description
WIP
## Network Node Operation
WIP Development is sponsored by Ingeni-us (http://www.ingeni-us.com).
## Use Cases

WIP

## Documentation

WIP

### Binary Downloads, Community, etc.

WIP

### Installation and usage issues

WIP

### License

 *    This file is part of Singularity, a open-source descentralized control model
 *    simulation and optimization platform. Work in Progress.
 *    
 *    The use of Singularity in any military applications intended to be used 
 *    in defensive or ofensive products is prohibited. 
 * 
 *    Singularity is free software, hardware and data; you can redistribute it 
 *    and/or modify it under the terms of the GNU General Public License as 
 *    published by the Free Software Foundation; either version 3, or (at your 
 *    option) any later version.
 *
 *    Singularity is distributed in the hope that it will be useful, but WITHOUT
 *    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *    FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
 *    for more details.
 * 
 *    You should have received a copy of the GNU General Public License
 *    along with GCC; see the file COPYING3.  If not see
 *    <http://www.gnu.org/licenses/>. 


 
