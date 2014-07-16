/** 
 * @mainpage
 * @author      Harvey D. Bastidas C. <harveybc@ingeni-us.com>
 * @brief       Nodo de Singularity. 
 * @par Description @parblock 
 *      Nodo de la red de inteligencia artificial descentralizada Singularity, 
 *      con tres modos de funcionamiento:
 * 
 *          Minero: Genera Singularity entrenado expertos de IA.
 * 
 *          Cliente: Descarga o evalúa gratuitamente expertos de IA.
 * 
 *          Híbrido: Gasta Singularity en entrenamiento no supervisado local/remoto.
 * @endparblock
 * @copyright @parblock
 *    This file is part of Singularity.
 * 
 *    Singularity is free software; you can redistribute it and/or modify it under
 *    the terms of the GNU General Public License as published by the Free
 *    Software Foundation; either version 3, or (at your option) any later
 *    version.
 * 
 *    Singularity is distributed in the hope that it will be useful, but WITHOUT ANY
 *    WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *    FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 *    for more details.
 * 
 *    You should have received a copy of the GNU General Public License
 *    along with GCC; see the file COPYING3.  If not see
 *    <http://www.gnu.org/licenses/>. 
 * @endparblock
 * @note @parblock Usage:
 *     singularity [operation mode] [mode_specific_configuration] @n
 *     [operation_mode] options: 
 *      @li 0 = Search AI expert: Requiere guardar y cargar taxonomía y experto en formato JSON.
 *      @li 1 = Download expert: Requiere Libtorrent
 *      @li 2 = Upload expert: Requiere Formato de ANN de: ES-HyperNEAT o Encog
 *      @li 3 = Download expert and evaluate it locally provided dataset and previous neuron state (outptus) : Requiere motor de evaluación externo
 *      @li 4 = Evaluate expert remotely provided dataset and previous neuron state: Requiere mecanismo de publicación y retrieval.
 *      @li 5 = Singularity Miner: Requiere mecanismo de entrenamiento
 *      @li 6 = Paid non-supervised training, don't mine: Requiere generación de PoW o pago a los  mineros
 *      @li 7 = On-demand non-supervised training, mine to pay for training
 *      @li 8 = On-demand non-supervised training and mining, mine excess CPU for profit
 * @endparblock
 * @file        main.cpp
 * @version     0.1
 * @date        22 de mayo de 2014, 10:18 PM
 * @par Description @parblock 
 *      Nodo de la red de inteligencia artificial descentralizada Singularity, 
 *      con tres modos de funcionamiento:
 *           Minero: Genera Singularity entrenado expertos de IA.
 *           Cliente: Evalúa expertos de SingularityNet gratuitos o los descarga.
 *           Híbrido: Gasta Singularity con entrenamiento no supervisado local/remoto.
 * @endparblock
*/
#include <iostream>
#include <string>
#include <cstdlib>
#include "Taxonomy.h"
using namespace std;

/**
 * Crea un nodo de Singularity con la funcionalidad especificada.
 * @param[in]   op_mode Operation mode
 * @par <op_mode> @parblock 
 *      @li 0 = Search AI expert: Requiere guardar y cargar taxonomía y experto en formato JSON.
 *      @li 1 = Download expert: Requiere Libtorrent
 *      @li 2 = Upload expert: Requiere Formato de ANN de: ES-HyperNEAT o Encog
 *      @li 3 = Download expert and evaluate it locally provided dataset and previous neuron state (outptus) : Requiere motor de evaluación externo
 *      @li 4 = Evaluate expert remotely provided dataset and previous neuron state: Requiere mecanismo de publicación y retrieval.
 *      @li 5 = Singularity Miner: Requiere mecanismo de entrenamiento
 *      @li 6 = Paid non-supervised training, don't mine: Requiere generación de PoW o pago a los  mineros
 *      @li 7 = On-demand non-supervised training, mine to pay for training
 *      @li 8 = On-demand non-supervised training and mining, mine excess CPU for profit
 * @endparblock
 * @param[in]   mode_config Node working mode configuration
 * 
 * @return  program status
 */
int main(int argc, char** argv) {
        int operation_mode=0;  

        // Selecciona modo de operación (se pueden agregar más modos de operación)
        if (argc>0){
            switch (atoi(argv[1])){
                case 0:
                    clog<<"Modo de operación 0: Descarga de expertos" << "\n";
                    //Expert expert_download(path);
                    // llama a método de descarga con los demás parámetros        
                    break;
                default:
                    cerr<<"Modo de operación no encontrado" << "\n";
                    // llama a método de descarga con los demás parámetros        
                    break;
            }
        }
        else{
            cerr<<"Faltan parámetros" << "\n";       
        }
    return 0;
}
// Feet fail me not because this may be the only oportunity i got.....

