/** 
 * @author      Harvey D. Bastidas C. <harveybc@ingeni-us.com>
 * @brief       Fractal machine class template to manage a hierarchical tree of objects (taxonomy)
 * @par Description @parblock 
 *      Máquina de turing que en cada iteración, lee y ejecuta una celda de una 
 *      cinta de instrucciones que ejecuta sobre su estado. Está compuesta por:
 *          -Un registro de estado descrito por un fractal de objetos (máquinas de turing) con conexiones jerárquicas
 *          -Una cinta compuesta de celdas de instrucciones (FractalTape.h)
 *          -Un cabezal que lee(y escribe) las celdas de instrucciones  (FractalTape.h)
 *          -Una tabla de instrucciones que ejecutan los objetos del estado
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
 * @date        20 de junio de 2014, 08:37 PM
*/

#ifndef FRACTALMACHINE_H
#define	FRACTALMACHINE_H
#include <map>
#include "FractalTape.h"
#include "Taxon.h"
#include "Expert_SANN.h"
#include "Expert_Simple.h"
#include "Neuron_d.h"

// Typedefs y structs
typedef std::vector<TaxonConnection> v_connections; ///< Conexiones de cada taxón
typedef std::deque <MessageClass> msg_buffer; ///< Tipo de datos para un buffer de mensajes 

template <class NodeClass,class MessageClass> /// Máquina de turing paramanejo de estructura jerárquica de objetos (fractal).
class FractalMachine: Taxon<MessageClass> { 
public:
    int reset(); ///< Borra todos los objetos del estado (no borra la cinta)
    int iterate(); ///< Ejecuta la instrucción leída por el cabezal de la cinta, procesa todos los mensajes de los taxones y avanza la cinta una celda
    int load_tape(); /// Carga una cinta en la máquina y coloca el cabezal en en inicio de la cinta 
    int append_tape(); /// Adiciona una cinta a la cinta existente en la máquina
    int tape_position(bool absolute_pos, int shift); /// Coloca el cabezal de la máquina en la posición especificada de la cinta
    int get_size(); ///< Obtiene el número de objetos en el estado de la máquina
    int get_state(int position,NodeClass &output); ///< Obtiene el objeto de la posición indicada
    int replace_state(NodeClass new_object, int position);
    int taxon_register_load(std::vector <NodeClass> taxon_register);
    int conn_register_load(std::vector <TaxonConnection> conn_register);
    void add_connection(TaxonConnection conn); ///< Crea una nueva conexión
    int modify_connection(int conn_id, TaxonConnection new_conn); ///< Modifica una conexión existente
    int erase_connection(int conn_id); ///< Elimina una conexión
    int get_connection(TaxonConnection conn_id); ///< Obtiene una conexión existente

    FractalMachine();
    FractalMachine(const FractalMachine& orig);
    virtual ~FractalMachine();
    FractalTape fractal_tape; /// Cinta de instrucciones de la máquina (Ledger de transacciones con la máquina)
    std::vector <NodeClass> fractal_machine_state; ///< Taxones que componen el estado de la máquina (persistente entre iteraciones))
    std::vector <v_connections> connections; ///< Conexiones de todos los taxones
    std::vector<msg_buffer> input_interfaces; ///< Mapa de interfaces de entrada
    std::vector<msg_buffer> output_interfaces; ///< Mapa de interfaces de salida

protected:
    std::vector <NodeClass> taxon_register; ///< Taxones usados como registros temporales para operaciones realizadas con taxones por las instrucciones. TODO: para funcionamiento en paralelo requiere un vector de registros de taxones 
    std::vector <TaxonConnection> conn_register; ///< Conexiones usadas como registros temporales para operaciones realizadas con conexiones por las instrucciones. TODO: para funcionamiento en paralelo requiere un vector de registros de taxones 
};

