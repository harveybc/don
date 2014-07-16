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

template <class MessageClass> /// Máquina de turing paramanejo de estructura jerárquica de objetos (fractal).
class FractalMachine { 
public:
    FractalTape fractal_tape; /// Cinta de instrucciones de la máquina
    int run(FractalTape tape); ///< Ejecuta la cinta de instrucciones
    int reset(); ///< Borra todos los objetos del estado
    int get_size(); ///< Obtiene el número de objetos en el estado de la máquina
    int get_state(int position,Taxon <MessageClass> &output); ///< Obtiene el objeto de la posición indicada
    int replace_state(Taxon <MessageClass> new_object, int position); ///< Reemplaza el objeto de la posición indicada on el nuevo objeto, double para mensajes entre neuronas
    FractalMachine();
    FractalMachine(const FractalMachine& orig);
    virtual ~FractalMachine();
private:
    std::vector <Taxon <MessageClass> > fractal_machine_state; ///< Taxones que componen el estado de la máquina (persistente entre iteraciones))
    std::vector <Taxon <MessageClass> > taxon_register; ///< Taxones usados como registros temporales para operaciones realizadas con taxones por las instrucciones. TODO: para funcionamiento en paralelo requiere un vector de registros de taxones 
    std::vector <tx_connection> conn_register; ///< Conexiones usadas como registros temporales para operaciones realizadas con conexiones por las instrucciones. TODO: para funcionamiento en paralelo requiere un vector de registros de taxones 

};

#endif	/* FRACTALMACHINE_H */

