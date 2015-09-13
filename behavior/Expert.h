/**
 * ***************************************************************************** 
 * @brief       Expert Class
 * ***************************************************************************** 
 * @par Description @parblock
 *      
 *      Behaviour:  Clase para comunicar taxonomías de diferentes tipos de 
 *                  datos tiene axon I/O para cada tipo de dato, evalúa,
 *                  itera y entrena.
 *   
 *      Structure:  Atributos para manejo de taxonomías de cada tipo de datos,
 *                  Axon de I/O de cada tipo de datos.  
 * 
 *      Axon:  Método iterate() que coloca el resultado de evaluate()
 *                  de las entradas en las salidas. Métodos virtuales para 
 *                  evaluar y entrenar el experto.
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
 * @file        Expert.h
 * @version     0.1
 * @date        Created on 29 de marzo de 2015, 04:16 PM
 * @author      Harvey D. Bastidas C. <harveybc@ingeni-us.com>
 **/

#ifndef EXPERT_H
#define	EXPERT_H
#include "NeuralNetwork.h"

class Expert: public NeuralNetwork {
public:
    // Estructuras
    struct wave_float{ //Para ondas de entrada del tipo Y=ACos(Wt-Th), t =ticks(iteraciones)
        float A; // Amplitude of wave
        float W; // Angular Frequency in radians/tick
        float Th; // Phase angle in radians
    };
    // Estructuras
    struct axon_map{ //Para ondas de entrada del tipo Y=ACos(Wt-Th), t =ticks(iteraciones)
        int taxonomy_type; // 0=bit, 1=float, 2=wave_float
        int taxon_id; // taxon_id de la interfaz de salida en la taxonomía original
        int expert_if_id; // id de la interfaz data_type del experto
    };
    // Methods
    //  Message management TODO: CORREGIR Y SOBRECARGAR PARA TODOS LOS TIPOS
    void read_msg(char &msg, int taxon_id, int axon_id); ///< lee el msg en una axon de entrada.
    void read_msg(float &msg, int taxon_id, int axon_id); ///< lee el msg en una axon de entrada.
    void read_msg(wave_float &msg, int taxon_id, int axon_id); ///< lee el msg en una axon de entrada.
    void pending_msgs(int taxon_id, int axon_id); ///< Retorna el número de mensajes pendientes en una interfaz de salida
    void push_msg(MessageClass msg, int taxon_id, int axon_id); ///< Coloca el msg en una axon de salida.
    void pop_msg(MessageClass &msg, int taxon_id, int axon_id); ///< Saca el msg de una axon de salida.
    //  Axon management
    void add_axon_in(int taxonomy_type); // agrega if de entrada para experto, datatype: 0=bit, 1=float, 2=wave_float
    void add_axon_out(int taxonomy_type); // agrega una interfaz de salida para el experto
    //  Expert axon mapping in individual taxon outputs from taxonomies
    void map_input(int expert_if_id, int taxonomy_type, int taxon_id); //Maps experts inputs axon to taxonomies axon
    void map_output();
    //  Taxonomies management
    void add_taxonomy_float(); 
    //  AI management
//    virtual void train(); // entrena el experto
  //  virtual void evaluate(); // coloca un valor en la entrada y obtiene una salida 
    void evaluateNeuron(int neuron_id); // marca un nodo como evaluado y evalúa el nodo
    // Constructors
    Expert(int num_inputs_b, int num_outputs_b, int num_inputs_d, int num_outputs_d, int num_inputs_wd, int num_outputs_wd); //PArams = num entradas apra cada tipo de dato
    Expert(const Expert& orig);
    virtual ~Expert();
private:
    FractalMachine fractal; // conexiones entre taxonomías
    std::vector<int[3]> taxonomyIndex; // [TaxonIndex, TaxonomiesIndex(bit,float,complex), TaxonomyIndex]
    std::deque<NeuralNetwork> taxonomies_ANN_bit;
    std::deque<NeuralNetwork> taxonomies_ANN_float;
    std::deque<NeuralNetwork> taxonomies_ANN_wave;
    std::deque <char> if_in_bool; // axon de entrada para booleanos
    std::deque <char> if_out_bool;
    std::deque <float> if_in_float;
    std::deque <float> if_out_float;
    std::deque <wave_float> if_in_wave_d;
    std::deque <wave_float> if_out_wave_d;
    std::vector <char> input_map_bool; 
    std::vector <char> input_map_float; 
    std::vector <char> input_map_wave_d; 
    std::vector <char> output_map_bool; 
    std::vector <char> output_map_float; 
    std::vector <char> output_map_wave_d; 
};


template <class TaxonClass, class MessageClass> ///< para IA, MessageClass=float
Expert<TaxonClass, MessageClass>::Expert() {
}

template <class TaxonClass ,class MessageClass> ///< para IA, MessageClass=float
Expert<TaxonClass, MessageClass>::Expert(const Expert& orig) {
}

template <class TaxonClass ,class MessageClass> ///< para IA, MessageClass=float
Expert<TaxonClass, MessageClass>::~Expert() {
}

template class Expert<float>; //TODO : Implementación de experto de Complex ANNs

#endif	/* EXPERT_H */


