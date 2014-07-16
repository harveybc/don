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

/// Typedefs y Structs
struct taxon_synapse{ ///< Tipo base para conexión
    int remote_id; ///< id del taxón remoto
    int local_interface; ///< interface en el taxón remoto
    int remote_interface; ///< interface en el taxón remoto
};
struct tx_connection{
    int conn_type; ///< Tipo de conexión: entrada(0), salida(1), duplex (2) o de pertenencia a grupo >3
    std::queue <taxon_synapse> conn_members; ///< Sinápsis que pertenecen a la conexión
};

template <class MessageClass> ///< La clase MessageClass es el tipo de mensaje que se envía a otro taxón
class Taxon{
public:
    int get_id(); ///< Obtiene el atributo id de este Taxón (único,generado durante creación)
    int get_parent_id(); //< btiene el id del taxón que creó el actual, para el taxón raíz, retorna 0.
    int get_description(std::string &output); //< Obtiene el atributo descripción
    int push_msg(MessageClass msg, int interface_id); ///< Coloca el msg en una interface de salida.
    int pop_msg(MessageClass &msg, int interface_id); ///< Saca el msg de una interface de entrada.
    int pending_msgs_in(int interface_id);  ///< Retorna el número de mensajes pendientes en una interfaz de entrada
    int pending_msgs_out(int interface_id);  ///< Retorna el número de mensajes pendientes en una interfaz de salida
    int add_connection(tx_connection conn); ///< Crea una nueva conexión
    int modify_connection(int conn_id, tx_connection new_conn); ///< Modifica una conexión existente
    int erase_connection(int conn_id); ///< Elimina una conexión
    int get_connection(tx_connection conn_id); ///< Obtiene una conexión existente
    int addTag(std::string new_tag); ///< Configura las Tags (palabras clave) para búsqueda
    int removeTag(std::string tag); ///< Configura las Tags (palabras clave) para búsqueda
    int clearTags(); ///< Configura las Tags (palabras clave) para búsqueda
    int getTags(std::set<std::string> & output); ///< Obtiene los tags actuales
    Taxon(); 
    Taxon(const Taxon& orig);
    virtual ~Taxon();
private:
    typedef std::queue <MessageClass> msg_buffer; ///< Tipo de datos para un buffer de mensajes 
    std::vector<msg_buffer> input_interfaces; ///< Mapa de interfaces de entrada
    std::vector<msg_buffer> output_interfaces; ///< Mapa de interfaces de salida
    std::set<tx_connection> connections; ///< Conexiones del taxón
    std::set<std::string> tags; ///< Lista de tags para búsqueda
    int id; ///< Identificación numérica de el taxón, al ser creado en una taxonomía fractal es lineal.
    int parent_id; ///< Indentificación del taxón que creó al actual.
    std::string description; ///< Descripción del taxón
};

#endif	/* TAXON_H */

