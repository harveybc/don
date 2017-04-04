![SINGULARITY](/logo.png)
## Decentralized Architecture for Evolutionary Computation

<p><b>Singularity</b> is a blockchain-based decentralized platform for optimization
 of mathematical model parameters using 
<a href="https://en.wikipedia.org/wiki/Evolutionary_computation">Evolutionary 
Computation(EC)</a> algorithms.

### Abstract
<p>
The Evolutionary Computation (EC) techniques such as genetic algorithms, neuroevolution or swarm intelligence are optimization methods characterized by the use of a population of candidate solutions that evolve in a search space in a way inspired by biological evolution principles like competition, selection or reproduction. There are several models for implementing EC techniques in distributed processing architectures (dEC), the models with better fault tolerance and lower communicational cost are the hybrid models based on the so-called island model. 

These dEC models have been implemented in multiple frameworks or software platforms and they are adequate for academic research applications in controlled environments, but the existing implementations have low fault tolerance in some nodes, little or no communications security and none of them have result reliability mechanisms, limiting their use in industrial applications or applications running over insecure networks as the Internet.

This document proposes a decentralized software platform for implementing distributed Evolutionary Algorithms (dEA) using the island model and hybrid models. This platform aims to improve the fault-tolerance over existing solutions by using a decentralized architectural pattern, to increase the communications security by using public-key cryptography, and to improve the results reliability by implementing the traceability of the operations performed during dEC processes.

The proposed platform explores the use of a blockchain as the one used in Bitcoin, modifying it to store operations traceability information and state synchronization of the participating nodes in multiple simultaneous dEC processes.
 
A validation of the fault-tolerance of applications developed for the platform will be made by designing and implementing a prototype node and an application for reinforcement learning using dEC in the domain of foreign exchange trading automation.
</p>
### 1.	INTRODUCTION
Evolutionary Computation techniques are used to search for optimum values of mathematical model parameters [1] [2] [3]. As the search for solutions in EC is based on trial and error, optimization of complex models may require the use of a large computational capacity for testing many candidate solutions or large datasets [4] [5].

The defining characteristic of an Evolutionary Algorithm (EA) is that an optimization process state is composed of a population of candidate solutions called specimens representing points in a search space. These specimens are evaluated to determine their performance in a particular task and then they are slightly but randomly modified to be tested in a different location in the search space during the next iteration. 

A large motivation for this work is the fact that EC techniques can be applied to a wide spectrum of real world applications, including: systems design [6], simulation optimization [7], resource scheduling [8],  network planning [9], feature extraction [10] and parameter tuning of machine learning models such as neural networks [11]. All of these applications would benefit from enhanced reliability and security, these quality attributes are often ignored in research-oriented software for academic usage, but they are of prime importance in industrial applications.

The implementation of an EA in a distributed architecture, can be made using many existing architectural models, but the one that provides the best fault-tolerance and lower communicational cost is the island-model. The island model executes parallel processes with independent populations in each network node and they only communicate to each other with a migration operator that merges the best performing specimens of each process with other processes to propagate the best solutions through the network. 

The island-model is also used as higher layer in model ensembles in the so-called hybrid-models. Existing frameworks implementing hybrid-models are either programming language-specific or lack fault-tolerance, reliability or security features required for production EC applications over insecure environments.

As an improvement over the existing island-model implementations, the proposed platform will have a decentralized architectural pattern that would enhance the fault-tolerance of multiple simultaneous distributed EC processes in a single network. The proposed platform uses multicast with a flooding mechanism for achieving a decentralized fault-tolerant architecture that can execute multiple processes and explores the usage of a blockchain, a data structure used in Bitcoin. The block-chain will be adapted to the functions of tracing the operations between nodes participating in EC processes, providing a result reliability mechanism and providing synchronization data for participating nodes. 

### 2.	 POSSIBLE TITLE
“A DECENTRALIZED SOFTWARE PLATFORM FOR EVOLUTIONARY COMPUTATION WITH HYBRID MODELS”


### 3.	PROBLEM DEFINITION
### 3.1	PROBLEM STATEMENT
The existing frameworks for hybrid-model distributed optimization with EC are either programming language specific [12] [13], centralized or do not provide mechanisms for traceability of results requiring the participation of trusted nodes. The requirement of trust for participating nodes and the lack of reliability or security features limit the use of existing implementations for production EC applications over insecure environments.

It is observed that: a decentralized architectural pattern could be an improvement since it addresses the low tolerance to failure found in centralized software architectures. The use of an API provides a language-agnostic interface for programming, and the use of a consensus system based on the Bitcoin blockchain could allow the collaboration between trust-less nodes in a decentralized network since node results are validated by a network consensus and not just by a central authority. 
3.2	SCOPE AND LIMITATIONS
This project includes to design and implementation of the proposed platform components and the validation of the tolerance to failures by removing nodes participating in an optimization process. The platform uses a hybrid cryptographic system with a RSA cipher for communications privacy since these systems are widely used, but more advanced ciphers can be used since the proposed platform is extensible and modular. 


