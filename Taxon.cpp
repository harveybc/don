/* 
 * File:   Taxon.cpp
 * Author: harveybc
 * 
 * Created on 24 de junio de 2014, 04:39 AM
 */

#include "Taxon.h"

template <class MessageClass>
int Taxon<MessageClass>::get_id(){ ///< Obtiene el atributo id de este Taxón (único,generado durante creación)
    return id;
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
int Taxon<MessageClass>::push_msg(MessageClass msg, int interface_id){ ///> coloca el msg en la interface especificada de salida.
    if (input_interfaces.size()>interface_id){
        input_interfaces[interface_id].push(msg);
        return 1;
    }
    else
        return 0;
}

template <class MessageClass>
int Taxon<MessageClass>::pending_msgs(int interface_id){  ///< Retorna el número de mensajes pendientes en un buffer
    if (input_interfaces.size()>interface_id){
        return input_interfaces[interface_id].size();
    }
    else 
        return 0;
}

template <class MessageClass>
int Taxon<MessageClass>::readMessage(int interface_id){ ///< Extrae un mensaje de una interfaz
    if (input_interfaces.size()>interface_id){
        return input_interfaces[interface_id].pop();
    }
    else 
        return 0;
}

template <class MessageClass>
int Taxon<MessageClass>::addTag(std::string new_tag){ ///< Configura las Tags (palabras clave) para búsqueda
    return tags.insert(new_tag);
}

template <class MessageClass>
int Taxon<MessageClass>::removeTag(std::string tag){ ///< Configura las Tags (palabras clave) para búsqueda
    return tags.erase(tag);
}

template <class MessageClass>
int Taxon<MessageClass>::getTags(std::set<std::string> &output){ ///< Obtiene los tags actuales
    return tags;
}

template <class MessageClass>
int Taxon<MessageClass>::dd_connection(Connection conn, int interface_id){ ///< Coloca el msg en una interface de salida.
    connections.insert(conn);
}

template <class MessageClass>
int Taxon<MessageClass>::modify_connection(Connection old_conn, Connection new_conn){ ///< Coloca el msg en una interface de salida.
    connections.erase(old_conn);
    connections.insert(new_conn);
}

template <class MessageClass>
int Taxon<MessageClass>::erase_connection(Connection conn){
    connections.erase(conn);
}

Taxon::Taxon() {
}

Taxon::Taxon(const Taxon& orig) {
}

Taxon::~Taxon() {
}

