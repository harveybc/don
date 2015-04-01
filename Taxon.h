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
struct TaxonSynapse{ ///< Tipo base para conexión
    int remote_id; ///< id del taxón remoto
    double length; //< largo de la conexión, , T=1.5ms, Lambda=4-17mm, r_neurona=(5E-6,1.5E-3m)
    double radius; //< vol_neurona/100 Regula la velocidad de salida V=(2.8-9.7m/s)myelinated, V=(max:C0=176m/s) La suma de los radios da tamaño a neurona)
    double sensitivity; //< Equivalente al peso de la conexión de entrada 
    int local_interface; ///< interface en el taxón local
    int remote_interface; ///< interface en el taxón remoto
};
struct TaxonConnection{
    int conn_type; ///<  Tipo de conexión: duplex (0), entrada(1), salida(2) o de pertenencia a grupo >2
    std::deque <TaxonSynapse> conn_members; ///< Sinápsis que pertenecen a la conexión
};
struct FractalCmd{ 
    char id; ///< La instrucción a ejecutar (para versión de 8 bits)
    std::vector <int> parameters; ///< Parámetros de la instrucción ///TODO: cambiar a UINT64
};
struct TrainingData{ ///< TODO: Cambiar, este es  de Synaapse
    int remote_id; ///< id del taxón remoto
    double length; //< largo de la conexión, , T=1.5ms, Lambda=4-17mm, r_neurona=(5E-6,1.5E-3m)
    double radius; //< vol_neurona/100 Regula la velocidad de salida V=(2.8-9.7m/s)myelinated, V=(max:C0=176m/s) La suma de los radios da tamaño a neurona)
    double sensitivity; //< Equivalente al peso de la conexión de entrada 
    int local_interface; ///< interface en el taxón local
    int remote_interface; ///< interface en el taxón remoto
};

template <class MessageClass> ///< La clase MessageClass es el tipo de mensaje que se envía a otro taxón
class Taxon{
public:
    int get_id(); ///< Obtiene el atributo id de este Taxón (único,generado durante creación)
    int is_active(); ///< retona el valor de active_taxon
    int get_parent_id(); //< btiene el id del taxón que creó el actual, para el taxón raíz, retorna 0.
    int get_description(std::string &output); //< Obtiene el atributo descripción
    int read_msg_in(MessageClass &msg, int interface_id); ///< lee el msg en una interface de entrada.
    int read_msg_out(MessageClass &msg, int interface_id); ///< lee el msg en una interface de entrada.
    int push_msg_in(MessageClass msg, int interface_id); ///< Coloca el msg en una interface de entrada.
    int pending_msgs_in(int interface_id);  ///< Retorna el número de mensajes pendientes en una interfaz de entrada
    int pending_msgs_out(int interface_id);  ///< Retorna el número de mensajes pendientes en una interfaz de salida
    int add_connection(TaxonConnection conn); ///< Crea una nueva conexión
    int modify_connection(int conn_id, TaxonConnection new_conn); ///< Modifica una conexión existente
    int erase_connection(int conn_id); ///< Elimina una conexión
    int get_connection(TaxonConnection conn_id); ///< Obtiene una conexión existente
    int num_connections(); ///< Obtiene el número de conexiones
    void add_interfaces_in(int num); ///< Agrega interfaces de entrada al taxón
    void add_interfaces_out(int num); ///< Agrega interfaces de salida al taxón
    void add_tag(std::string new_tag); ///< Configura las Tags (palabras clave) para búsqueda
    void remove_tag(std::string tag); ///< Configura las Tags (palabras clave) para búsqueda
    void clear_tags(); ///< Configura las Tags (palabras clave) para búsqueda
    void get_tags(std::set<std::string> & output); ///< Obtiene los tags actuales
    virtual void evaluate();
    Taxon(); 
    Taxon(const Taxon& orig);
    virtual ~Taxon();
protected:
    int push_msg_out(MessageClass msg, int interface_id); ///< Coloca el msg en una interface de salida.
    int pop_msg_in(MessageClass &msg, int interface_id); ///< Saca el msg de una interface de entrada.    
    int pop_msg_out(MessageClass &msg, int interface_id); ///< Saca el msg de una interface de salida.
    typedef std::deque <MessageClass> msg_buffer; ///< Tipo de datos para un buffer de mensajes 
    std::vector<msg_buffer> input_interfaces; ///< Mapa de interfaces de entrada
    std::vector<msg_buffer> output_interfaces; ///< Mapa de interfaces de salida
    std::vector<TaxonConnection> connections; ///< Conexiones del taxón
    std::set<std::string> tags; ///< Lista de tags para búsqueda
    int id; ///< Identificación numérica de el taxón, al ser creado en una taxonomía fractal es lineal.
    int parent_id; ///< Indentificación del taxón que creó al actual.
    bool active_taxon; ///< Es TRUE al crear el taxon, se vuelve FALSE al borrarlo, se puede reactivar usando la instrucción replace (en FractalMachine.cpp)
    std::string description; ///< Descripción del taxón
};


template <class MessageClass>
int Taxon<MessageClass>::get_id(){ ///< Obtiene el atributo id de este Taxón (único,generado durante creación)
    return id;
}

