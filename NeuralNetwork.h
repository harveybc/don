/**
 * @mainpage
 * ***************************************************************************** 
 * @brief       Neural Network Class
 * ***************************************************************************** 
 * @par Description @parblock
 *      
 *      Behaviour:  Manejo de Red neuronal de múltiples tipos de datos y su I/O
 *                  creada con una neurona inicial con conex como entradas y una
 *                  neurona adicional para cada salida, puede usar múltiples 
 *                  tipos de datos en sus entradas y salidas.
 *   
 *      Structure:  Número de entradas y número de salidas por cada tipo de 
 *                  dato. Taxonomías heredadas de Expert.
 * 
 *      Interface:  Método evaluate() de las entradas en las salidas. Funciones
 *                  de transferencia y activación híbridas (tipo de datos),
 *                  métodos evaluación en GPU y entrenamiento local, remoto,
 *                  distribuído, descentralizado P2P y por minado de
 *                  Cryptocoin.
 *
 *  Extended information at:
 *  <http://singularityproject.co>
 * 
 *  @endparblock
 *  @copyright @parblock
 *  This file is part of Singularity.
 *  Singularity is free software; you can redistribute it and/or modify it under
 *  the terms of the GNU General Public License as published by the Free
 *  Software Foundation; either version 3, or (at your option) any later
 *  version. Singularity is distributed in the hope that it will be useful, but 
 *  WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 *  or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 *  for more details. You should have received a copy of the GNU General Public 
 *  License along with GCC; see the file COPYING3.  If not see
 *  <http://www.gnu.org/licenses/>. 
 * @endparblock
 * @file        NeuralNetwork.h
 * @version     0.1
 * @date        Created on 14 de abril de 2015, 11:32 PM
 * @author      Harvey D. Bastidas C. <harveybc@ingeni-us.com>
 **/

#ifndef NEURALNETWORK_H
#define	NEURALNETWORK_H
#include "Expert.h"

//Es una taxonomía
class NeuralNetwork: Expert {
public:
    void evaluate();
    NeuralNetwork(int num_inputs, int num_outputs); // params: número de entradas y número de neuronas de salida 
    NeuralNetwork(const NeuralNetwork& orig);
    virtual ~NeuralNetwork();
private:
    double activationFcn(MessageClass x); // Función de activación seleccionada ejecuta: Salida = activationFcn(transferFcn(Conex(Intefaces(Segments))))
    double transferFcn(int node_id); // Función de transferencia
};
#endif	/* NEURALNETWORK_H */

