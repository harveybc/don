/** 
 * @author      Harvey D. Bastidas C. <harveybc@ingeni-us.com>
 * @brief       Taxon class template
 * @par Description @parblock 
 *      Interfaz de comunicaciones para un taxón.
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
 * @file        Taxon.h
 * @version     0.1
 * @date        22 de mayo de 2014, 11:58 PM
 */

#ifndef TAXON_H
#define	TAXON_H
#include <queue>
#include <vector>
#include <string>
#include <set> 

template <class MessageClass> ///< La clase MessageClass es el tipo de mensaje que se envía a otro taxón
class Taxon {
public:
    int get_id(); ///< Obtiene el atributo id de este Taxón (único,generado durante creación)
    int is_active(); ///< retona el valor de active_taxon
    int get_parent_id(); //< btiene el id del taxón que creó el actual, para el taxón raíz, retorna 0.
    virtual void evaluate();
    Taxon();
    Taxon(const Taxon& orig);
    virtual ~Taxon();
protected:
    int id; ///< Identificación numérica de el taxón, al ser creado en una taxonomía fractal es lineal.
    int parent_id; ///< Identificación del taxón padre si existe, al ser creado en una taxonomía fractal es lineal.
    bool active_taxon; ///< Es TRUE al crear el taxon, se vuelve FALSE al borrarlo, se puede reactivar usando la instrucción replace (en FractalMachine.cpp)
    bool evaluated; ///< Es TRUE si el taxón ha sido evaluado
    double x;
    double y;
    double z;
    double r;
    double threshold;
};

template <class MessageClass>
int Taxon<MessageClass>::get_id() { ///< Obtiene el atributo id de este Taxón (único,generado durante creación)
    return id;
}

template <class MessageClass>
int Taxon<MessageClass>::get_parent_id() { //< btiene el id del taxón que creó el actual, para el taxón raíz, retorna 0.
    return parent_id;
}

template <class MessageClass>
int Taxon<MessageClass>::is_active() { ///< Obtiene el atributo id de este Taxón (único,generado durante creación)
    return active_taxon;
}

template <class MessageClass>
int Taxon<MessageClass>::get_description(std::string &output) { //< Obtiene el atributo descripción
    output = description;
}

template <class MessageClass>
void Taxon<MessageClass>::add_tag(std::string new_tag) { ///< Configura las Tags (palabras clave) para búsqueda
    tags.insert(tags.begin(), new_tag);
}

template <class MessageClass>
void Taxon<MessageClass>::remove_tag(std::string tag) { ///< Configura las Tags (palabras clave) para búsqueda
    tags.erase(tag);
}

template <class MessageClass>
void Taxon<MessageClass>::clear_tags() { ///< Configura las Tags (palabras clave) para búsqueda
    tags.clear();
}

template <class MessageClass>
void Taxon<MessageClass>::get_tags(std::set<std::string> &output) { ///< Obtiene los tags actuales
    output = tags;
}

template <class MessageClass>
Taxon<MessageClass>::Taxon() {
}

template <class MessageClass>
Taxon<MessageClass>::Taxon(const Taxon& orig) {
}

template <class MessageClass>
Taxon<MessageClass>::~Taxon() {
}

#endif	/* TAXON_H */

