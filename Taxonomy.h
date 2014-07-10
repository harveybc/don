/** 
 * @mainpage
 * @author      Harvey D. Bastidas C. <harveybc@ingeni-us.com>
 * @brief       Taxonomy class template
 * @par Description @parblock 
 *      Crea una estructura jerárquica de objetos(taxones) en el estado de una 
 *      máquina de Turing fractal desde una cinta de Turing.
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
 * @file        Taxonomy.h
 * @version     0.1
 * @date        22 de mayo de 2014, 10:18 PM
*/
#ifndef TAXONOMY_H
#define	TAXONOMY_H
#include <string>
#include "FractalMachine.h"
#include "FractalTape.h"

template <class TaxonClass> ///< para IA, taxonClass=Expert
class Taxonomy{  
public:
    int get_taxonomy(FractalMachine <TaxonClass> &output); ///< Crea el estado de una máquina fractal desde una cinta de instrucciones
    int get_taxon(int fractal_coords, TaxonClass &output); ///< Obtiene un taxón
    int add_taxons(int fractal_coords, TaxonClass taxon, int quantity); ///< Agrega una categoría a la taxonomía como hija de la categoría especificada
    int remove_taxon(int fractal_coords); ///< Agrega una categoría a la taxonomía como hija de la categoría especificada
    int replace_taxon(int fractal_coords, TaxonClass taxon); ///< Agrega una categoría a la taxonomía como hija de la categoría especificada
    int Export(FractalTape fractal_coords, std::string file_path); ///< Exporta la taxonomía a un archivo JSON o XML
    int Import(FractalTape fractal_coords, std::string file_path); // < Importa la taxonomía desde un archivo JSON o XML
    Taxonomy();
    Taxonomy(const Taxonomy& orig);
    virtual ~Taxonomy();
private:
    FractalMachine <TaxonClass> taxons;  ///< Una taxonomía es el estado de una m´qauina fractal de taxones decrito por una cinta de turing que contiene instrucciones para cada objeto existente en una iteración
};

#endif	/* TAXONOMY_H */












