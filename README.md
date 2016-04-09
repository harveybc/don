![SINGULARITY](/logo.png)
## Decentralized Architecture for Evolutionary Computation

<b>Singularity</b> is a blockchain-based decentralized network for optimization of mathematical model parameters using <a href="https://en.wikipedia.org/wiki/Evolutionary_computation">Evolutionary Computation</a> algorithms, allowing the use of the computational power of several computers to perform optimization and the use of the pre-optimized models from external applications by connecting to the Bittrorrent or Webtorrent networks where optimization payloads are shared. This repository contains a Node.js implementation of a proof-of-concept network node.

## Optimization Framework 

To intuitively manage the optimization process, the following definitions are made:
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

## Optimization Process 

The objective of the optimization process is to produce a set of optimized parameters saved in a shared file (JSON or any binary format) for a set of interacting models, all the models are represented by shared libraries or programs (i.e. Javascript libraries) and both the JSON parameters and the Javascript models are shared using Webtorrent thus being usables from external applications.  

The optimized parameters are shared vía Webtorrent/Bittorrent to be used from any Web/CLI application.
<br/>
A shared blockchain per CM is used as a distributed ledger of the optimization progress and serves to read the initial state for the the Evolutionary Computing algorithm (OM) in the network's nodes, wich execute this optimization model and generate new blocks for the blockchain when they find an increment in efficiency with  transactions called "Coinbase transactions" in Bitcoin . This blockchains are called sidechains.
<br/>
The transactions on the blocks of the sidechains are composed of the parameters tested for each of the population individuals and the resulting efficiency, the blocks are ordered in descending order of efficiency so the first is always the fittest. 
<br/>
A separated blockchain is used as root ledger of the progress of all models available in the network and the complexity of the last optimum solution. This blockchain is called root-chain and contains blocks of transactions, a set of a CM's identification, timestamp, measurement of complexity of actual solution and efficiency of actual solution. 

The transactions on the blocks of the root-chain are composed of the identification of the CM, timestamp and efficiency .

## Network Architecture

The network is composed of nodes, in this phase of the project only a "trusting" version of a node is implemented, meaning that no verification of the efficiency reported by other nodes is made. In the future a "untrusting" node version may be implemented, see below section "Future Work"
<br/>
A CLI trusting network node implements a service wich receives JSON requests from external sources in a TCP port an returns a response, also allows the discovery of network peers. The main requests used to perform the optimization are:
<br/>
<ol>
<li>GetOptimizedParams(model_id) Retorna un JSON que contiene la dirección de torrent del último bloque del sidechain para MC requerido, si no lo tiene, envía el mismo request a otro nodo(realiza broadcast para actualizar su lista de peers). En el último bloque, se ecuentran como transacciones las direcciones de torrent de los últimos parámetros candidato (JSON files) que se usan como estado inicial del Modelo de Optimización. Si el parámetro model_id es 0, se retorna la dirección de torrent del último bloque del root-blockchain para que el cliente pueda seleccionar el model_id de las transacciones que contene el bloque que contienen la dirección de torrent, la complejidad actual(Kormogorov para ANNs) y la eficiencia de cada CM.
</li>
<li>GetModelOutput(model_id) requerido? WIP.
</li>
</ol>
<br/>
WIP

## Network Node Description 
WIP 



## Blockchain Description
WIP 
## Block Description
WIP
## Use Cases

WIP

## Documentation

WIP

### Binary Downloads, Community, etc.

WIP

### Installation and usage issues

WIP
### Future Work
A "non-trusting" version of Singularity would require consensus and verification to publish a new sidechain/root-blockchain blocks, meaning that public-private keys must be created to verify the identification of minning nodes and also will open the posibility to use Singularity as an altenative Bitcoin-like crypo-coin minning procedure. But the remaining problem of finding new UM and CM continually to optimize and produce currency in the process is an  open problem. A possible approach would be to use complexity-variable dataset-producing Universe Models with complexity-variable Control Models, the only known examples of such scalable control models are the CPPN networks and the HyperNEAT Neuroevolution technique wich produce neuroal networks of variable complexity.   
<br/>
This project focus on the Optimization process with the blockchain and NOT in the cryptocoin transactions dynamics and is not designed to be a Crypto-Coin in the current state. Future work may include implementing a "trustless" cryptocurrency functionality or integrating the optimization as crypto-coin minning mechanism within other crypto-currency specialized projects like Ethereum that implements Smart Contracts. 
<br/>
Currency generation can be associated to the Coinbase transaction of the root blockchain, generating cryptocurrency for the node wich discovered the fittest parameters for a CM, this allows to have the second type of transaction: cryptocurrency transactions composed of source, target and quantity of currency to be saved in this blockchain like in Bitcoin. The generation of coin is made with a "coinbase transaction" wich transfer to it's submiting address (like bitcoin address) a quantity of currency proportional to the increase of efficiency and invested bandwidth and cpu consumption spent by the optimization process (complexity of the CM with parameters).  
<br/>
Also, the future use as crypto-coinwould allow a node can receive a payment based on a per-node, processing-power-based and bandwidth based, fee to exclusively evaluate or optimize a offline or on-line model(online optional????????????????). He would create a WebRTC Data Channel p2p connection with the requesting client and start streaming data to the CM to obtain an output stream.(only if online????????????????)

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


 
