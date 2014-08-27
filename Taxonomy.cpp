/* 
 * File:   Taxonomy.cpp
 * Author: harveybc
 * 
 * Created on 14 de junio de 2014, 12:18 AM
 */

#include "Taxonomy.h"

template <class TaxonClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass>::get_taxonomy(FractalMachine <TaxonClass> &output){ ///< Crea el estado de una máquina fractal desde una cinta de instrucciones
    if (taxons.get_size()>0){
        output=taxons;
        return 1;
    }
    else
        return 0;
}

template <class TaxonClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass>::get_taxon(int fractal_coords,TaxonClass &output){ ///< Obtiene un taxón
    return taxons.get_state(fractal_coords, output);
}

template <class TaxonClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass>::add_taxons(int fractal_coords_base, TaxonClass taxon, int quantity){///< Agrega un taxón completo a la taxonomía
    int i=0;
    std::queue <int> params;
    params.push(fractal_coords_base);
    params.push(quantity);
    fractal_instruction instruction; ///< Operación: C (crear), parámetros: id de padre, número de objetos a crear
    instruction.id='C';
    instruction.parameters=params;
    taxons.fractal_tape.push_instruction(instruction); ///< Ejecuta la instrucción en la máquina
    return 1;
}

template <class TaxonClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass>::remove_taxon(int fractal_coords){ ///< Borra un taxón
    std::queue <int> params;
    params.push(fractal_coords);
    fractal_instruction instruction; ///< Operación: D (delete), parámetros: id de objeto
    instruction.id='D';
    instruction.parameters=params;
    taxons.fractal_tape.push_instruction(instruction); ///< Ejecuta la instrucción en la máquina
    return 1;
}

template <class TaxonClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass>::replace_taxon(int fractal_coords, TaxonClass taxon){ ///< Reemplaza el taxón por el objeto especificado
    return taxons.replace_state(taxon, fractal_coords); ///< Ejecuta la instrucción en la máquina
}
    // Singularity engine: ANN(Taxonomy) <- Expert <- Species <- Category <- Taxonomy

template <class TaxonClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass>::export_taxonomy(FractalTape fractal_coords, std::string file_path){ ///< Exporta la taxonomía a un archivo JSON o XML
    
}

template <class TaxonClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass>::import_taxonomy(FractalTape fractal_coords, std::string file_path); // < Importa la taxonomía desde un archivo JSON o XML

template <class TaxonClass> 
Taxonomy<TaxonClass>::Taxonomy() {
}

template <class TaxonClass> 
Taxonomy<TaxonClass>::Taxonomy(const Taxonomy& orig) {
}

template <class TaxonClass> 
Taxonomy<TaxonClass>::~Taxonomy() {
}

