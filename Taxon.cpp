/* 
 * File:   Taxon.cpp
 * Author: harveybc
 * 
 * Created on 24 de junio de 2014, 04:39 AM
 */

#include "Taxon.h"

unsigned long int get_id(){ ///< Obtiene el atributo id de este Taxón (único,generado durante creación)
    return id;
}

unsigned long int get_parent_id(){ //< btiene el id del taxón que creó el actual, para el taxón raíz, retorna 0.
    return parent_id;
}    

std::string get_description(){ //< Obtiene el atributo descripción
    return description;
}    

int push_msg(MessageClass msg, int interface_id){ ///> coloca el msg en la interface especificada de salida.
    if (input_interfaces.size()>interface_id){
        input_interfaces[interface].push(msg);
        return 1;
    }
    else
        return 0;
}

int pending_msgs(int interface_id){  ///< Retorna el número de mensajes pendientes en un buffer
    if (input_interfaces.size()>interface_id){
        return input_interfaces[interface_id].size();
    }
    else 
        return 0;
}

MessageClass readMessage(int interface_id){ ///< Extrae un mensaje de una interfaz
    if (input_interfaces.size()>interface_id){
        return input_interfaces[interface_id].pop();
    }
    else 
        return 0;
}

int addTag(std::string new_tag){ ///< Configura las Tags (palabras clave) para búsqueda
    return tags.insert(new_tag);
}

int removeTag(std::string tag){ ///< Configura las Tags (palabras clave) para búsqueda
    return tags.erase(tag);
}

int getTags(std::set<std::string> &output){ ///< Obtiene los tags actuales
    return tags;
}

int add_connection(Connection conn, int interface_id){ ///< Coloca el msg en una interface de salida.
    connections.insert(conn);
}

int modify_connection(Connection old_conn, Connection new_conn){ ///< Coloca el msg en una interface de salida.
    connections.erase(old_conn);
    connections.insert(new_conn);
}

int erase_connection(Connection conn){
    connections.erase(conn);
}

Taxon::Taxon() {
}

Taxon::Taxon(const Taxon& orig) {
}

Taxon::~Taxon() {
}

