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
    0: /// Wait(milliseconds)
    1: /// CreateNode(int source_id, int recursive, int interfaces, bool evaluated, bool active, double distance_from_source)
    2: /// NodeSetActive(int node_id, bool act) 
    3: /// NodeSetEvaluated(int node_id, bool evaluated)
    4: /// NodeAddInterface(int node_id, int num)
    5: /// NodeSetRecursive(int node_id, int recursive)
    6: /// CreateConnection(node_id_source, node_id_target, src_if, length,active)
    7: /// ConnectionSetLength(conn_id, length)
    8: /// ConnectionSetActive(conn_id)
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
 * COMPLETE
 **/

#ifndef FRACTALMACHINE_H
#define	FRACTALMACHINE_H
#include <map>
#include <cmath>
#include <chrono>
#include <thread>
#include <iostream>
#include "Taxon.h"
#include "Node.h"
#include "Connection.h"
#include "Instance.h"

class FractalMachine {
public:
    void add_instruction(FractalInstruction instr);
    void run_instruction(FractalInstruction instr);
    void run_program(FractalProgram program);
    void reset();        ///< Erases all nodes, conex and instances
    void iterate();      ///< Executes next instruction from the instance's queue
    // constructors
    FractalMachine();
    FractalMachine(const FractalMachine& orig);
    virtual ~FractalMachine();
    // public attribs
    std::vector <std::vector<int> > conn_index; ///< connection[target_id][0..n] index in conn queue for evaluation order
private:
    std::vector<FractalConnection> connections;
    std::vector <FractalNode> nodes;               ///< Taxones que componen el estado de la máquina (persistente entre iteraciones))
    std::deque <FractalInstance> instances;       ///< Instancias de programas ejecutándose en nodos
};
#endif	/* FRACTALMACHINE_H */