### 4.	OBJECTIVES
### 4.1	GENERAL OBJECTIVE
To design, implement and test a prototype of the proposed software platform and to deploy an application for optimization with distributed EC techniques in this platform.  
### 4.2	SPECIFIC OBJECTIVES
•	To design the platform for distributed EC, the design includes describing its requirements, components (nodes), relationships, desired behavior, data exchanged and data structures used.
•	To define communications protocol between participating nodes with the objective of achieving the desired behavior of the platform. The information exchanged in this protocol will be used for synchronization of nodes participating in an EC process.
•	To implement the communications protocol in a prototype node that listens to REST API requests from applications or other nodes.
•	To implement an application for distributed EC that uses the proposed platform in the foreign exchange trading automation domain.
•	To perform tests to validate the scalability, fault-tolerance, traceability, reliability and multi-process support of the proposed software platform.
### 4.3	EXPECTED RESULTS
•	The design and implementation of a prototype node of the proposed platform, this implementation will be used for all the participating nodes in the dEC experiments. 
•	A distributed application for reinforcement learning training in the forex trading automation domain built on the proposed platform. 
•	The application should validate the following quality attributes provided by the proposed platform:
o	Scalability, so by adding nodes to an application, the training time to a known performance should be decremented. 
o	Fault-tolerance, so a process should continue to execute when some nodes are removed. 
o	Traceability, the platform must trace of operations between nodes participating in an application. The trace should be available for reading while the optimization process is running.
o	Reliability of results, the app must have mechanisms allowing the use of non-trusted nodes, for testing this, an invalid result will be introduced from a working node and the network should reject it by consensus and continue the process. 
o	Multi-processing, the platform should be able to execute multiple applications simultaneously by sharing some nodes, this will be tested by running a parallel application with different working nodes but sharing the same routing nodes.

### 5.	JUSTIFICATION
Distributed EC has many fields of real-world application, some applications include but are not limited to:  systems design like VLSI routing [6] or simulation optimization [7], resource scheduling i.e. cancer treatment scheduling [8],  network planning [9], transport i.e. traffic estimation [14], classifier optimization [15], feature extraction [10] and parameter tuning of machine learning models such as neural networks [11]. This variety of applications justify the effort to improve existing implementations to overcome their downfalls and to provide the reliability that a platform for industrial applications over insecure networks requires.

Reliability is a desirable quality attribute for an industrial application, a distributed optimization platform is more reliable when it reduces the factors that can interrupt an optimization process or corrupt its results. Also, is desirable for its implementation that the programming interface is language-agnostic so the working nodes can use different implementations of an EA in heterogeneous hardware. 

The fault-tolerance can be implemented by using a decentralized architectural pattern, since decentralized networks are tolerant to faults in any of their nodes and provide large scalability. A programming language independent interface like a REST API would allow the implementation of an EA in multiple languages for heterogeneous hardware.

The possibility of using the blockchain as a reliability mechanism for trust-less decentralized optimization with EA is the primary justification for this work, this proposal is the first use of the blockchain technology for distributed EA. A blockchain provides the consensus, traceability and trust-less node collaboration that can be used in distributed EA to make the results reliable in processes executing over public or insecure networks as the Internet. 

Also a secondary justification is the fact that while some distributed EA frameworks for particular languages as Python [12] or Matlab [13] exist, they are used for academic purposes and not for industrial production, meaning that they are either not language-agnostic, fault-tolerant or have the security and traceability features that an industrial production application would require.  

A foreign exchange trading automation experiment will be performed as an application of distributed EC due to the author’s previous experience with this problem domain.

  
6.	THEORETICAL FRAMEWORK AND STATE OF THE ART
In the following subsections, the theoretical framework and state of the art of the proposed platform and prototype design topics are described and the existing distributed EC platforms are discussed. The platform topics are: evolutionary computation, decentralized architectural pattern, public-key cryptography and blockchain. The prototype experiment topics are: reinforcement learning and automated foreign exchange.
### 6.1	PLATFORM TOPICS
In this section the topics related to the platform are described. Evolutionary computation is the set of techniques that can use the proposed architecture, the REST Application Programming Interface allows language-agnostic implementation of evolutionary algorithms in heterogeneous hardware, the decentralized architectural pattern uses REST and allows fault-tolerance in any node of the optimization network, the public-key cryptography allows to secure the communication between participating devices and is a key concept in the blockchain technology that is the last topic described. 

### 6.1.1	Evolutionary Computation (EC)

The proposed platform is going to be designed specifically for distributed optimization using Evolutionary Computation techniques. EC is a field of artificial intelligence that uses global optimization algorithms called Evolutionary Algorithms (EA) that are characterized by imitating Darwinian principles such as reproduction, mutation, recombination, natural selection and survival of the fittest [1][2][3].

The first EA dates from 1975, when Holland defined the first Genetic Algorithms (GA) whose objective was to search through a parameter space for a set of parameters that optimize some fitness criterion. In a GA, a population of points in the search space is created representing candidate solutions with a measurable distance between them. A string of parameters is called a genotype or a specimen and it is feed to a gene-expression function to produce the phenotype which is evaluated on the fitness criterion for a task. 

