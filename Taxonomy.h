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
#include <fstream>
#include <iostream>
#include "FractalMachine.h"
#include "FractalTape.h"
#include "Taxon.h"
#include "Expert.h"
#include "Expert_SANN.h"
#include "Expert_Simple.h"
#include "Neuron_d.h"
//#include "rapidjson/document.h"


template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
class Taxonomy: public Taxon<MessageClass> { // Se puede cambiar double por un vector para Complex-value ANNs
public:
    int get_taxonomy(FractalMachine <TaxonClass,MessageClass> &output); ///< 
    int get_taxon(int fractal_coords, TaxonClass &output); ///< Obtiene un taxón
    int add_taxons(int fractal_coords, TaxonClass taxon, int quantity); ///< Agrega una categoría a la taxonomía como hija de la categoría especificada
    int remove_taxon(int fractal_coords); ///< Agrega una categoría a la taxonomía como hija de la categoría especificada
    int replace_taxon(int fractal_coords, TaxonClass taxon); ///< Agrega una categoría a la taxonomía como hija de la categoría especificada
    int export_taxonomy(char* file_path); ///< Exporta la taxonomía a un archivo JSON o XML
    int import_taxonomy(char* file_path); // < Importa la taxonomía desde un archivo JSON o XML

    Taxonomy();
    Taxonomy(const Taxonomy& orig);
    virtual ~Taxonomy();
protected:
    FractalMachine <TaxonClass,MessageClass> taxons; ///< Una taxonomía es el estado de una m´qauina fractal de taxones decrito por una cinta de turing que contiene instrucciones para cada objeto existente en una iteración
};


template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::get_taxonomy(FractalMachine <TaxonClass,MessageClass> &output) { ///< Crea el estado de una máquina fractal desde una cinta de instrucciones
    if (this->taxons.get_size() > 0) {
        output = taxons;
        return 1;
    } else
        return 0;
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::get_taxon(int fractal_coords, TaxonClass &output) { ///< Obtiene un taxón
    return taxons.get_state(fractal_coords, output);
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::add_taxons(int fractal_coords_base, TaxonClass taxon, int quantity) {///< Agrega un taxón completo a la taxonomía
    int i = 0;
    std::vector <int> params;
    params.push_back(fractal_coords_base);
    params.push_back(quantity);
    FractalCmd instruction; ///< Operación: C (crear), parámetros: id de padre, número de objetos a crear
    instruction.id = '1';
    instruction.parameters = params;
    taxons.fractal_tape.push_instruction(instruction); ///< Inserta instrucción en la cinta
    taxons.iterate();
    return 1;
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::add_connection(int taxon_id, TaxonConnection conn) { ///< Agrega la conexión al taxón y recalcula el tamaño 
    int i = 0;
    std::vector <int> params;
    params.push_back(fractal_coords_base);
    params.push_back(quantity);
    FractalCmd instruction; ///< Operación: C (crear), parámetros: id de padre, número de objetos a crear
    instruction.id = '4';
    instruction.parameters = params;
    taxons.fractal_tape.push_instruction(instruction); ///< Inserta instrucción en la cinta
    taxons.iterate();
    return 1;
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::modify_connection(int conn_id, TaxonConnection new_conn) { ///< Coloca el msg en una interface de salida.
    if (connections.size() > conn_id) {
        connections[conn_id] = new_conn;
        return 1;
    }
    return 0;
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::erase_connection(int conn_id) {
    return (connections.erase(connections.begin() + conn_id) == connections.end() ? 0 : 1);
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::remove_taxon(int fractal_coords) { ///< Borra un taxón
    std::vector <int> params;
    params.push_back(fractal_coords);
    FractalCmd instruction; ///< Operación: D (delete), parámetros: id de objeto
    instruction.id = 'D';
    instruction.parameters = params;
    taxons.fractal_tape.push_instruction(instruction); ///< Ejecuta la instrucción en la máquina
    return 1;
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::replace_taxon(int fractal_coords, TaxonClass taxon) { ///< Reemplaza el taxón por el objeto especificado
    return taxons.replace_state(taxon, fractal_coords); ///< Ejecuta la instrucción en la máquina
}
// Singularity engine: ANN(Taxonomy) <- Expert <- Species <- Category <- Taxonomy

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
    //escribe taxons
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::import_taxonomy(char* file_path) {
    //Abre archivo JSON
    //carga archivo en memoria
    //lee en buffer hasta próximo  símbolo
    //leer símbolo
    //procesar fin de símbolo
    //lee taxons
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
