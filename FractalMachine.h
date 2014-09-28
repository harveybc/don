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

template <class NodeClass> /// Máquina de turing paramanejo de estructura jerárquica de objetos (fractal).
class FractalMachine { 
public:
    int reset(); ///< Borra todos los objetos del estado (no borra la cinta)
    int iterate(); ///< Ejecuta la instrucción leída por el cabezal de la cinta, procesa todos los mensajes de los taxones y avanza la cinta una celda
    int load_tape(); /// Carga una cinta en la máquina y coloca el cabezal en en inicio de la cinta 
    int append_tape(); /// Adiciona una cinta a la cinta existente en la máquina
    int tape_position(bool absolute_pos, int shift); /// Coloca el cabezal de la máquina en la posición especificada de la cinta
    int get_size(); ///< Obtiene el número de objetos en el estado de la máquina
    int get_state(int position,Taxon <NodeClass> &output); ///< Obtiene el objeto de la posición indicada
    int taxon_register_load(std::vector <Taxon <NodeClass> > taxon_register);
    int conn_register_load(std::vector <tx_connection> conn_register);
    FractalMachine();
    FractalMachine(const FractalMachine& orig);
    virtual ~FractalMachine();
private:
    FractalTape fractal_tape; /// Cinta de instrucciones de la máquina (Ledger de transacciones con la máquina)
    std::vector <Taxon <NodeClass> > fractal_machine_state; ///< Taxones que componen el estado de la máquina (persistente entre iteraciones))
    std::vector <Taxon <NodeClass> > taxon_register; ///< Taxones usados como registros temporales para operaciones realizadas con taxones por las instrucciones. TODO: para funcionamiento en paralelo requiere un vector de registros de taxones 
    std::vector <tx_connection> conn_register; ///< Conexiones usadas como registros temporales para operaciones realizadas con conexiones por las instrucciones. TODO: para funcionamiento en paralelo requiere un vector de registros de taxones 
};

#endif	/* FRACTALMACHINE_H */

/*** FractalMachine JSON
 * {
 *  "fractal_tape": <FractalaTape>,
 *  "fractal_machine_state": [<Taxon<NodeClass>>],
 *  "taxon_register": [<Taxon<NodeClass>>],
 *  "conn_register": [<tx_connection>]
 * }
 */