/* 
 * File:   Taxonomy.cpp
 * Author: harveybc
 * 
 * Created on 14 de junio de 2014, 12:18 AM
 */

#include "Taxonomy.h"

int get_taxonomy(FractalMachine <TaxonClass> &output){ ///< Crea el estado de una máquina fractal desde una cinta de instrucciones
    if (taxons.getSize()>0){
        output=taxons;
        return 1;
    }
    else
        return 0;
}

int get_taxon(int fractal_coords,TaxonClass &output){ ///< Obtiene un taxón
    return taxons.get_state(fractal_coords, output);
}

int add_taxons(int fractal_coords_base, TaxonClass taxon, int quantity){///< Agrega un taxón completo a la taxonomía
    std::queue <double> params;
    params.push((double)fractal_coords_base);
    params.push((double)quantity);
    FractalTape instruction ('C',params); ///< Operación: C (crear), parámetros: id de padre, número de objetos a crear
    return taxons.run(instruction); ///< Ejecuta la instrucción en la máquina
}

int remove_taxon(int fractal_coords){ ///< Borra un taxón
    std::queue <double> params;
    params.push((double)fractal_coords);
    FractalTape instruction ('D',params); ///< Operación: D (delete), parámetros: id de objeto
    return taxons.run(instruction); ///< Ejecuta la instrucción en la máquina
}

int replace_taxon(int fractal_coords, TaxonClass taxon){ ///< Reemplaza el taxón por el objeto especificado
    return taxons.replaceState(taxon, fractal_coords); ///< Ejecuta la instrucción en la máquina
}
    // Singularity engine: ANN(Taxonomy) <- Expert <- Species <- Category <- Taxonomy
template <class TaxonClass,class InstructionsClass> 
Taxonomy<TaxonClass, InstructionsClass>::Taxonomy() {
}

template <class TaxonClass,class InstructionsClass> 
Taxonomy<TaxonClass, InstructionsClass>::Taxonomy(const Taxonomy& orig) {
}

template <class TaxonClass,class InstructionsClass> 
Taxonomy<TaxonClass, InstructionsClass>::~Taxonomy() {
}

