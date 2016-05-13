![SINGULARITY](/logo.png)
## Decentralized Architecture for Evolutionary Computation

<p><b>Singularity</b> is a blockchain-based decentralized network for optimization
 of mathematical model parameters using 
<a href="https://en.wikipedia.org/wiki/Evolutionary_computation">Evolutionary 
Computation(EC)</a> algorithms, allowing the use of the computational power of 
several computers with to perform optimization and the use of the pre-optimized 
parámeters from external applications by connecting to the Bittrorrent or Webtorrent
networks where optimization payloads are shared. This repository contains a 
Node.js implementation of a proof-of-concept network node. 
</p>
<p>The optimization algorithms are executed as external applications (clients) written in any language 
capable of sending requests to a Singularity node including Web, mobile and Internet of Things(IoT) 
applications. As example optimization model, a neuroevolution algorithm (NEAT) is implemented in C++ 
with some decentralized optimization examples.
</p>
### ABSTRACT
<p>
This project proposes a communications protocol and a blockchain based consensus mechanism for a network architecture intended to perform distributed optimization using Evolutionary Computation (EC) techniques, leveraging the computing power of multiple peer-to-peer connected devices without central nodes to perform an optimization process cooperatively with the advantage of not having the single-points of failure as is observed on centralized network architectures. 
</p>
<p> 
EC techniques such as genetic algorithms, neuroevolution or swarm intelligence are global optimization methods characterized by the use of a population of candidate solutions that evolve in a search space in a way inspired by biological evolution principles like competition, selection or reproduction. EC techniques are used in a wide range of applications in both academic research and industrial environments. 
</p>
<p> 
A decentralized architecture allows heterogeneous hardware with independent implementations of the same optimization algorithm to work cooperatively in searching optimized model parameters, with no restrictions on the computing power of each node and with the flexibility to connect and disconnect nodes from the network without affecting the continuity of an optimization process. 
</p>
<p> 
The proposed architecture is defined by a protocol to handle the communication between peers and a shared blockchain as a ledger of the progress of an optimization process. A block in the blockchain contains an optimization state represented by a population. When some node finds an efficiency increment, it sends a HTTP request to its known peers containing a new block so they also broadcast the block to their known peers. Nodes manifest their verification and consensus to use the new block by replacing or merging their population with the one contained on the new block and by resuming their optimization processes, cryptographically signing subsequently found blocks with a hash of the verified one.
</p>
<p> 
Keywords: Optimization, Evolutionary Computation, Neuroevolution, Genetic Algorithm, Peer-to-Peer, Blockchain, Bittorrent, Web Services, Bitcoin Mining, Decentralized Networks, Foreign Exchange, Internet of Things, Proof-of-Work, Distributed Hash Table
</p>
### 1.	INTRODUCTION
<p> 
Evolutionary Computation techniques are used to search for optimum values of mathematical model parameters [1][2][3]. As the search for solutions in EC is based on trial and error, optimization of complex models may require the use of a large computational capacity for testing many candidate solutions or large datasets [4][5], that motivates our effort to propose a scalable architecture that allows to incorporate new computing resources to an optimization process without affecting its continuity. A decentralized architecture for optimization is justified by the fact that centralized architectures suffer from single-points of failure while the decentralized architectures don’t and that guarantees the continuity of a distributed optimization process as long some connected nodes remain working in the network. The continuity is particularly important in real-time problems which require continuous optimization or on-line training like foreign exchange trading agents that must adapt to ever-changing market conditions. 
</p>
<p> 
A characteristic of the EC algorithms, also called Evolutionary Algorithms (EA) is that an optimization process state is composed of a population of candidate solutions called specimens which represent points on a search space and are evaluated to determine their performance in a particular task and then they are slightly but randomly changed to be tested in a different location in the search space in the next iteration with the exception of the fittest specimens that remain unchanged between iterations [1]. 
</p>
<p> 
An optimization state can be replicated on another optimization process to produce two slightly different populations after one iteration of each process, but the efficiency is preserved due to the immutability of the fittest specimens. The replication of the population in a parallel optimization process is equivalent to an increase in the size of the total population due to the randomization made during each iteration that make replicated populations slightly different as shown in [6]. This feature is exploitable for escalation of computational capacity for optimization via increasing the total amount of candidate solutions being evaluated by sharing the optimization states between the devices running the same algorithm and input data, as shown in [7].  
</p>
<p> 
A shared ledger of the optimization process keeps record of the state reported by nodes which produced an increase in efficiency, synchronizing the optimization state of participating nodes by consensus and saving information about the evolution of the solution. Bitcoin implements a blockchain as a shared ledger of financial transactions, and a proof-of-work as a mechanism for consensus on the time of financial transactions between nodes cryptographically signing a block with a hash of the previously generated one to form a chain of validated blocks, but the blockchain is a distributed database that can be used in other applications like as ledger of registered of domain names [8] [9]. The use of a blockchain as ledger of progress of optimization states and as verification and consensus mechanism is a novel and adequate solution for broadcasting optimization states between network nodes to reach consensus on their validity.  While in Bitcoin, nodes manifest their block verification and consensus to use it by cryptographically signing the next generated block with a hash of the validated one [10], in the proposed architecture, nodes manifest their verification and consensus to use the new block by replacing or merging their population with the one contained on the new block and by resuming their optimization processes, cryptographically signing subsequently found blocks with a hash of the verified one.
</p>
### 2.	PROBLEM DEFINITION
<p> 
The problems addressed in this work are the low tolerance to failure in critical nodes of existing centralized network architectures for distributed optimization and the lack of a platform-independent mechanism to leverage the scalability of population using optimization state replication observed in Evolutionary Algorithms. 
</p>
### 3.	APPROACH TO SOLUTION
<p>
To solve the aforementioned problems, a decentralized network architecture is proposed, and is constituted of two components, the first is a protocol which defines the communication procedures of a node in the form of requests and responses, the second is a blockchain that nodes use as media to synchronize their optimization state.
</p>
<p> 
The decentralized architecture allows the use heterogeneous hardware with independent implementations of an optimization algorithm to work cooperatively in searching optimized parameters. The optimization algorithms are executed as external applications (clients) written in any language capable of sending HTTP requests to a node to download the latest optimum state or to notify the finding of a new optimum, so nodes can propagate it. 
</p>
<p> 
The use of a Service Oriented Architecture (SoA) pattern based on HTTP requests and responses, allows communication between implementations of a network node in diverse platforms and exists a methodology to develop service-oriented evolutionary algorithms [11] that will be used in this project. The use of SoA, allows to differentiate some roles for nodes in the network:  
•	A simple client: is a device that connects to a node only to retrieve a pre-trained model to be used in some external application, and do not implement the full communications protocol.
•	An optimizing client: is a device that connects to a node to report new found efficiency increments or to synchronize their optimization state with the network but do not implement the full communications protocol.
•	A stand-alone node: does not have optimization capabilities, but implements the full communications protocol, serving only as hub/gateway for clients and other nodes.
•	A full-node: have optimization capabilities, meaning that implements some EA alongside with the full communications protocol.
</p>
<p> 
The use of pre-optimized parameters from external applications are made by connecting to the Bittorrent networks where optimized parameters are shared as enabling their use from applications on Mobile and Internet of Things(IoT) platforms. Heterogeneous hardware such as a GPU cluster and a cellphone can connect and collaborate in real-time. Several nodes world-wide can optimize one or more models connecting to public peers via Internet. Also, private optimization experiments or applications can be realized by connecting nodes in private networks without Internet access.
</p>
### 4.	SCOPE AND LIMITATIONS
<p>
The scope is to implement a network node and test the implementation by measuring the time to train a model to a known efficiency with a different number of network nodes participating in an optimization process. The network node and the optimization models implemented are prototype software used as proof-of-concept for the proposed architecture and are not made to be used on insecure or production environments. 
</p>
<p> 
This project focus on the usage of the blockchain for an optimization process, not intend to implement the crypto-coin transactions dynamics generally associated with Bitcoin and is not designed to be a crypto-coin in the current state. Future work may include using the optimization process state as proof-of-work for cryptocurrency generation. 
</p>
### 5.	JUSTIFICATION
<p> 
Some machine learning platforms already support distributed architectures like Google Cloud MLTM, Microsoft Azure MLTM or Amazon AWS ML TM, but no public or anonymous nodes can freely connect to contribute to an existing distributed optimization process neither exists a standardized method to share the optimized parameters publicly so external applications can use them directly no commercial optimization platforms based on EC are available now, motivating our proposal for a solution.  Decentralized networks are tolerant to faults in any of their nodes, provide large scalability and they allow to publicly and anonymously share optimization states as files, allowing to re-use optimized model parameters from external applications. 
 </p>
