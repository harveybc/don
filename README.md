![SINGULARITY](/logo.png)
### Making the World Smarter....Permanently

Decentralized network for optimization of mathematical model's parameters using <a href="https://en.wikipedia.org/wiki/Evolutionary_computation">Evolutive Computing</a> algorithms, allowing the use of the computational power of several computers to optimize one or more models.

A Webtorrent/Bittorrent shared blockchain serves as decentralized ledger of the progress of the optimization and also serves to extract the initial state for the the Evolutionary Computing algorithm (optimization model) in the network's nodes, wich execute this optimization model and generate new blocks for the blockchain when they find an increment in efficiency.

### Definitions
<ul>
<li>
<b>Model</b> = an algorithm with input variables, a state represented by the set of all the variables in used the model and some output variables that are a subset of the state.
</li><li>
<b>Evaluation of a Model</b> = the execution of the model's algoritm with it's parameters and input data to obtain output data.
</li><li>
<b>Parameters of a Model</b> =  a subset of values of state variables wich value is constant during the evaluation of the model.
</li><li>
<b>Optimizable Parameters of a Model</b> =  a subset of parameters wich are static during the evaluation of the model and wich can be optimized to maximize a Fitness or Efficiency function for a particular universe of information represented by a Universe Model.
</li><li>
<b>Control Model (CM)</b> = The model to be optimized
<ul>
 <li>Inputs: Universe Model sensors - Exported variables from the UM State (i.e. input values for a ANN)
 </li>
 <li>Outputs: Universe Model actuators - Variables to be imported to the UM (i.e. output values from a ANN)
 </li>
 <li><b>Examples of Optimizable Parameters depending on Optimization Model:</b> 
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

</ul>

Universe Model (UM) = Generates data to be feed in the Control Model

The payload of the optimization of a model is a set of parameters wich upon be 

Optimization Model (OM): An evolutive computing algorithm 

The Evolutive Computing algorithms have the following characteristics:


The objective is to produce a set of optimized parameters saved in a shared file (JSON or any binary format) for a set of interacting models, all the models are represented by shared libraries or programs (i.e. Javascript libraries) and both the JSON parameters and the Javascript models are shared using Webtorrent thus being usables from external applications.  


One example of the optimizable model is a neural network.
One example of the parameters generated vía optimization are the weights and topology of the neural network.


NeuralZoo is a open source, GNU GPL v3 licensed, repository of javascript libraries wich fall in one of five categories:
<ul>
<li>Universe Model (UM): A program with optional inputs for a Control Model wich affect it´s state.</li>
<li>Control Model (CM): Read inputs from a Universe Model's state and produces outputs wich affect the UM next state.</li>
<li>Efficiency Model (EM): Calculates a measurement of efficiency of the CM in the UM</li>
<li>Optimization Model (OM): Apply neurocomputing techniques (NEAT, genetic algos) to obtain the parameters of the CM wich maximize it´s EM on a UM.</li>
</ul>
### Components

WIP Development is sponsored by Ingeni-us (http://www.ingeni-us.com).

### Behavior

WIP

### Documentation

WIP

### Binary Downloads, Community, etc.

WIP

### Installation and usage issues

WIP


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


 
