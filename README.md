![SINGULARITY](/logo.png)
### Making the World Smarter....Permanently

Singularity is a distributed ledger (blockchain) based decentralized network for optimization of mathematical model's parameters using <a href="https://en.wikipedia.org/wiki/Evolutionary_computation">Evolutive Computing</a> algorithms, allowing the use of the computational power of several computers to perform optimization and the use of the pre-optimized models from external applications by connecting to the Webtorrent network where optimization payloads are shared.

### Optimization Framework 

To intuitively manage the decentralized optimization process, some components were identified with the following definitions:
<ul>
<li>
<b>Model</b> = an algorithm with input variables, a state represented by the set of all the variables in used the model and some output variables that are a subset of the state. A model is represented by a program, i.e. a Javascript file.
</li><li>
<b>Evaluation of a Model</b> = the execution of the model's algoritm with it's parameters and input data to obtain output data.
</li><li>
<b>Parameters of a Model</b> =  a subset of values of state variables wich value is constant during the evaluation of the model.
</li><li>
<b>Optimizable Parameters of a Model</b> =  a subset of parameters wich are static during the evaluation of the model and wich can be optimized to maximize a Fitness or Efficiency function for a particular universe of information represented by a Universe Model.
</li>
<li>
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
<li><b>Universe Model (UM)</b> = A program wich generate sensory outputs with optional actuatory inputs.
</li>
<li>Efficiency Model (EM): Function wich calculates a measurement of efficiency of a Control Model with some parameters in a Universe Model</li>
<li>Optimization Model (OM): Evolutive computing algorithm (i.e. NEAT) to obtain the parameters of the Control Model wich maximize it´s Efficiency Model on a Universe Model.</li>
</ul>

### Network Architecture

The optimized parameters are shared vía Webtorrent/Bittorrent to be used from any Web/CLI application. 
A shared blockchain is used as a decentralized ledger of the optimization progress and serves to extract the initial state for the the Evolutionary Computing algorithm (optimization model) in the network's nodes, wich execute this optimization model and generate new blocks for the blockchain when they find an increment in efficiency.
Universe Model (UM) = Generates data to be feed in the Control Model

### Network Node 

The objective of the optimization process is to produce a set of optimized parameters saved in a shared file (JSON or any binary format) for a set of interacting models, all the models are represented by shared libraries or programs (i.e. Javascript libraries) and both the JSON parameters and the Javascript models are shared using Webtorrent thus being usables from external applications.  

### Network Node 
One example of the optimizable model is a neural network.
One example of the parameters generated vía optimization are the weights and topology of the neural network.

WIP Development is sponsored by Ingeni-us (http://www.ingeni-us.com).

### Documentation

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


 
