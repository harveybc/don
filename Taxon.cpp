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
int Taxon<MessageClass>::pop_msg(MessageClass &msg, int interface_id){ ///< Saca el msg de una interface de entrada.
    if (input_interfaces.size()>interface_id){
        msg=input_interfaces[interface_id].front();
                input_interfaces[interface_id].pop();
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

int Taxon<MessageClass>::add_connection(tx_connection conn){ ///< Coloca el msg en una interface de salida.
    connections.push_back(conn);
}

template <class MessageClass>
int Taxon<MessageClass>::modify_connection(int conn_id, tx_connection new_conn){ ///< Coloca el msg en una interface de salida.
    if (connections.size()>conn_id){
        connections[conn_id]=new_conn;
        return 1;
    }
    return 0;
}

template <class MessageClass>
int Taxon<MessageClass>::erase_connection(int conn_id){
    return connections.erase(connections.begin()+conn_id);
}

template <class MessageClass>
int Taxon<MessageClass>::add_tag(std::string new_tag){ ///< Configura las Tags (palabras clave) para búsqueda
    return tags.insert(new_tag);
}

template <class MessageClass>
int Taxon<MessageClass>::remove_tag(std::string tag){ ///< Configura las Tags (palabras clave) para búsqueda
    return tags.erase(tag);
}

template <class MessageClass>
int Taxon<MessageClass>::clear_tags(){ ///< Configura las Tags (palabras clave) para búsqueda
    tags.clear();
    return 1;
}

template <class MessageClass>
int Taxon<MessageClass>::get_tags(std::set<std::string> &output){ ///< Obtiene los tags actuales
    return tags;
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