template <class NodeClass,class MessageClass> 
int FractalMachine<NodeClass,MessageClass>::iterate(){ ///< Ejecuta la cinta de instrucciones, retorna el número de instrucciones ejecutadas
    int counter=0;
    int i=0;
    FractalCmd instruction, tmp_instr;
    while (fractal_tape.get_size()>0){ //Hace fetch de instrucciones, saca una a una las celdas de la cinta
        if (fractal_tape.pop_instruction(instruction)){ ///< Comienza decodificación de instrucciones: 0=NOP,1=CREATE_NODE,2=REPLACE_NODE,3=DELETE_NODE,4=CREATE_CONNECTION,5=REPLACE_CONNECTION,6=DELETE_CONNECTION,7=WRITE_INSTRUCTION
            /// instruction 1 = Create objects, params: base node id, usa taxon_register como los nuevos
            if (instruction.id=='1'){ /// TODO: COLOCAR COMO PARAM EL HASH DEL DATASET DEL EXPERTO
                if (instruction.parameters.size()>32){  // Si el comando contiene uno o varios hashes, y no existen como archivos,  los descarga en el taxon_register, sino toma el último almacenado en el taxon_register 
                    /// vacía el taxon_register
                    /// Para cada 32 bytes (un hash de 256 bits)
                        /// TODO: Si no existe el archivo con Key=HASH en el path de trabajo, lo descarga
                        /// Abre el archivo para lectura(nomenclatura nombre=HASH.t)
                        /// Carga el archivo y verifica el encabezado (Tipo: singularity_taxonomy,version)
                        /// Carga el contenido del experto en el taxon_register
                }
                if (instruction.parameters.size()<1) return 0; // Verifica si el número de params es al menos 1
                if (get_size()>instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (taxon_register.size()==0) return 0; //Verifica si el registro de taxones está vacío
                for (i=0;i<taxon_register.size();i++){ // Ejecución de comando 1: crear nodo
                    fractal_machine_state.push_back(taxon_register[i]); 
                }
            }           
            ///TODO CORREGIR PARA PARAMETROS COMOHASHES que se cargan en los registros desde archivos o desde torrent
            /// instruction 2 = replace object, params: base node id, usa taxon register para realizar el reemplazo del objeto en el estado
            if (instruction.id=='2'){
                if (instruction.parameters.size()==33){  // Si el comando contiene un hash, y no existe como archivo,  lo descarga en el taxon_register, sino toma el último almacenado en el taxon_register 
                    /// TODO: Si no existe el archivo con Key=HASH en el path de trabajo, lo descarga
                    /// Abre el archivo para lectura (nomenclatura nombre=HASH.t)
                    /// Carga el archivo y verifica el encabezado (Tipo: singularity_taxonomy,version)
                    /// Carga el contenido del experto en el taxon_register
                }
                if (get_size()<1) return 0; // Si el fractal no contiene ningún elemento, retona 0
                if (get_size()>instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (taxon_register.size()==0) return 0; //Verifica si el registro de taxones está vacío
                fractal_machine_state[instruction.parameters[0]]=taxon_register[0];// Ejecución de comando 2: reemplazar nodo
            }            
            ///< TODO: instruction 3 = delete object (todos sus hijos se pasan al parent y se coloca su estado como inactivo), params: base node id
            if (instruction.id=='3'){
                if (get_size()<1) return 0; // Si el fractal no contiene ningún elemento, retona 0
                if (get_size()>instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                // Obtiene en taxon_registers todos los hijos del actual coord base
                // modifica los taxon_registers para que queden con parent_id igual al padre del nodo borrado.
                // Reemplaza los taxon_registers
                // carga en taxon_register el nodo borrado
                // modifica el valor active_taxon=0
                // reemplaza el taxon borrado por el taxon_register[0]
            }    
            /// instruction 4 = create connections, params: base node id, usa conn register 
            if (instruction.id=='4'){
                if (instruction.parameters.size()>32){  // Si el comando contiene uno o varios hashes, y no existen como archivos,  los descarga en el taxon_register, sino toma el último almacenado en el taxon_register 
                    /// vacía el taxon_register
                    /// Para cada 32 bytes (un hash de 256 bits)
                        /// TODO: Si no existe el archivo con Key=HASH en el path de trabajo, lo descarga
                        /// Abre el archivo para lectura(nomenclatura nombre=HASH.t)
                        /// Carga el archivo y verifica el encabezado (Tipo: singularity_taxonomy,version)
                        /// Carga el contenido del experto en el taxon_register
                }
                if (instruction.parameters.size()<1) return 0; // Verifica si el número de params es al menos 1
                if (get_size()>instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (connections.size()==0) return 0; //Verifica si el registro de taxones está vacío
                for (i=0;i<connections.size();i++){ // Ejecución de comando 1: crear nodo
                    connections.push_back(taxon_register[i]); 
                }///< TODO: Administra el tamaño de las interfaces de cada nodo
                    
                    // si la conexión es de entrada, calcula el segmento
    if (conn.conn_type==1){ //1=entrada,2=salida,0=duplex
        conn.segment=floor(conn.length/(3000*conn.radius)); // el tamaño de la interfaz para la conex es floor (L/3000r) + 1, 
        // si el tamaño de la interfaz es menor a el length, hace más grande la interfaz
        if (taxons.fractal_machine_state[taxon_id]. )
        //TODO: si es el mayor segmento de todas las conex a la interfaz remota, cambia el tamaño eoliminando los últimos
    }
    connections.push_back(conn);
                }
            } 
            /// instruction 5 = replace connections, params: base node id, conn_id, usa conn register 
            if (instruction.id=='5'){
                if (instruction.parameters.size()==34){  // Si el comando contiene un hash, y no existe como archivo,  lo descarga en el taxon_register, sino toma el último almacenado en el taxon_register 
                    /// TODO: Si no existe el archivo con Key=HASH en el path de trabajo, lo descarga
                    /// Abre el archivo para lectura (nomenclatura nombre=HASH.c)
                    /// Carga el archivo y verifica el encabezado (Tipo: singularity_connection,version)
                    /// Carga el contenido del experto en el taxon_register
                }
                if (instruction.parameters.size()<2) return 0; // Verifica si el número de params es al menos 2
                if (fractal_machine_state.size()>instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (conn_register.size()==0) return 0; //Verifica si el registro de conexiones está vacío
                if (fractal_machine_state.size()>instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                fractal_machine_state[instruction.parameters[0]].modify_connection(instruction.parameters[1],conn_register[0]);/// ejecuta comando 5: reemplazar
            } 
            /// instruction 6 = delete connections, params: base node id, conn_id
            if (instruction.id=='6'){
                if (instruction.parameters.size()<2) return 0; // Verifica si el número de params es 1
                if (fractal_machine_state.size()>instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (conn_register.size()==0) return 0; //Verifica si el registro de conexiones está vacío
                fractal_machine_state[instruction.parameters[0]].erase_connection(instruction.parameters[1]);/// ejecuta comando 6: borrar conexión
            } 
            /// instruction 7 = add instruction to tape, params: instruction id, instruction params
            if (instruction.id=='7'){
                if (instruction.parameters.size()<3) return 0; // Verifica si el número de params es > 3
                tmp_instr.id=instruction.id;
                for (i=0;i<(instruction.parameters.size()-1);i++){
                    tmp_instr.parameters.push_back(instruction.parameters[i+1]);
                }
                fractal_tape.push_instruction(tmp_instr); // Inserta la instrucción al final de la cinta.
            } 
            /// instruction 8 = jump , params: shift (relative to start of tape).
            /// instruction 9 = routine, params: start_pos, end_pos posiciones en la cinta, , [num nodes, nodes] ejecuta en los nodos indicados como root el segmento de cinta fractal la cinta fractal.
            /// instruction 10 = nop con información, params: information size, information (stores info in the tape))

                        /// instruction 8 = jump to position relative to start of tape, params: shift

            if (instruction.id=='8'){//Thanks @jasper
                if (instruction.parameters.size()<3) return 0; // Verifica si el número de params es > 3
                tmp_instr.id=instruction.id;
                for (i=0;i<(instruction.parameters.size()-1);i++){
                    tmp_instr.parameters.push_back(instruction.parameters[i+1]);
                }
                fractal_tape.push_instruction(tmp_instr); // Inserta la instrucción al final de la cinta.
                
            } 

            
        }
    }
}

template <class NodeClass,class MessageClass> 
int FractalMachine<NodeClass,MessageClass>::reset(){ ///< Borra todos los objetos del estado
    fractal_machine_state.clear();
}

template <class NodeClass,class MessageClass> 
int FractalMachine<NodeClass,MessageClass>::get_size(){ ///< Obtiene el número de objetos en el estado de la máquina
    fractal_machine_state.size();
}

template <class NodeClass,class MessageClass> 
int FractalMachine<NodeClass,MessageClass>::get_state(int position, NodeClass &output){ ///< Obtiene el objeto de la posición indicada
    if (fractal_machine_state.size()>position) return 0;
    output=fractal_machine_state[position];
    return 1;
}

template <class NodeClass,class MessageClass> 
int FractalMachine<NodeClass,MessageClass>::replace_state(NodeClass new_object, int position){ ///< Reemplaza el objeto de la posición indicada on el nuevo objeto
    if (fractal_machine_state.size()>position) return 0;
    fractal_machine_state[position]=new_object;
    return 1;
}    
    
template <class NodeClass,class MessageClass> 
FractalMachine<NodeClass,MessageClass>::FractalMachine() {
}
template <class NodeClass,class MessageClass> 
FractalMachine<NodeClass,MessageClass>::FractalMachine(const FractalMachine& orig) {
}
template <class NodeClass,class MessageClass> 
FractalMachine<NodeClass,MessageClass>::~FractalMachine() {
}

template class FractalMachine<Expert_SANN,double >;
template class FractalMachine<Expert_Simple,double >;
template class FractalMachine<Neuron_d,double >;

#endif	/* FRACTALMACHINE_H */

/*** FractalMachine JSON
 * {
 *  "fractal_tape": <FractalaTape>,
 *  "fractal_machine_state": [<Taxon<NodeClass>>],
 *  "taxon_register": [<Taxon<NodeClass>>],
 *  "conn_register": [<TaxonConnection>]
 * }
 */