The phenotypes with higher ﬁtness are left unchanged between iterations and they are allowed to mate more times to create offspring with better parameterization. Mutations occur in every iteration and cause small random perturbations of parameters and ensure that the search covers new areas of the search space. 

There are other evolutionary algorithms such as swarm particle optimization [16] that do not use genetic operators, the population in them is a set of particles with a position representing the parameter values to be found and speed changes represent the variations that allow the search of parameter values to continue until some fitness function is satisfied. 
Other algorithms like Artificial Bee Colony [17] and Ant Colony Optimization [18] use nature-emulating mechanisms to control the movement of the specimens in the population. 

A diagram of the structure of all the evolutionary algorithms is shown in Figure 1. All the algorithms share a population initialization phase and have a cycle composed of performance evaluation, selection of the fittest and variation of the population so it covers new areas of the search space.

 
Figure 1 - Evolutionary Algorithms Structure
Neuroevolution Algorithms are a particular set of GA for optimizing neural network parameters. A Neuroevolution algorithm will be used in the proposed application experiments.

Recently, the global search capabilities of EA are used to search parameters of Machine Learning(ML) techniques for example: Support Vector Machine(SVM) parameter estimation with Genetic Algorithms [19], Deep Learning [20] [21] and Neuroevolution for estimation of value functions in Q-Learning [22],  Evolvable Neural Turing Machines (ENTM) for adaptive behavior in reinforcement learning [23] and One-Shot Learning with ENTM [24]. All of these techniques would benefit from the scalability of the proposed platform applications or experiments. 

### 6.1.2	Distributed Evolutionary Computation (dEC)

The EC techniques have the capability to be executed in distributed processing architectures, they have to evaluate a large population and this process can be made in parallel for each specimen. There are many ways of intercommunicating the components of a dEC process. This section describes the existing techniques for dEC and the improvements on dEC that the proposed platform will provide.  Since the quantity of techniques is very large, a framework is used for standardizing the description of these techniques, this framework was defined in the survey of the state-of-the-art of distributed EAs by Yue-Jiao Gong et al. [25] and it splits the components of a dEC application on four layers as shown in Figure 1.  

 
Figure 2 - Distributed EC Framework. Image source: [25]

The first layer is the evolutionary algorithm (EA), this is the algorithm to be executed in a distributed software platform. In the proposed platform, this layer will be user-implementable in any programing language capable of sending HTTP requests. 

The second layer is the distributed model, it describes how the application distributes the processing load over the working nodes. These models can be divided in two sets as shown in Figure 3, the population-distributed models that evaluate different specimens of a population in different nodes and the dimension-distributed models that split the data dimensionality and evaluate each partition in a separate node. As it will be described, each model has strengths and weaknesses, but fortunately they can be mixed to overcome their limitations and leverage their strengths. 

The master-slave model is a centralized model in which a master node distributes evaluation tasks between slave nodes. It has low fault-tolerance and high communicational cost but is easy to implement. 

The cellular and pool models divide a population in a fine-grained group structure and execute the groups in separate processors but they also have low fault-tolerance since the nodes cover fixed sections of the search space. These methods can use GPU and cluster platforms very efficiently. 

The coevolution and the multi-agent models are dimension-distributed, meaning that they divide a high dimension problem in several lower dimensional problems, but have the disadvantage of requiring a-priori knowledge on how to reassemble the results. The coevolution model directly assign different parts of the input to independent populations whose results are consolidated. 

The multi-agent model requires knowledge on how to model the EC problem as a game-theoretic game with payoffs for the players based on their actions and the actions of their immediate neighbors. The model uses an independent population for deciding the actions of each player and eventually reach a set of actions representing the Nash equilibrium, meaning that any player who deviates from it can’t improve its payoff. Not all practical EC optimization problems can be solved with these two models. 

Finally, the Island model [26] evaluate completely independent populations in every node and share the best specimens allowing them to exchange results with other nodes, the island model has the lowest communicational cost and the highest fault-tolerance of all the distributed models. This model also serves as higher layer of hybrid or hierarchical models composed by islands where each island executes a master-slave, cellular or other models leveraging their advantages. The proposed platform will support Island models and hybrid models.

 
Figure 3 - Population -distributed and dimension-distributed EC models. Image source: [25]
The third layer of the dEC framework is the programing interface, it defines the way for a node to communicate with others in order to orchestrate the distributed processing. The most common alternatives are map-reduce using Hadoop for java and MPI for C++ implementations, other interfaces exist but all suffer from being programming-language specific. The proposed platform will use a language-agnostic interface by using a REST API to provide high interoperability between heterogeneous implementations of an EA. 

The fourth layer is the physical platform, some common recent choices for dEA are clusters, cloud computing and GPU computing, but they all suffer from platform-dependency and none of them has industrially desirable characteristics as reliability mechanisms, cyber-security or traceability. For the proposed platform, a P2P architecture has been selected since it has enhanced fault-tolerance compared to centralized architectures. Some implementations of dEAs on P2P networks exist, but they are limited to a specific EA, such as genetic programming [27], swarm-particle optimization [28] or neuroevolution [29].  

