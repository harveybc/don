![SINGULARITY](/logo.png)

Decentralized network for optimization of mathematical model's parameters using <a href="https://en.wikipedia.org/wiki/Evolutionary_computation">Evolutive Computing</a> algorithms, allowing the use of the computational power of several computers to optimize one or more models.

A Webtorrent/Bittorrent shared blockchain serves as decentralized ledger of the progress of the optimization and also serves to extract the initial state for the the Evolutionary Computing algorithm (optimization model) in the network's nodes, wich execute this optimization model and generate new blocks for the blockchain when they find an increment in efficiency.

### Description

The Evolutive Computing algorithms have the following characteristics 

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


 
