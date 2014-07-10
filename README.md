Singularity
===========

Descentralized AI expert repository and app interface (As now just the taxonomy and the fractal machine are barely implemented, lots of corrections to make)

Singularity node with 8 operation modes and their requirements:

0 (almost implemented) = Search AI expert: Requiere guardar y cargar taxonomía y experto en formato JSON.

1 = Download expert: Requiere Libtorrent.

2 = Upload expert: Requiere Formato de ANN de: ES-HyperNEAT o Encog

3 = Download expert and evaluate it locally provided dataset and previous neuron state (outptus) : Requiere motor de evaluación externo

4 = Evaluate expert remotely provided dataset and previous neuron state: Requiere mecanismo de publicación y retrieval.

5 = Singularity Miner: Requiere mecanismo de entrenamiento

6 = Paid non-supervised training, don't mine: Requiere generación de PoW o pago a los  mineros

7 = On-demand non-supervised training, mine to pay for training

8 = On-demand non-supervised training and mining, mine excess CPU for profit
 
 