Many dEA frameworks have been implemented, but they are either EA-specific [30], centralized [31] [32] or language-specific [33] [12] [13] [34]. None of the found frameworks has security and reliability measurements for production usage over insecure networks.

Another innovation introduced by the proposed platform is a blockchain to allow the use of trust-less nodes and to provide reliability and traceability of a dEA allowing its use in large-scale optimization projects over insecure networks.

### 6.1.3	Decentralized Architectural Pattern

The proposed platform features a Decentralized Architectural Pattern that allows fault-tolerance in any node participating in a distributed EC technique [35] [25]. The main difference between a decentralized or peer-to-peer network and a client-server network is that while in the latter a node can exclusively behave as client or server, in the former peer nodes simultaneously function as both clients and servers to the other nodes on the network and this feature makes that there are no central nodes or single points of failure.

In the decentralized architectural pattern, a software partitions routing tasks between peers by implementing some form of virtual overlay network, commonly on top of the TCP/IP stack, but at the application layer peers are able to communicate mutually via logical overlay links, each of which corresponds to a path through the underlying network. But not all the decentralized networks use the TCP/IP stack [18], for example the Ethernet protocol uses a decentralized platform, widely used in data networks, that uses the MAC address of a device to communicate directly to other devices, without intermediaries and without critical nodes for the communication with the others. 

Peer-to-peer file sharing uses decentralized networking to distribute data over the Internet, the first fully P2P file sharing network was called Gnutella in 2000, it uses a simple routing scheme in which each node has a list o know nodes and relay requests to other nodes limiting the path length with a Time to Live (TTL) counter, this routing technique is called “flooding” and it has the issue that the search for resources in the network is not efficient, but as in the proposed platform the search feature is not required, the flooding method is used due to its simplicity. 

The Bittorrent protocol designed on 2001 is more efficient for searching resources on the network by using HTTP GET requests to communicate with peers [18] also uses a distributed hash table protocol (DHT and Kademilia) to discover and keep track of known peers and their shared files, it is the prevailing solution for file sharing with an estimate as 2012 of more than 250 million users per month and as 2013, has between 15 and 27 million concurrent users at any time.

In this project HTTP requests will be used for communication between nodes implementing a Representational State Transfer (REST) Web service platform to favor the interaction with a broad spectrum of programming languages and applications capable of sending HTTP requests, running in heterogeneous platforms and making the network suitable for Internet of Things (IoT) applications by allowing pre-trained model evaluation with sensor data without dealing with the model training computing exigencies in these devices. 

### 6.1.4	REST Application Programming Interface (API)

The proposed platform will feature a Representational State Transfer (REST) API to provide a language-agnostic interface to make distributed EC applications. A REST AP is a way of communicating computer systems over a network, it was proposed in the Ph.D. thesis of Roy Fielding [36] and is widely used in mobile and desktop applications, especially as way of providing interoperability between devices with heterogeneous hardware capable of sending HTTP requests and receive responses from an HTTP server. The messages transmitted in the API can be in any format but the responses are commonly text encoded in XML, HTML or JSON format. The use of a REST API is a commonly used tactic for implementing a Service Oriented Architecture(SoA).

The main characteristic of a REST API is the use of the standard HTTP protocol methods such as POST, GET, PUT, PATCH, TRACE, OPTIONS, CONNECT, HEAD and DELETE on resources and items. Resources are usually data collections or processes, items commonly are collection objects or process directives to manipulate them. The REST specification does not have constraints in the type of resource or item used, for example: a request to obtain the first element of a collection called cars would be “GET /cars/1” and a request to obtain the set of all the elements in the cars collection would be “GET /cars/”. 

The use of the standard HTTP protocol methods has additional advantages to the interoperability, as the fact that the standard HTTP allowed traffic in a Firewall also allows the communication via a REST interface and it is usable by clients behind a router with NAT, and the HTTPS secure communications protocol can be used without API changes.

### 6.1.5	Public Key Cryptography

The proposed platform requirement of traceability of the activity of nodes participating in an optimization process justifies the use of a cryptographic system. 

A cryptographic system that uses only one key to encrypt and decrypt some message is called “symmetric”, in the other hand the systems that have a pair of public-private keys are called “asymmetric”, they assume that the public key is known to all other peers while the private key is only known by a node, for two purposes: 

1.	Any stranger can encrypt a message with the public key of a node and the only key that can decrypt the cyphered message is the node’s private key; this fact provides private one-way communication non-decryptable for eavesdroppers.
2.	The node can encrypt a message with its private key, and any stranger can decrypt the message with the node’s public key to verify its identity as the sender, this process is called the cryptographical signing of the message and protects against identity theft, since a false public key wont decrypt messages encrypted with the node’s private key.

