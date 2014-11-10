/** 
 * @author      Harvey D. Bastidas C. <harveybc@ingeni-us.com>
 * @brief       Experto de IA 
 * @par Description @parblock 
 *      Es un objeto que al ser evaluado con un dataset de entradas y
 *      salidas esperadas como "ejemplos" de entrenamiento, produce una 
 *      eficiencia en la tarea de imitar las salidas esperadas para algún 
 *      patrón de entradas que haya aprendido desde un ejemplo (patrón en
 *      el dataset) durante el entrenamiento.
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
 * @file        FractalMachine.h
 * @version     0.1
 * @date 26 de junio de 2014, 04:16 AM
 */

#ifndef EXPERT_H
#define	EXPERT_H
#include <queue>
#include <map>
#include <string>
#include "Taxon.h"
#include "FractalMachine.h"

template <class ExpertType, class IDataType, class ODataType> ///< Es un objeto que al ser evaluado con un dataset de entradas y salidas esperadas como "ejemplos" de entrenamiento, produce una eficiencia en la tarea de imitar las salidas esperadas para algún patrón de entradas que haya aprendido desde un ejemplo (patrón en el dataset) durante el entrenamiento.
class Expert: public Taxon<ODataType>{ 
public:
    struct evolution_ledger{ ///< Estructura base para elmacenar el historial de evolución de los expertos.
        ExpertType past_expert; ///< Función de transferencia del experto (algoritmo, imágen, the actual ANN,etc..)
        double efficiency; ///< Eficiencia del experto 
        std::string creation_block_hash; ///< Keyfilename de el bloque que creó el experto 
    };
    struct expert_struct{ ///< Estructura de estado de un experto
        ExpertType expert_tf; ///< Función de transferencia del experto,ej: una ANN (tiene entradas y salidas). TODO para otros tipos de expertos
        std::queue <ODataType> state; ///< Estado de la máquina. Para ANN es la salida de cada neurona
        std::queue <int> output; ///< Lista de interfaces (neuronas) de salida
        std::queue <int> input; ///< Lista de interfaces (neuronas) de entrada
        double efficiency; ///< Fitness(value) para los datasets del experto
        double last_efficiency_variation; ///< Ultima variación de eficiencia
        std::queue <evolution_ledger> history; ///< Historial de ANNs con sus eficiencias y el hash del bloque que las genero
    };
    struct expert_data_cell{ ///< Dato base de entrenamiento
        std::queue<IDataType> inputs; ///< Entradas del dato base de entrenamiento
        std::queue<ODataType> outputs; ///< Salidas del dato base de entrenamiento
    };
    struct expert_dataset{ ///< Conjunto de datos de entrenamiento
        std::queue<expert_data_cell> dataset; ///< El dataset es un buffer de data_cells
        double dataset_efficiency; ///< Eficiencia del expert in the dataset.
    };
    int getExpert( expert_struct &output);  ///< Obtiene el experto con mejor fitness entre las instancias de entrenamiento.
    int TrainIteration(double& efficiency_out, expert_struct& output);  ///< Entrena el experto con el dataset (buscando aumentar la eficiencia en cualquiera de las training instances)
    double Evaluate(expert_dataset input_dataset, std::queue <ODataType> prev_state ,expert_dataset &output_dataset,std::queue <ODataType> new_state); ///< Evalúa el experto con un dataset (puede o no contener salidas para calcular eficiencia)
    int export_expert(std::string file_path); ///< Guarda el experto
    int import_expert(std::string file_path); ///< Carga un experto desde un archivo
    Expert();
    Expert(const Expert& orig);
    virtual ~Expert();
private:
    std::queue <expert_struct> training_experts; ///< Training instances
    std::queue <expert_dataset> datasets;//< Datasets de entrenamiento, el Merkletree root of the datasets is the expert storage KEY (Fractalmachine Taxons<>)
};


#endif	/* EXPERT_H */

