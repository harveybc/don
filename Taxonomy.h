/**
 * ***************************************************************************** 
 * @brief       Taxonomy Class Template
 * ***************************************************************************** 
 * @par Description @parblock
 *      
 *      Behaviour:  Plantilla de clase para manejar una FractalMachine,
 *                  introducir y leer datos desde sus interfaces. 
 *   
 *      Structure:  Atributos para la FractalMachine (fractal) y para objetos
 *                  representados por cada nodo del fractal (taxons) 
 * 
 *      Interface:  Métodos para ejecutar comandos en la FractalMachine, 
 *                  introducir y leer datos de sus interfaces e import/export la 
 *                  taxonomía en JSON
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
 * @file        Taxonomy.h
 * @version     0.1
 * @date        22 de mayo de 2014, 10:18 PM
 * @author      Harvey D. Bastidas C. <harveybc@ingeni-us.com>
 **/
#ifndef TAXONOMY_H
#define	TAXONOMY_H
#include <string>
#include <fstream>
#include <iostream>
#include "FractalMachine.h"
#include "FractalTape.h"
#include "Taxon.h"
#include "Expert.h"

template <class TaxonClass,class MessageClass>
class Taxonomy: public Taxon { 
public:
    // structs y typedefs
    typedef std::deque <MessageClass> msg_buffer;
    // taxon management
    void add_taxons(int quantity); ///< Agrega una categoría a la taxonomía como hija de la categoría especificada
    int remove_taxon(int taxon_id); ///< Elimina un taxón
    int replace_taxon(int taxon_id, TaxonClass taxon); ///< Reemplaza el taxón
    int get_taxon(int taxon_id, TaxonClass &output); ///< Obtiene un taxón
    // connection management
    int add_connection(int remote_id, int remote_interface, double length, double radius, double weight); ///< Crea una nueva conexión
    int modify_connection(int taxon_id, int conn_id, FractalMachine::NodeConnection new_conn); ///< Modifica una conexión existente
    int erase_connection(int taxon_id, int conn_id); ///< Elimina una conexión
    int get_connection(int taxon_id, FractalMachine<MessageClass>::NodeConnection &conn_id); ///< Obtiene una conexión existente
    // interfaces management
    int add_interfaces(int taxon_id, int num); ///< Agrega interfaces de salida al taxón
    int erase_interface(int taxon_id, int conn_id); ///< Elimina una interface
    // message management
    void read_msg(MessageClass &msg, int taxon_id, int interface_id); ///< lee el msg en una interface de entrada.
    void pending_msgs(int taxon_id, int interface_id); ///< Retorna el número de mensajes pendientes en una interfaz de salida
    void push_msg(MessageClass msg, int taxon_id, int interface_id); ///< Coloca el msg en una interface de salida.
    void pop_msg(MessageClass &msg, int taxon_id, int interface_id); ///< Saca el msg de una interface de salida.
    // Taxonomy management
    int export_taxonomy(char* file_path); ///< Exporta la taxonomía a un archivo JSON o XML
    void get_taxonomy(FractalMachine <TaxonClass,MessageClass> &output); ///< 
    int import_taxonomy(char* file_path); // < Importa la taxonomía desde un archivo JSON o XML
    // constructors
    Taxonomy();
    Taxonomy(const Taxonomy& orig);
    virtual ~Taxonomy();
protected:
    FractalMachine <Taxon> fractal; ///< Una taxonomía es el estado de una m´qauina fractal de taxones decrito por una cinta de turing que contiene instrucciones para cada objeto existente en una iteración
    std::vector <TaxonClass> taxons; 
    std::vector<std::vector <std::deque <MessageClass> > > interfaces; ///< Matriz 3D de interfaces de salida [taxon_id][interface_id][message_id]
};

// taxon management

// add_taxons
template <class TaxonClass,class MessageClass> 
int Taxonomy<TaxonClass,MessageClass>::add_taxons(int taxon_id_base, Taxon taxon, int quantity) {///< Agrega un taxón completo a la taxonomía
    int i = 0;
    // TODO: coloca el taxón en el registro de taxones usando la instrucción 13: LoadTaxonRegister
    // TODO: usar clase Taxon en fractalmachine y manejar paralelamente el TaxonClass en Taxonomy para eval 
    // std::vector <TaxonClass> tmp_taxon_register;
    // tmp_taxon_register.push_back(taxon);
    
    std::vector <int> params;
    params.push_back(taxon_id_base);
    params.push_back(quantity);
    FractalMachine::FractalCmd instruction; ///< Operación 13: LoadTaxonRagister
    instruction.id = 13;
    // Coloca como parámetro de la instrucción, los params del constructor de Taxon
    
    instruction.parameters = params;
    fractal.fractal_tape.push_instruction(instruction); ///< Inserta instrucción en la cinta
    // ejecuta le intrucción 13: LoadTaxonRegister
    fractal.iterate();
    // coloca el comando y sus parámetros en la cinta
    std::vector <int> params;
    params.push_back(taxon_id_base);
    params.push_back(quantity);
    FractalMachine::FractalCmd instruction; ///< Operación: 1 (crear), parámetros: id de padre, número de objetos a crear
    instruction.id = '1';
    instruction.parameters = params;
    fractal.fractal_tape.push_instruction(instruction); ///< Inserta instrucción en la cinta
    // ejecuta le intrucción 1: create node
    fractal.iterate();
    return 1;
}
// remove_taxon
template <class TaxonClass,class MessageClass> 
int Taxonomy<TaxonClass,MessageClass>::remove_taxon(int taxon_id) { ///< Borra un taxón
    std::vector <int> params;
    params.push_back(taxon_id);
    FractalCmd instruction; ///< Operación: D (delete), parámetros: id de objeto
    instruction.id = '3';
    instruction.parameters = params;
    fractal.fractal_tape.push_instruction(instruction); ///< Ejecuta la instrucción en la máquina
    return 1;
}
// replace_taxon
template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::replace_taxon(int taxon_id, TaxonClass taxon) { ///< Reemplaza el taxón por el objeto especificado
    return fractal.replace_state(taxon, taxon_id); ///< Ejecuta la instrucción en la máquina
}
//get_taxon
template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::get_taxon(int taxon_id, TaxonClass &output) { ///< Obtiene un taxón
    return fractal.get_state(taxon_id, output);
}