In 1973, Clifford Cocks implemented the first asymmetric system called RSA that used the difficulty of factoring two large prime numbers to generate the two keys and to make computationally infeasible to obtain the private key from the public key [37]. 

An important difference between the symmetric and asymmetric cryptographic systems is that the latter are more computationally intensive than the former, so in 1974 Malcolm J. Williamson implemented what is called the Diffie-Hellman key exchange [38], a procedure that consists in a private interchange of public keys (asymmetric cryptography) and then privately generating and sharing a new key that is used in symmetric encryption of the messages avoiding the overhead caused by asymmetric encryption. These systems are called Hybrid Cryptographical Systems, and they are used in modern communication standards like: TSL/SSL used in the Web and VPNs,  OpenPGP for email encryption and the Signal protocol for secure instant messaging in massively used applications such as WhatsApp and Facebook Messenger. 

While protocols like TSL/SSL are focused on securing a communications channel with asymmetric cryptography and continue to use symmetric cryptography during a session, other standards as OpenPGP are focused on securing a single message encrypted by using a random key for symmetric cryptography, and the random key is encrypted with the receiver’s public key and added to the cyphered message to avoid the overhead of encrypting/decrypting the data with asymmetric cryptography, but using it only for the encryption/decryption of the random key as shown in Figure 4. 

 
Figure 4 - Pretty Good Privacy (PGP) Encryption and Decryption procedures. Image Source: [36]
The algorithms used for encrypting information are called ciphers, PGP allows to configure the cipher to be used for encryption. The proposed platform will use the 2048 bit RSA cipher since it is one of the most used ones but other ciphers exist, for example, the elliptic curve cryptosystems [39] allow shorter key sizes (384 bit) with similar security to RSA regarding standard-computing, but they would be breakable by a quantum computer of 1600 qubits while the RSA would require 4096 qubits [40]. Thinking in the future, there exist post-quantum cryptosystems that are not breakable by quantum computers, the one with the most reduced key-size is Supersingular Isogeny Diffie-Hellman (SIDH), with a key size of 2640 bits [41]. 

PGP is capable of generating digital signatures of messages, by applying a hash function to the message and by signing the produced message digest with the private key of the sender to guarantee the integrity of the data, the authentication of the sender and consequently his non-repudiation, meaning that the sender loses the capability of denying he is the source of the message, this process is shown in Figure 5.

For this platform, a pair of public and private keys will be created to identify each node in the network and OpenPGP will be used to sign the messages and optionally to encrypt the nodes’ responses but a commercial certifying authority can be used to sign the keys.

 
Figure 5 - Pretty Good Privacy (PGP) Message Signing. Image Source: [42]

### 6.1.6	Blockchain

A blockchain is a transaction ledger first used in Bitcoin and later in other applications for traceability of operations between nodes of a network. It is a read-only distributed database running on top of a storage media for the blocks (of transactions) provided by the nodes, the storage media for the blocks can be any database or a local text file containing the block’s content in JSON, XML or any other format.

Bitcoin is an electronic cash system invented by Satoshi Nakamoto in 2008 [43], it was implemented and released as open-source software in 2009. It uses a peer-to-peer network that timestamp blocks of financial transactions between accounts by hashing them into an ongoing chain of digitally signed blocks called the blockchain.

The blockchain is composed of blocks of transactions that are cryptographically linked sequentially using a hash of the previous block to prevent future modifications to created blocks. Once a block has been added to the blockchain, it can’t be modified since it would require the modification of all subsequent blocks in all the nodes in the network. In this project, the blockchain will be used for traceability of operations between nodes participating in a dEC process.

 An important part of the proposed platform is the traceability and reliability of the optimization process provided by a blockchain, meaning that the devices that discovered model parameters that increased the performance of a model are identified with their public cryptographic key and recorded in a read-only shared database, that is not modifiable by attackers. The blockchain also allows the consensus between non-trusted participating nodes by collectively validating the results reported by the nodes. 

The blocks in the blockchain, are created by a hash-based proof-of-work of the received transactions, forming a record that cannot be changed without recalculating the entire proof-of-work [43] and serves as a public ledger of all bitcoin transactions allowing to calculate the quantity of currency in an account in any moment. The nodes verify the transactions in the block and express their consensus by start working in the next block using verified one as the last block of the blockchain. This same consensus mechanism is used in this project for validating reported results to provide reliability.

The proof-of-work cryptocurrency generation mechanism in Bitcoin involves solving a difficulty-variable cryptographic puzzle to create a block in a process called Bitcoin Mining [44]. The proof-of-work in the proposed platform will not be made by solving a cryptographical puzzle as in Bitcoin, but by finding new advancements in the performance of a dEC process and using the optimized parameters as proof-of-work.

The blockchain characteristic of serving as public ledger of changes in some information composed of signed blocks, cryptographically linked with the past ones and with verification based consensus has recently been used for decentralized DNS [45], voting systems [46], smart contracts [47] and private data management [48]. While in Bitcoin, nodes manifest their block verification and consensus to use it by cryptographically signing the next generated block with a hash of the validated one [44], in the proposed platform, nodes manifest their verification and consensus to use the new block by merging it with their population.