<p> 
The re-usability of pre-optimized model parameters is being adopted by cloud Machine Learning services, but is only usable after finishing the optimization, not during the optimization process and to the date only some predictive and classification models are available to optimize only with machine learning algorithms which are more sensitive to local minimum issues in some problems than EA, this motivates the proposal of our   distributed optimization method for these types of algorithms and the use of the Bittorrent protocol to share the optimized parameters in real time, so external applications can use them while the optimization process is being performed . 
</p>
<p> 
The author of this work has previous experience with foreign exchange trading automation and with the selection, pre-processing and usage of financial variables in neuroevolution algorithms for data-series prediction which justifies the selection of forex experiments to test and validate the proposed architecture.
</p>
### 6.	METHODOLOGY
<p> 
Two aspects of the proposed architecture must be designed and implemented during the projects duration: a communications protocol and a blockchain structure. In the following sub chapters, these two components will be briefly conceptualized as starting point for the design process, and a methodology for design and implementation is selected based on an existing methodology for SoA development in EA [11].
</p>
### 7. Communications Protocol 
<p> 
A network node implements a service which receives JSON requests from external sources in a TCP port a returns a response. The main requests used to perform the optimization are: 
</p>
<p> 
•	GetCapabilities:  Returns the optimization capabilities of a node and the current node state including its contact list for peer discovery and message propagation.
•	OptimumFound: Propagate to other peers a new block containing a population with an efficiency increase, as new block of the blockchain.  Is sent to a node from an external program implementing an Optimization Model to initiate the propagation of the new optimization state when it finds an efficiency increment.
•	StartOptimization: Start, re-start or resume an optimization process on a node.
•	StopOptimization: Stop or pause an optimization process on the node.
</p>
<p> 
Every node has list of known peers, when a node starts, it sends a GetCapabilites request to a public node which returns the state of the node and copies its peer list. When some node finds an efficiency increment, it sends a OptimumFound request to its known peers containing a new block so they also broadcast the block to their known peers. Nodes manifest their verification and consensus to use the new block by replacing or merging their population with the one contained on the new block and by resuming their optimization processes, cryptographically signing subsequently found blocks with a hash of the verified one.
</p>
### 8. Blockchain Structure 
<p> 
The blockchain is composed of blocks interlaced by a field in the block header which is a hash of the previous block, every block is a JSON file shared in the Bittorrent network, and it has the following basic attributes in its structure:
•	Block_header
o	Source_node_id: Signature of the node which produced the block
o	Optimization_model_id: String identifying an optimization experiment
o	Maximum_population_efficiency: Efficiency of the champion
o	Champion_content_index: index in the specimen_i array
o	Previous_block_hash: Hash of the previous block
o	Timestamp
o	Size_of_block_contents : in bytes
o	Size_of_population 
•	Block_contents (for i=0 to Size_of_population)
o	specimen[i].efficiency: can be a vector for multi-objective optimization
o	specimen[i].parameters: neural network topology and weights in binary or  or JSON format for neuroevolution.
</p>
<p> 
The nodes download the last block from some peer and replace totally or partially its training population with the one contained in the block_contents attribute.
</p>
### 9. Design Methodology 
<p> 
A stand-alone node prototype will be developed in Node.js, and two additional full-node prototypes will be implemented in C++ with neural network evaluations in CUDA, for each of the proposed experiments mentioned in section 7.2. To intuitively manage the optimization process and to design and implement modular platform-independent components for nodes, some definitions are made and used in the code and documentation to follow the methodology for development of service-oriented EA described in [11]:
</p>
<p> 
•	Model: an algorithm with input variables, a state represented by the set of all the variables used in the model and output variables that are a subset of the state. A model is represented by a program.
•	Evaluation of a Model: the execution of the model's algorithm with its parameters and input data to obtain output data.
•	Parameters of a Model: a subset of values of state variables which value is constant during the evaluation of the model.
•	Optimizable Parameters of a Model: a subset of parameters that are static during the evaluation of the model and which can be optimized to maximize a Fitness or Efficiency function for a particular Universe Model.
•	Control Model (CM): The model to be optimized
o	Example of Control Model: Artificial Neural 
o	Examples of Optimizable Parameters:
	Topology and synapse weights of a ANN (optimization model: Neuroevolution Algorithm)
	Values of design parameters of electronic circuits, solid 3D parts or industrial processes (optimization model: Genetic Algorithm)
	Relationships between data for Data Mining (optimization model: Genetic Programming)
•	Universe Model (UM): A program that generate sensory outputs with optional actuatory inputs. The output of this model is a dataset which is feed to a control model. For example:
o	A database-reading program that generates an output dataset in each iteration which is feed to the CM in a supervised-learning neuroevolution algorithm.
o	A simulator which receives some inputs (CM actuatory outputs), an initial state and generate a new state with some of its variables exported as sensory outputs to be feed to the inputs of a CM in a non-supervised learning neuroevolution algorithm.
•	Efficiency Model (EM): Function to calculate a measurement of efficiency of a Control Model with some parameters in a Universe Model
•	Optimization Model (OM): Evolutive computing algorithm (i.e. NEAT) to obtain the parameters of the Control Model which maximize its Efficiency Model on a Universe Model.
•	Off-line Optimization: The Universe Model generates data from a database or a simulation.
•	On-line Optimization: The Universe Model creates data from a streaming connection to a data source.
</p>



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


 
