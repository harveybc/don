/** 
 * ***************************************************************************** 
 * @brief       Fractal Machine Class Template
 * ***************************************************************************** 
 * @par Description @parblock 
 * 
 * A sequence of instructions called "fractal tape" is used to create a
 * connection graph that has some nodes marked as not-evaluated and they are
 * used as origin node for running again the fractal tape or parts of it, to
 * generate a connection pattern of increasing complexity every time the 
 * fractal tape is iterated in the non-evaluated nodes. We call Fractals to 
 * these connection structures of variable complexity. The fractals are used 
 * in this program to create a CPPN (Connectivity Pattern Producing Networks)
 * for use in scalble Neural Networks as the fractals can be resolved to any 
 * resolution (millions of neurons) potencially taking making feasible the 
 * usability of pre-trained experts.
 *       
 *      Behaviour:  Plantilla de clase implementando una máquina de Turing para
 *                  programar la generación de patrones de conectividad que se 
 *                  pueden resolver en cualquier resolución (fractales).
 * 
 *      Structure:  Atributos para almacenamiento de secuencia de comandos
 *                  (fractal_tape) y el estado de la máquina: nodos, conexiones,
 *                  buses de datos de los nodos llamados interfaces y registros
 *                  para operaciones temporales.
 * 
 *      Interface:  Métodos para agregar comandos a la cinta de comandos 
 *                  (fractal_tape), el método iterate() lee y ejecuta el próximo 
 *                  comando de la cinta y actualiza el estado de la máquina.
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
 * @file        FractalMachine.h
 * @version     0.1
 * @date        20 de junio de 2014, 08:37 PM
 * @author      Harvey D. Bastidas C. <harveybc@ingeni-us.com>
 **/

#ifndef FRACTALMACHINE_H
#define	FRACTALMACHINE_H
#include <map>
#include <cmath>
#include <chrono>
#include <thread>
#include <iostream>
#include "Taxon.h"
#include "FractalProgram.h"