In the proposed platform, the blockchain will provide traceability so a user can know the identity of the nodes that increased the performance of the model and the timeline of advancements. The traceability also allows to protect the process against false or corrupt reports of performance by network nodes as it contains a history of changes in performance and the reported author nodes.  Also, the blockchain is a data reliability tactic since a change in a past block of the blockchain implies the creation of all subsequent blocks and any change in a block is detectable once chained to the blockchain, protecting the information from corruption once the data has been accepted by the nodes consensus.  
### 6.2	PROTOTYPE AND EXPERIMENT TOPICS
This section describes the topics related to the prototype network node design for a distributed optimization experiment. In the proposed experiment, an automatic foreign exchange trading agent is trained by using reinforcement learning with a distributed evolutionary computation technique being executed in the proposed platform.  

### 6.2.1	Reinforcement Learning (RL)

As proof of concept, the proposed platform will be used to perform a distributed RL experiment in the forex trading automation domain. RL is an area of machine learning that has the objective of mapping situations to actions, maximizing a reward given to an agent that interacts with an environment by executing actions resulting from policies applied to observations of the environment and obtaining a cumulative reward [49] as shown in Figure 6.

The applications of RL include control related tasks, several records of performance in have been established by modern reinforcement learning programs, in some cases defeating the human counterparts, for example Google Alpha GO [50] or Atari [51] among others.  


 
Figure 6 – The Agent-Environment Interaction in Reinforcement Learning. Image Source [49]

The agent must try the actions to learn in which situations they yield the most reward at the end [49]. This area of machine learning is different from supervised learning, because the latter is not suitable for interactive problems where desired behavior examples that are both correct and representative could be impractical to obtain. A common feature between the reinforcement learning problems is that the agent can use its own experience to improve its performance in the long term.

The four main components of a reinforcement learning system are: policy, reward function, value function and optionally an environmental model. The policy is a mapping of the observations made by the agent into actions that must execute in the observed situations, the reward function is the immediate goal of the agent due to an action executed in a situation, meaning that the reward function maps a state-action pair to a numerical value called reward, the objective of the agent is maximize the total reward it receives in the long term. 

Rewards are given directly by the environment, but values must be estimated from the sequences of observations an agent makes over its lifetime. The value function indicates the total amount of reward that an agent can expect to accumulate starting in some state, represents the desired behavior of the agent in the long run. The fourth component of reinforcement learning is a model of the environment with the objective of predicting a state given an action with the purpose of planning.

Some reinforcement learning methods are aimed to estimate value functions, these methods are more suitable to problems with delayed rewards, other methods search directly in the policy space and are more suitable for environments where rewards are immediate.  Both methods have been used with EC [52] [22] and since the trading automation problem has both delayed and immediate rewards, both methods will be trained simultaneously to validate the multi-processing capability of the proposed platform and to compare their performance. 

There are three threads in the history of reinforcement learning, the optimal control, trial-and-error learning and temporal-difference. 

The first thread is the optimal control and was initially defined by Richard Bellman in 1957 who proposed a general problem of designing a controller to minimize a measurement of a dynamical system’s behavior over time, to solve this problem he uses an “optimal return function” called the Bellman equation which is Markovian Decision Process (MDP) and must be solved with dynamic programming which is considered the only way to solve general stochastic optimal control problems, but suffers from the curse of dimensionality since its computational requirements grow exponentially with the number of state variables. These methods will not be used in this work.

 The second thread is the trial-and error learning, detailed in the previous section (Evolutionary Computation) and will be used in this project, while the third thread, the temporal difference, refers to the methods that use successive estimates of the same quantity for estimation of new ones with the notion of secondary reinforce that is a stimulus that have been paired with a primary reinforce and has come to take similar reinforcement properties. 

Chris Watkins brought together the temporal-difference and optimal control threads in the Q-Learning technique in 1989 [53]. Several evolutionary computation techniques are also applied in the trial-and-error techniques like Neuroevolution for estimation of value functions in Q-Learning [22] [54] [55] [56] and Evolvable Neural Turing Machines for adaptive behavior learning [23].  

An important advancement in reinforcement learning is the ESP technique (Encapsulation, Syllabus, Pandemonium) [57]  that uses evolutionary computation to learn tasks requiring complex behavior of an agent, dividing the main task in human-defined sub-tasks that can help to the reusability, modularity and hierarchical composability of learned behaviors.


There exist some software frameworks with repositories  reinforcement learning environments as RL-Glue, RLPy or The Arcade Learning Environment, but the newest and with the more standardized way to test and measure the performance of reinforcement learning algorithms is the Open AI Gym toolkit [58] that enables running an agent that interacts with an environment with a standardized software interface in Python allowing adequate experimentation with the controller implemented in a different programming language from the used in the environment and allows to extend its functionality to custom environments as the one we use in this work [59]. 