///< get Taxonomy
template <class TaxonClass,class MessageClass> 
int Taxonomy<TaxonClass,MessageClass>::get_taxonomy(FractalMachine <TaxonClass,MessageClass> &output) { ///< Crea el estado de una máquina fractal desde una cinta de instrucciones
    if (this->fractal.get_size() > 0) {
        output = fractal;
        return 1;
    } else
        return 0;
}





///< Agrega interfaces de salida al taxón
template <class MessageClass>
void Taxonomy<MessageClass>::add_interfaces(int taxon_id, int num) { 
    msg_buffer tmp;
    for (int i = 0; i < num; i++)
        fractal.interfaces[taxon_id].push_back(tmp);
}



template <class MessageClass>
int Taxonomy<MessageClass>::read_msg(MessageClass &msg, int taxon_id, int interface_id) { ///< lee el msg en una interface de entrada.
    if (fractal.interfaces[taxon_id].size() > interface_id) {
        msg = fractal.interfaces[interface_id][0];
        return 1;
    } else
        return 0;
}

template <class MessageClass>
void Taxonomy<MessageClass>::push_msg(MessageClass msg, int taxon_id, int interface_id) { ///> coloca el msg en la interface especificada de salida.
    fractal.interfaces[interface_id].push_back(msg);
}

template <class MessageClass>
void Taxonomy<MessageClass>::pop_msg(int taxon_id, int interface_id) { ///< Saca el msg de una interface de entrada.
    fractal.interfaces[interface_id].pop_front();
}

template <class MessageClass>
int Taxonomy<MessageClass>::pending_msgs_in(int taxon_id, int interface_id) { ///< Retorna el número de mensajes pendientes en un buffer de entrada
    if (input_taxons.interfaces[taxon_id].size() > interface_id) {
        return input_taxons.interfaces[interface_id].size();
    } else
        return 0;
}

template <class MessageClass>
int Taxonomy<MessageClass>::pending_msgs(int taxon_id, int interface_id) { ///< Retorna el número de mensajes pendientes en un buffer de salida
    if (fractal.interfaces[taxon_id].size() > interface_id) {
        return fractal.interfaces[interface_id].size();
    } else
        return 0;
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::add_connection(int taxon_id, NodeConnection conn) { ///< Agrega la conexión al taxón y recalcula el tamaño 
    int i = 0;
    std::vector <int> params;
    params.push_back(taxon_id_base);
    params.push_back(quantity);
    FractalCmd instruction; ///< Operación: C (crear), parámetros: id de padre, número de objetos a crear
    instruction.id = '4';
    instruction.parameters = params;
    fractal.fractal_tape.push_instruction(instruction); ///< Inserta instrucción en la cinta
    fractal.iterate();
    return 1;
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::modify_connection(int conn_id, NodeConnection new_conn) { ///< Coloca el msg en una interface de salida.
    if (fractal.connections[taxon_id].size() > conn_id) {
        connections[conn_id] = new_conn;
        return 1;
    }
    return 0;
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::erase_connection(int conn_id) {
    return (fractal.connections[taxon_id].erase(fractal.connections[taxon_id].begin() + conn_id) == fractal.connections[taxon_id].end() ? 0 : 1);
}


template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::export_taxonomy(char* file_path) { ///< Exporta la taxonomía a un archivo JSON o XML
    //Abre o crea archivo JSON :)
    //TODO: If the file  exists, if the quiet flag is not set, shows an overwriting alert, if the Interractive mode is set, shows a prompt before overwriting
    int i, j, k; //counter
    using namespace std;
    string myfile;
    
    std::ofstream myfile_file(file_path);
    if (myfile_file.is_open()) {
        ///TODO: eexptortar
    } else std::cout << "Unable to open file";
    //escribe fractal
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::import_taxonomy(char* file_path) {
    //Abre archivo JSON
    //carga archivo en memoria
    //lee en buffer hasta próximo  símbolo
    //leer símbolo
    //procesar fin de símbolo
    //lee fractal
} // < Importa la taxonomía desde un archivo JSON o XML

template <class TaxonClass,class MessageClass>
Taxonomy<TaxonClass,MessageClass>::Taxonomy() {
}

template <class TaxonClass,class MessageClass>
Taxonomy<TaxonClass,MessageClass>::Taxonomy(const Taxonomy& orig) {
}

template <class TaxonClass,class MessageClass>
Taxonomy<TaxonClass,MessageClass>::~Taxonomy() {
}
template class Taxonomy<Expert_SANN,double >;
template class Taxonomy<Expert_Simple,double >;
template class Taxonomy<Neuron_d,double >;


#endif	/* TAXONOMY_H */