template <class MessageClass>
int Taxon<MessageClass>::num_connections(){
    return connections.size();
}

template <class MessageClass>
int Taxon<MessageClass>::is_active(){ ///< Obtiene el atributo id de este Taxón (único,generado durante creación)
    return active_taxon;
}

template <class MessageClass>
int Taxon<MessageClass>::get_parent_id(){ //< btiene el id del taxón que creó el actual, para el taxón raíz, retorna 0.
    return parent_id;
}    

template <class MessageClass>
int Taxon<MessageClass>::get_description(std::string &output){ //< Obtiene el atributo descripción
    output=description;
}    

template <class MessageClass>
void Taxon<MessageClass>::add_interfaces_in(int num){ ///< Agrega interfaces de entrada al taxón
    msg_buffer tmp;
    for (int i=0;i<num;i++)
        input_interfaces.push_back(tmp);
}

template <class MessageClass>
void Taxon<MessageClass>::add_interfaces_out(int num){ ///< Agrega interfaces de salida al taxón
    msg_buffer tmp;
    for (int i=0;i<num;i++)
        output_interfaces.push_back(tmp);
}
    
template <class MessageClass>
int Taxon<MessageClass>::read_msg_in(MessageClass &msg, int interface_id){ ///< lee el msg en una interface de entrada.
    if (input_interfaces.size()>interface_id){
        msg=input_interfaces[interface_id][0];
        return 1;
    }
    else
        return 0;
}

template <class MessageClass>
int Taxon<MessageClass>::read_msg_out(MessageClass &msg, int interface_id){ ///< lee el msg en una interface de entrada.
    if (output_interfaces.size()>interface_id){
        msg=output_interfaces[interface_id][0];
        return 1;
    }
    else
        return 0;
}

template <class MessageClass>
int Taxon<MessageClass>::push_msg_in(MessageClass msg, int interface_id){ ///> coloca el msg en la interface especificada de salida.
    if (input_interfaces.size()>interface_id){
        input_interfaces[interface_id].push_back(msg);
        return 1;
    }
    else
        return 0;
}

template <class MessageClass>
int Taxon<MessageClass>::pop_msg_in(MessageClass &msg, int interface_id){ ///< Saca el msg de una interface de entrada.
    if (input_interfaces.size()>interface_id){
        msg=input_interfaces[interface_id].front();
                input_interfaces[interface_id].pop_front();
        return 1;
    }
    else 
        return 0;
}

template <class MessageClass>
int Taxon<MessageClass>::push_msg_out(MessageClass msg, int interface_id){ ///> coloca el msg en la interface especificada de salida.
    if (output_interfaces.size()>interface_id){
        output_interfaces[interface_id].push_back(msg);
        return 1;
    }
    else
        return 0;
}

template <class MessageClass>
int Taxon<MessageClass>::pop_msg_out(MessageClass &msg, int interface_id){ ///< Saca el msg de una interface de entrada.
    if (output_interfaces.size()>interface_id){
        msg=output_interfaces[interface_id].front();
                output_interfaces[interface_id].pop_front();
        return 1;
    }
    else 
        return 0;
}

template <class MessageClass>
int Taxon<MessageClass>::pending_msgs_in(int interface_id){  ///< Retorna el número de mensajes pendientes en un buffer de entrada
    if (input_interfaces.size()>interface_id){
        return input_interfaces[interface_id].size();
    }
    else 
        return 0;
}

template <class MessageClass>
int Taxon<MessageClass>::pending_msgs_out(int interface_id){  ///< Retorna el número de mensajes pendientes en un buffer de salida
    if (output_interfaces.size()>interface_id){
        return output_interfaces[interface_id].size();
    }
    else 
        return 0;
}

template <class MessageClass>

int Taxon<MessageClass>::add_connection(TaxonConnection conn){ ///< Coloca el msg en una interface de salida.
    connections.push_back(conn);
}

template <class MessageClass>
int Taxon<MessageClass>::modify_connection(int conn_id, TaxonConnection new_conn){ ///< Coloca el msg en una interface de salida.
    if (connections.size()>conn_id){
        connections[conn_id]=new_conn;
        return 1;
    }
    return 0;
}

template <class MessageClass>
int Taxon<MessageClass>::erase_connection(int conn_id){
    return (connections.erase(connections.begin()+conn_id)==connections.end()?0:1);
}

template <class MessageClass>
void Taxon<MessageClass>::add_tag(std::string new_tag){ ///< Configura las Tags (palabras clave) para búsqueda
    tags.insert(tags.begin(),new_tag);
}

template <class MessageClass>
void Taxon<MessageClass>::remove_tag(std::string tag){ ///< Configura las Tags (palabras clave) para búsqueda
    tags.erase(tag);
}

template <class MessageClass>
void Taxon<MessageClass>::clear_tags(){ ///< Configura las Tags (palabras clave) para búsqueda
    tags.clear();
}

template <class MessageClass>
void Taxon<MessageClass>::get_tags(std::set<std::string> &output){ ///< Obtiene los tags actuales
    output=tags;
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

template class Taxon<TrainingData>;
template class Taxon<FractalCmd>;

#endif	/* TAXON_H */