Additionally, recently the Open AI Universe software platform was released with more than 1000 environments including modern 3D videogames and common benchmarking problems used in reinforcement learning literature, this platform uses the Docker application virtualization technology and the VNC remote desktop system to generate the image of the screen of any application as the observation and features mouse and keyboard events as actions controlled by an agent, keeping the same programming interface than open AI Gym. 

### 6.2.2	Automated Foreign Exchange Trading

As a prototype application of the proposed platform, an automated trading agent in the forex market will be implemented. The foreign exchange market is the largest market in the world, it is also called Forex and is a global, decentralized market for currency trading, works 24 hours, every day of the year except for weekends. 

The international banks and financial institutions around the world make transactions and report them as legal currency exchanges, each actor estimate the exchange rate for future transactions based on the current rate, the volume of transactions and the demand of both currencies in the market. 

The factors driving the demand of each currency have both short and long-term causes, making the market susceptible to perturbation in the short-term by speculation and technical factors like trends or volatility, while in the long-term fundamental factors as interest rates changes, increments in industrial production or trade alliances are the driving force behind the change in a currencies demand. 

To illustrate the difference between the goods and services trading and the foreign exchange trading markets, the total exports of United States in 2013 were $2.26 Trillion USD/year [60] compared with $5.3 Trillion USD/day traded in the Forex market in average in April of the same year [61].

A Forex broker is a financial institution that exchanges currency, but is differentiated from a typical currency exchanger in that it has accounts and some features that allow automated or manual buying and selling of batches of a currency paying with another one. A typical trader invests some initial capital and load it onto his broker account, then he can discretionally open a buy order of a batch of currency when the exchange rate is low, and close it (sell the batch) when the exchange rate arises, keeping a profit if the market moves as expected or losing a quantity otherwise [62].

 The quantity of capital a trader has in his account plus the profit (or loss) of the current open orders is called the equity and is the quantity a trader would have if he closes all the orders he has at any moment also it is the money he would have available to open new orders. When the equity is less than 0, it is said that a margin-call event occurs [63] and the broker automatically closes the orders and discounts the currency from the trader’s account to avoid losing funds itself. In a margin-call the trader lose all of his funds, so that is the main situation to avoid for a trader and the equity is the quantity the trader wants to maximize with an acceptable risk, by using small order sizes in proportion to the equity to reduce the risk of margin-call. 

But there are other important quantities provided by the market that the trader must consider before opening or closing an order, the first is the exchange rate spread [64], it is the difference between the buying and selling price of a currency, it represents the earnings of the broker and commonly are set dynamically based on the volume of transactions and the volatility of the market calculated as the standard deviation of price in the last term.

The pip is the minimum unit of variation of an exchange rate, i.e. 1pip=0.00001 for EUR/USD. The minimum spread is commonly between 5 and 20 pips and the maximum between 50 and 100 pips, depending on the broker and the type of account used, for example, if the nominal EUR/USD rate is 1.954877, when the trader buys on low volatility with a spread of 10 pip, the order is executed at 1.954887, while if the spread is 20 pips, the order is executed at 1.954897. 

Finally,  the leverage [65] is the proportion of the traders currency that his Broker is allowed to borrow him automatically, commonly this leverages are from 1:50 to 1:400 depending on the broker and account type, meaning that when he opens an order, he can buy batches of currency of 50 to 400 times the quantity of money he used for the order, but when he closes the order, the money is returned to the broker letting a larger profit or loss per pip variation for the trader than if the operation was executed with 1:1 leverage. As general rule for most brokers, larger leverages also come with larger spreads.

The main task of a trader is to select the most appropriate moment to open or close orders trying to maximize his equity given some market conditions while keeping the order size small thus reducing the risk of a margin-call, additionally the trader must select the best currency to open an order at a given time, since volatility may vary between currencies at the same time of the day and investing in one currency can be less risky than investing in other one, but these are commonly experience-acquired skills.

Automated trading agents has been described by literature [66], and can interact with the Forex market by using a software provided by a financial institution, commonly a dedicated Forex broker.  A common software used for trading is the Metatrader platform with its programming language MQL, that can communicate with external programs via HTTP requests to send market values and has full automatable control over the actions on an account, but care must be taken before opening an account with a broker, and verify that is a well-credited and officially registered Broker in its country of origin. For testing purposes, Metatrader can be used in Demo-Mode in most brokers.

The problem of training an automated trading agent with reinforcement learning requires a model of the market, more precisely a model of a broker account that interacts with historical market data [67], so the agent’s performance can be measured on this model and later with a trained model, a program can be implemented in any language to communicate with a Metatrader application to get the model inputs and to control with its outputs a real live or demo account.  

The data available to a trading agent [68] is composed of multiple time-series, some of the available ones are the exchange rates, spreads and volume of transactions of multiple currency pairs, technical indicators calculated on the exchange rates and fundamental indicators as the Nasdaq, S&P, oil price or gold price, but also predictions from machine learning techniques may be used to identify patterns in the time series by generating a new time series with the forecast and using it as part of the input of the agent being trained. 

