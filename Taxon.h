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
    double length; //< largo de la conexión, , T=1.5ms, Lambda=4-17mm, r_neurona=(5E-6,1.5E-3m)
    double radius; //< vol_neurona/100 Regula la velocidad de salida V=(2.8-9.7m/s)myelinated, V=(max:C0=176m/s) La suma de los radios da tamaño a neurona)
    double sensitivity; //< Equivalente al peso de la conexión de entrada 
    int local_interface; ///< interface en el taxón local
    int remote_interface; ///< interface en el taxón remoto
};
struct tx_connection{
    int conn_type; ///<  Tipo de conexión: duplex (0), entrada(1), salida(2) o de pertenencia a grupo >2
    std::deque <taxon_synapse> conn_members; ///< Sinápsis que pertenecen a la conexión
};

template <class MessageClass> ///< La clase MessageClass es el tipo de mensaje que se envía a otro taxón
class Taxon{
public:
    int get_id(); ///< Obtiene el atributo id de este Taxón (único,generado durante creación)
    int is_active(); ///< retona el valor de active_taxon
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
    int num_connections(); ///< Obtiene el número de conexiones
    int add_tag(std::string new_tag); ///< Configura las Tags (palabras clave) para búsqueda
    int remove_tag(std::string tag); ///< Configura las Tags (palabras clave) para búsqueda
    int clear_tags(); ///< Configura las Tags (palabras clave) para búsqueda
    int get_tags(std::set<std::string> & output); ///< Obtiene los tags actuales
    Taxon(); 
    Taxon(const Taxon& orig);
    virtual ~Taxon();
protected:
    typedef std::deque <MessageClass> msg_buffer; ///< Tipo de datos para un buffer de mensajes 
    std::vector<msg_buffer> input_interfaces; ///< Mapa de interfaces de entrada
    std::vector<msg_buffer> output_interfaces; ///< Mapa de interfaces de salida
    std::vector<tx_connection> connections; ///< Conexiones del taxón
    std::set<std::string> tags; ///< Lista de tags para búsqueda
    int id; ///< Identificación numérica de el taxón, al ser creado en una taxonomía fractal es lineal.
    int parent_id; ///< Indentificación del taxón que creó al actual.
    bool active_taxon; ///< Es TRUE al crear el taxon, se vuelve FALSE al borrarlo, se puede reactivar usando la instrucción replace (en FractalMachine.cpp)
    std::string description; ///< Descripción del taxón
};

/**
{
taxon_synapse: { 
    "remote_id":"0",
    "length":"0",
    "radius":"1",
    "Sensitivity":"1", 
    "local_interface":"0", 
    "remote_interface":"0"
}
}
 * 
 * 
{
tx_connection: {
    "conn_type":"0",
    conn_members: [{
taxon_synapse: { 
    "remote_id":"0",
    "length":"0",
    "radius":"1",
    "Sensitivity":"1", 
    "local_interface":"0", 
    "remote_interface":"0"
}
}]
}
}
 * 
 *  Taxon JSON:
 * { 
 *  "id" : "1",
 *  "parent_id" : "0",
 *  "active_taxon" :"0",
 *  "description" : "taxonomía inicial",
 *  "input_interfaces" : [{"value":[{"value" : "0"}]}],
 *  "output_interfaces" : [{"value":[{"value" : "0"}]}],
 *  "connections" : [{"value":{
 *      "conn_type": "0",
 *      "conn_members":[{"value":{
 *          "remote_id":"0",
 *          "local_interface":"0",
 *          "remote_interface":"0"
 * }}] }}],
 * "tags" :[{"value" : "0"}] 
 * }
 * 
 */

#endif	/* TAXON_H */