class FractalMachine {
public:
    // Structs and Typedefs
    struct Node{
        int id;         ///< Identification number of the node
        int source_id;  ///< Parent node identification number
        int evaluated;  ///< TRUE when the node is evaluated
        bool active;    ///< FALSE when the node is deleted
    };
    struct Connection { 
        int id;         ///< Identification number of the connection
        int source_id;  ///< Remote taxon identification
        double length;  ///< Taxon length
        bool active;    ///< FALSE when the node is deleted
   };
    struct Instance { 
        int id;                     ///< Program instance identification
        int base_node_id;           ///< Id of the base node for the instance
        int program_id;             ///< Id of the program of the instance
        int program_counter;        ///< Points the instruction to be executed
        std::vector<bool> vars_b;   ///< Program´s boolean variables
        std::vector<int> vars_i;    ///< Program´s int variables
        std::vector<double> vars_d; ///< Program´s double variables
   };
    // Methods
    int reset();                        ///< Erases all nodes an conex from the machine state a
    int iterate(int node, int instance);///< Executes next instruction in program
    int load_program();                 ///< Carga un programa
    FractalMachine();
    FractalMachine(const FractalMachine& orig);
    virtual ~FractalMachine();
    std::vector <Node> nodes;               ///< Taxones que componen el estado de la máquina (persistente entre iteraciones))
    std::vector <std::vector<Connection> > connections; ///< Conexiones[taxon_id][conn_id] de todos los taxones
    std::vector <Instance> instances;       ///< Instancias de programas ejecutándose en nodos
    std::vector <FractalProgram> programs;  ///< Cintas de instrucciones de la máquina
protected:
    std::vector <Node> taxon_register; ///< Taxones usados como registros temporales para operaciones realizadas con taxones por las instrucciones. TODO: para funcionamiento en paralelo requiere un vector de registros de taxones 
    std::vector <Connection> conn_register; ///< Conexiones usadas como registros temporales para operaciones realizadas con conexiones por las instrucciones. TODO: para funcionamiento en paralelo requiere un vector de registros de taxones 
    std::vector <bool> nodes_eval; ///< usado para establecer el orden de evaluación
};
// Ejecuta un comando de la cinta en cada base_id marcado como no-evaluado,
// por defecto los nodos se marcan como evaluados.  Los nodos que se marcan como
// no-evaluados, se adicionan a una lista de parámetros(b,i,d) del programa 
// (cinta) para cada base_id marcado como no evaluado.
// Esta lista de no-evaluados contiene un program_id, el program_counter en
// ese programa, sus variables y/o sus parámetros de inicio.
// TODO: EN TAXONOMY?
int FractalMachine::iterate(int node, int program, int program_counter) { ///< Ejecuta la cinta de instrucciones, retorna el número de instrucciones ejecutadas
    int counter = 0;
    int i = 0;
    int j=0;
    int aux_counter=0;
    int aux_counter2=0;
    FractalProgram::FractalCmd instruction, tmp_instr;
    /// Fetch instructions from tape and executes them
    while (programs[program].get_size() > 0) { 
        if (fractal_tape.pop_instruction(instruction)) { 
            switch (instruction.id) {
                case 0: /// Wait(milliseconds)
                    std::this_thread::sleep_for(std::chrono::milliseconds(instruction.parameters_i[0]));
                break;
                case 1: /// CreateNode(source_id, distance_from_source)
                
                break;
                case 2: /// CreateNodeFromConnection(conn_id, len_source,len_target)
                
                break;
                case 3: /// NodeSwitchActive(node_id)
                                
                break;
                case 4: /// SwitchEvaluated(node_id)
                    
                
                break;
                case 5: /// NodeChangeSource(node_id, new_source_id)
                                
                break;
                case 6: /// CreateConnection(node_id_source, node_id_target, length)
                
                break;
                case 7: /// ConnectionChangeSource(conn_id, new_source_id)
                
                break;
                case 8: /// ConnectionChangeLength(conn_id, length)
                
                break;
                case 9: /// ConnectionSwitchActive(conn_id)
                                    
                break;
                case 10: ///  *//     int id;                     ///< Program identification
        FractalTape instructions;   ///< Sequence of instructions
        int program_counter;        ///< Points the instruction to be executed
        std::vector[bool] vars_b;   ///< Program´s boolean variables
        std::vector[int] vars_i;    ///< Program´s int variables
        std::vector[double] vars_d; ///< Program´s double variablesConnectionSwitchActive(conn_id)
                           */         
                break;
                default:
                break;
            }

            if (instruction.id == 1) { 
                if (instruction.parameters.size() < 1) return 0; // Verifica si el número de params es al menos 1
                if (nodes.size() > instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (taxon_register.size() == 0) return 0; //Verifica si el registro de taxones está vacío
                for (i = 0; i < taxon_register.size(); i++) { // Ejecución de comando 1: crear nodo
                    nodes.push_back(taxon_register[i]);
                }
            }
            ///TODO CORREGIR PARA PARAMETROS COMOHASHES que se cargan en los registros desde archivos o desde torrent
            /// TODO instruction 2 = replace object, params: base node id, usa taxon register para realizar el reemplazo del objeto en el estado
            if (instruction.id == 2) {
                if (instruction.parameters.size() == 33) { // Si el comando contiene un hash, y no existe como archivo,  lo descarga en el taxon_register, sino toma el último almacenado en el taxon_register 
                    /// TODO: Si no existe el archivo con Key=HASH en el path de trabajo, lo descarga
                    /// Abre el archivo para lectura (nomenclatura nombre=HASH.t)
                    /// Carga el archivo y verifica el encabezado (Tipo: singularity_taxonomy,version)
                    /// Carga el contenido del experto en el taxon_register
                }
                if (get_size() < 1) return 0; // Si el fractal no contiene ningún elemento, retona 0
                if (get_size() > instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (taxon_register.size() == 0) return 0; //Verifica si el registro de taxones está vacío
                nodes[instruction.parameters[0]] = taxon_register[0]; // Ejecución de comando 2: reemplazar nodo
            }
            ///< TODO: instruction 3 = delete object (todos sus hijos se pasan al parent y se coloca su estado como inactivo), params: base node id
            if (instruction.id == 3) {
                if (get_size() < 1) return 0; // Si el fractal no contiene ningún elemento, retona 0
                if (get_size() > instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                // Obtiene en taxon_registers todos los hijos del actual coord base
                // modifica los taxon_registers para que queden con parent_id igual al padre del nodo borrado.
                // Reemplaza los taxon_registers
                // carga en taxon_register el nodo borrado
                // modifica el valor active_taxon=0
                // reemplaza el taxon borrado por el taxon_register[0]
            }
            /// instruction 4 = create connections, params: base node id, usa conn register 
            if (instruction.id == 4) {
                if (instruction.parameters.size() > 32) { // Si el comando contiene uno o varios hashes, y no existen como archivos,  los descarga en el taxon_register, sino toma el último almacenado en el taxon_register 
                    /// vacía el taxon_register
                    /// Para cada 32 bytes (un hash de 256 bits)
                    /// TODO: Si no existe el archivo con Key=HASH en el path de trabajo, lo descarga
                    /// Abre el archivo para lectura(nomenclatura nombre=HASH.t)
                    /// Carga el archivo y verifica el encabezado (Tipo: singularity_taxonomy,version)
                    /// Carga el contenido del experto en el taxon_register
                }
                if (instruction.parameters.size() < 1) return 0; // Verifica si el número de params es al menos 1
                if (get_size() > instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (connections.size() == 0) return 0; //Verifica si el registro de taxones está vacío
                for (i = 0; i < conn_register.size(); i++) { // Ejecución de comando 4: create connections
                    /* // TODO: esto va en Taxonomy antes de crear la conex
                     * // y cargar el conn register con la instrucción 12
                     * // calcula el segmento en la interfaz remota y cambia tamaño de interfaz
                        conn_register[i].segment = floor(conn_register[i].length / (3000 * conn_register[i].radius)); // el tamaño de la interfaz para la conex es floor (L/3000r) + 1, 
                        if (interfaces[conn_register[i].remote_id].size()<=conn_register[i].remote_interface) return 0; //no existe la interfaz
                        // si el tamaño de la interfaz es menor al segment, hace más grande la interfaz
                        if (interfaces[conn_register[i].remote_id][conn_register[i].remote_interface ].size()<=conn_register[i].segment ){
                            // calcula el número de segmentos faltantes
                            aux_counter=conn_register[i].segment-interfaces[conn_register[i].remote_id][conn_register[i].remote_interface ].size()+1;
                            // agrega los segmentos a la interfaz
                            for (j=0;j<aux_counter;j++){
                                tmp_message=interfaces[conn_register[i].remote_id][conn_register[i].remote_interface ].back();
                                interfaces[conn_register[i].remote_id][conn_register[i].remote_interface ].push_back(tmp_message); //ingresa un mensaje igual al último
                            }
                        }
                        //Para cada conex de salida del taxón remoto busca el máximo segmento
                        aux_counter=conn_register[i].segment; //para buscar el máximo conn.segment
                        for (j=0;(j<connections[conn_register[i].remote_id].size());j++){
                            if ((connections[conn_register[i].remote_id][j].conn_type==2 )&&(connections[conn_register[i].remote_id][j].local_interface)==conn_register[i].remote_interface)
                                if (aux_counter<connections[conn_register[i].remote_id][j].segment)
                                    aux_counter=connections[conn_register[i].remote_id][j].segment;
                        }
                        // Si el tamaño de la interfaz de salida del taxón es mayor al segment, reduce la interfaz
                        if (interfaces[conn_register[i].remote_id][conn_register[i].remote_interface].size()-1<  aux_counter){
                            // calcula el número de segmentos a descartar 
                            aux_counter2 = interfaces[conn_register[i].remote_id][conn_register[i].remote_interface].size()-aux_counter-1;
                            for (j=0;j<aux_counter2;j++){
                                // extrae n elementos del frente (quita los mensajes más viejos)
                                interfaces[conn_register[i].remote_id][conn_register[i].remote_interface].pop_front();
                            }
                        }
                    */
                    connections[conn_register[i].remote_id].push_back(conn_register[i]);
                }
            }
            /// TODO: instruction 5 = replace connections, params: base node id, conn_id, usa conn register 
            if (instruction.id == 5) {
                if (instruction.parameters.size() == 34) { // Si el comando contiene un hash, y no existe como archivo,  lo descarga en el taxon_register, sino toma el último almacenado en el taxon_register 
                    /// TODO: Si no existe el archivo con Key=HASH en el path de trabajo, lo descarga
                    /// Abre el archivo para lectura (nomenclatura nombre=HASH.c)
                    /// Carga el archivo y verifica el encabezado (Tipo: singularity_connection,version)
                    /// Carga el contenido del experto en el taxon_register
                }
                if (instruction.parameters.size() < 2) return 0; // Verifica si el número de params es al menos 2
                if (nodes.size() > instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (conn_register.size() == 0) return 0; //Verifica si el registro de conexiones está vacío
                if (nodes.size() > instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                /// reemplaza la conex del nodo nodeId, conex connId por el connregister[0]
                connections[instruction.parameters[0]][instruction.parameters[1]]=conn_register[0];
            }
            /// TODO instruction 6 = delete connections, params: base node id, conn_id
            if (instruction.id == 6) {
                if (instruction.parameters.size() < 2) return 0; // Verifica si el número de params es 1
                if (nodes.size() > instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (conn_register.size() == 0) return 0; //Verifica si el registro de conexiones está vacío
                /// Borra la conex del nodo nodeId, conex connId
                ///> TODO: Corregir: Ineficiente, usar list en lugar de vector?
                connections[instruction.parameters[0]][instruction.parameters[1]].erase(connections[instruction.parameters[0]][instruction.parameters[1]].begin()+5); /// ejecuta comando 6: borrar conexión
            }
            /// TODO instruction 7 = Create interface
            if (instruction.id == 7) { /// TODO: COLOCAR COMO PARAM EL HASH DEL DATASET DEL EXPERTO
                if (instruction.parameters.size() > 32) { // Si el comando contiene uno o varios hashes, y no existen como archivos,  los descarga en el taxon_register, sino toma el último almacenado en el taxon_register 
                    /// vacía el taxon_register
                    /// Para cada 32 bytes (un hash de 256 bits)
                    /// TODO: Si no existe el archivo con Key=HASH en el path de trabajo, lo descarga
                    /// Abre el archivo para lectura(nomenclatura nombre=HASH.t)
                    /// Carga el archivo y verifica el encabezado (Tipo: singularity_taxonomy,version)
                    /// Carga el contenido del experto en el taxon_register
                }
                if (instruction.parameters.size() < 1) return 0; // Verifica si el número de params es al menos 1
                if (get_size() > instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (taxon_register.size() == 0) return 0; //Verifica si el registro de taxones está vacío
                for (i = 0; i < taxon_register.size(); i++) { // Ejecución de comando 1: crear nodo
                    nodes.push_back(taxon_register[i]);
                }
            }
            ///< TODO CORREGIR PARA PARAMETROS COMOHASHES que se cargan en los registros desde archivos o desde torrent
            /// TODO instruction 8 = replace interface, params: base node id, usa taxon register para realizar el reemplazo del objeto en el estado
            if (instruction.id == 8) {
                if (instruction.parameters.size() == 33) { // Si el comando contiene un hash, y no existe como archivo,  lo descarga en el taxon_register, sino toma el último almacenado en el taxon_register 
                    /// TODO: Si no existe el archivo con Key=HASH en el path de trabajo, lo descarga
                    /// Abre el archivo para lectura (nomenclatura nombre=HASH.t)
                    /// Carga el archivo y verifica el encabezado (Tipo: singularity_taxonomy,version)
                    /// Carga el contenido del experto en el taxon_register
                }
                if (get_size() < 1) return 0; // Si el fractal no contiene ningún elemento, retona 0
                if (get_size() > instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (taxon_register.size() == 0) return 0; //Verifica si el registro de taxones está vacío
                nodes[instruction.parameters[0]] = taxon_register[0]; // Ejecución de comando 2: reemplazar nodo
            }
            ///< TODO: instruction 9 = delete interface (todos sus hijos se pasan al parent y se coloca su estado como inactivo), params: base node id
            if (instruction.id == 9) {
                if (get_size() < 1) return 0; // Si el fractal no contiene ningún elemento, retona 0
                if (get_size() > instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                // Obtiene en taxon_registers todos los hijos del actual coord base
                // modifica los taxon_registers para que queden con parent_id igual al padre del nodo borrado.
                // Reemplaza los taxon_registers
                // carga en taxon_register el nodo borrado
                // modifica el valor active_taxon=0
                // reemplaza el taxon borrado por el taxon_register[0]
            }
            
            /// TODO instruction 10 = add instruction to tape, params: instruction id, instruction params
            if (instruction.id == 10) {
                if (instruction.parameters.size() < 3) return 0; // Verifica si el número de params es > 3
                tmp_instr.id = instruction.id;
                for (i = 0; i < (instruction.parameters.size() - 1); i++) {
                    tmp_instr.parameters.push_back(instruction.parameters[i + 1]);
                }
                fractal_tape.push_instruction(tmp_instr); // Inserta la instrucción al final de la cinta.
            }
            /// TODO instruction 11 = jump to position relative to start of tape, params: shift
            if (instruction.id == 11) {//jump , params: shift (relative to start of tape).
                if (instruction.parameters.size() < 3) return 0; // Verifica si el número de params es > 3
                tmp_instr.id = instruction.id;
                for (i = 0; i < (instruction.parameters.size() - 1); i++) {
                    tmp_instr.parameters.push_back(instruction.parameters[i + 1]);
                }
                fractal_tape.push_instruction(tmp_instr); // Inserta la instrucción al final de la cinta.
            }
            if (instruction.id == 12) { // TODO routine, params: start_pos, end_pos posiciones en la cinta, , [num nodes, nodes] ejecuta en los nodos indicados como root el segmento de cinta fractal la cinta fractal.
                if (instruction.parameters.size() < 3) return 0; // Verifica si el número de params es > 3
                tmp_instr.id = instruction.id;
                for (i = 0; i < (instruction.parameters.size() - 1); i++) {
                    tmp_instr.parameters.push_back(instruction.parameters[i + 1]);
                }
                fractal_tape.push_instruction(tmp_instr); // Inserta la instrucción al final de la cinta.
            }
            if (instruction.id == 13) { // TODO Load taxon_register
                if (instruction.parameters.size() < 3) return 0; // Verifica si el número de params es > 3
                tmp_instr.id = instruction.id;
                for (i = 0; i < (instruction.parameters.size() - 1); i++) {
                    tmp_instr.parameters.push_back(instruction.parameters[i + 1]);
                }
                fractal_tape.push_instruction(tmp_instr); // Inserta la instrucción al final de la cinta.
            }
            if (instruction.id == 14) { // TODO Load conn_register
                if (instruction.parameters.size() < 3) return 0; // Verifica si el número de params es > 3
                tmp_instr.id = instruction.id;
                for (i = 0; i < (instruction.parameters.size() - 1); i++) {
                    tmp_instr.parameters.push_back(instruction.parameters[i + 1]);
                }
                fractal_tape.push_instruction(tmp_instr); // Inserta la instrucción al final de la cinta.
            }


        }
    }
}

int FractalMachine::reset() { ///< Borra todos los objetos del estado
    nodes.clear();
}

int FractalMachine::get_size() { ///< Obtiene el número de objetos en el estado de la máquina
    nodes.size();
}

int FractalMachine::get_state(int position, Taxon &output) { ///< Obtiene el objeto de la posición indicada
    if (nodes.size() > position) return 0;
    output = nodes[position];
    return 1;
}

int FractalMachine::replace_state(Taxon new_object, int position) { ///< Reemplaza el objeto de la posición indicada on el nuevo objeto
    if (nodes.size() > position) return 0;
    nodes[position] = new_object;
    return 1;
}

FractalMachine::FractalMachine() {
}

FractalMachine::FractalMachine(const FractalMachine& orig) {
}

FractalMachine::~FractalMachine() {
}


#endif	/* FRACTALMACHINE_H */

/*** FractalMachine JSON
 * {
 *  "fractal_tape": <FractalaTape>,
 *  "nodes": [<Taxon<Taxon>>],
 *  "taxon_register": [<Taxon<Taxon>>],
 *  "conn_register": [<NodeConnection>]
 * }
 */