The required model of the Forex broker account will be implemented in Python as an OpenAI Gym environment for trading simulation having as inputs the historical 1 minute resolution time series of the currencies and indicators that the agent will use as observations, and having a configurable initial capital, maximum and minimum spread and leverage, with capacity of opening or closing orders in a way similar to a real account.

The trading simulation model will generate additionally as observations the agent’s order status and will have an OpenAI Gym interface for controlling the actions that an agent that can perform: open, close orders or do nothing, with the reward value extracted from a matrix of actions per possible agent status.  

Multiple instances of this trading simulation will be used in the proposed platform and they will parallelly evaluate candidate solutions produced by a decentralized neuroevolution algorithm that is executed continually even if any participating device is disconnected from the optimization network. 


### 7.	METHODOLOGY
The objective of this work is to design and implement a software platform that leverages: the fault-tolerance of decentralized networks, the advantages of the blockchain for reliability and the interoperability that provides a REST API. And using this platform, deploy a training process for automated foreign exchange trading with a simulated Forex account as validation experiment. 

The methodology proposed to achieve the objectives of this work has three steps: platform design, node implementation and deployment of an experiment built on the platform. These steps are described in the following sections.
### 7.1	PLATFORM DESIGN
The objective of this step is to define the components, relationships and behaviors of the proposed platform. The following activities will be performed for this step:

•	To define application requirements and case uses.
•	To abstract components of the architectural design and define their behavior with a high-level communications protocol.
•	To design a decentralized software architecture for the proposed, that satisfy the requirements.
•	To define the data structures and storage technologies used for implementation of the architectural design.
•	To define the communications protocol between nodes as a REST API.
### 7.2	NODE IMPLEMENTATION
The objective of this step is to implement a prototype node of the proposed platform. The following activities will be performed for this step:

•	To implement the data structures using the technologies selected during the design process.
•	To implement a REST API in a platform node in the selected language.
•	Unit testing of the implemented node.
### 7.3	EXPERIMENT DESIGN AND DEPLOYMENT
An experiment is proposed to show the functionality of the platform in a real-world application, the objective of the experiment is to validate the scalability of an optimization process of neural network parameters for value function estimation and policy search in reinforcement learning with an evolutionary computation technique (NEAT) in the proposed platform.  Also, the experiment will validate the continuity of a training process in the eventuality of retiring some nodes from the network. 

The selected problem for experimentation is the automated Forex trading, this problem is defined here with the following question: ¿What actions a software agent must execute given some market and agent conditions to maximize its equity in a Forex trading account starting with some initial capital while maintaining an acceptable risk level, and how to measure the agent’s performance? 

The training of the agent is going to be made in a training environment composed by the trading simulator running time-series from 2009 to 2014 and the performance measurement will be made in a validation environment consisting of a simulation during the year 2015, the setup is shown in Figure 7. 

 
Figure 7 – Proposed Experiment. The platform is composed of Network Nodes that trace operations of Clients that execute multiple independent distributed applications.
The data used for training and validation in the prototype is recent, the source of forex market historical data is histdata.com. A span of 6 years from 2009 to 2015 in resolution of 1 minute is available at histdata.com for the following symbols: EUR/USD, USD/JPY and GBP/USD exchange rates, S&P 500 index, the WTI and GOLD prices with 2’073.600 observations for each one. 

The environment in which the agent works must have all the constraints found in a real Forex account in a Broker, namely, the dynamic volatility-based spread, leverage, order execution time delay, minimum/maximum order life time, and minimum time allowed between consecutive orders. A simulator of a Forex account with an OpenAI Gym software interface will be implemented with the aforementioned constraints with the capacity to load multiple financial time series, using them as observations for the agent.

The following activities will be performed for this step:

•	To design the experimental setup, deployment and measurements.
•	To define the requirements, priorities and desired roles of application nodes participating in the proposed experiment, expected results and measurements.
•	To implement an OpenAI Gym environment for Forex trading account simulation, able to import time-series in CSV format and able to produce observations, rewards and actuate over a simulated account on actions from an agent.
•	To implement two Gym agents, one by using a Neural Network as value-function estimator and the other by using direct policy-space search.
•	To implement an dEC application on the proposed platform for training the Gym agents.
•	Validation of the proposed platform attributes:
o	Scalability by measuring the reduction in training time by incorporating new working nodes.
o	Fault-tolerance, verifying that a process continues to execute when some nodes are removed. 
o	Traceability of the operations between nodes participating in an application. The trace should be available for reading while the optimization processes are running.
o	Reliability of results, by introducing an invalid result from a working node and verifying that the network rejects it and continues the process. 
o	Multi-processing capability, by executing simultaneously two trading automation RL processes (policy-search and value-function-estimation) in the same network, with different working nodes but sharing the same routing nodes.



 <p> 
Keywords: Optimization, Evolutionary Computation, Neuroevolution, Genetic Algorithm, Peer-to-Peer, Blockchain, Bittorrent, Web Services, Bitcoin Mining, Decentralized Networks, Foreign Exchange, Internet of Things, Proof-of-Work, Distributed Hash Table
</p>
