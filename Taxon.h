/**
 * ***************************************************************************** 
 * @brief       Singularity Taxon Class Template
 * *****************************************************************************
 * @par Description @parblock 
 *      
 *      Behaviour:  Plantilla de clase para manejo de información de taxón en 
 *                  una taxonomía de Singularity.
 * 
 *      Structure:  Atributos para identificación de nodo (id), jerarquía en una
 *                  taxonomía (parent_id) y estado del nodo (active, evaluated).
 * 
 *      Interface:  Métodos públicos para leer atributos y protegidos para 
 *                  escribirlos desde la plantilla de clase FractalMachine.
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
 * @file        Taxon.h
 * @version     0.1
 * @date        22 de mayo de 2014, 11:58 PM
 * @author      Harvey D. Bastidas C. <harveybc@ingeni-us.com>
 **/

#ifndef TAXON_H
#define	TAXON_H
#include <queue>
#include <vector>
#include <string>
#include <set> 

class Taxon {
public:
    int get_id(); ///< Obtiene el atributo id de este Taxón (único,generado durante creación)
    int is_active(); ///< retona el valor de active_taxon
    int get_parent_id(); //< btiene el id del taxón que creó el actual, para el taxón raíz, retorna 0.
    Taxon();
    Taxon(const Taxon& orig);
    virtual ~Taxon();
protected:
    int id; ///< Identificación numérica de el taxón, al ser creado en una taxonomía fractal es lineal.
    int parent_id; ///< Identificación del taxón padre si existe, al ser creado en una taxonomía fractal es lineal.
    bool active_taxon; ///< Es TRUE al crear el taxon, se vuelve FALSE al borrarlo, se puede reactivar usando la instrucción replace (en FractalMachine.cpp)
    bool evaluated; ///< Es TRUE si el taxón ha sido evaluado
   /* double x;
    double y;
    double z;
    double r;
    double colorR;
    double colorG;
    double colorB;
    double alpha;
    double threshold;*/
};

#endif	/* TAXON_H */

