/* 
 * File:   Taxon.cpp
 * Author: harveybc
 * 
 * Created on 24 de junio de 2014, 04:39 AM
 */

#include "Taxon.h"

int Taxon::get_id() { ///< Obtiene el atributo id de este Taxón (único,generado durante creación)
    return id;
}

int Taxon::get_parent_id() { //< btiene el id del taxón que creó el actual, para el taxón raíz, retorna 0.
    return parent_id;
}

int Taxon::is_active() { ///< Obtiene el atributo id de este Taxón (único,generado durante creación)
    return active_taxon;
}

Taxon::Taxon() {
}

Taxon::Taxon(const Taxon& orig) {
}

Taxon::~Taxon() {
}
