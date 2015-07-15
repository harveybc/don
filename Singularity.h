/**
 * @mainpage
 * ***************************************************************************** 
 * @brief       Singularity Class
 * ***************************************************************************** 
 * @par Description @parblock
 *      
 *      Behaviour:  Clase para evaluar una taxonomía de Expertos. Descarga 
 *                  y actualización de expertos en Bittorrent. Evaluación P2P.
 *   
 *      Structure:  Atributos para manejo de conectividad de experts (fractal)
 *                  y sus objetos relacionados (experts)
 * 
 *      Axon:  Método iterate() que introduce unas entradas en los expertos
 *                  de entrada, realiza las comunicación y obtiene     de las entradas en las salidas. Métodos para descargar,
 *                  crear y actualizar el experto en Bittorrent. Métodos para 
 *                  evaluación P2P.
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
 * @file        Singularity.h
 * @version     0.1
 * @date        Created on 29 de marzo de 2015, 05:56 PM
 * @author      Harvey D. Bastidas C. <harveybc@ingeni-us.com>
 **/

#ifndef SINGULARITY_H
#define	SINGULARITY_H
#include "taxon.h"

class Singularity: Taxon<float> {
public:
    Singularity();
    Singularity(const Singularity& orig);
    virtual ~Singularity();
private:

};

#endif	/* SINGULARITY_H */

