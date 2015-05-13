
/* 
 * File:   Taxonomy.cpp
 * Author: harveybc
 * 
 * Created on 14 de junio de 2014, 12:18 AM
 */

#include "Taxonomy.h"
/*
template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::get_taxonomy(FractalMachine <TaxonClass,MessageClass> &output) { ///< Crea el estado de una máquina fractal desde una cinta de instrucciones
    if (this->fractal.get_size() > 0) {
        output = fractal;
        return 1;
    } else
        return 0;
}
template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::get_taxon(int fractal_coords, TaxonClass &output) { ///< Obtiene un taxón
   return fractal.get_state(fractal_coords, output);

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::add_taxons(int fractal_coords_base, TaxonClass taxon, int quantity) {///< Agrega un taxón completo a la taxonomía
    int i = 0;
    std::queue <int> params;
    params.push(fractal_coords_base);
    params.push(quantity);
    FractalCmd instruction; ///< Operación: C (crear), parámetros: id de padre, número de objetos a crear
    instruction.id = 'C';
    instruction.parameters = params;
    fractal.fractal_tape.push_instruction(instruction); ///< Inserta instrucción en la cinta
    fractal.iterate();
    return 1;
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::remove_taxon(int fractal_coords) { ///< Borra un taxón
    std::queue <int> params;
    params.push(fractal_coords);
    FractalCmd instruction; ///< Operación: D (delete), parámetros: id de objeto
    instruction.id = 'D';
    instruction.parameters = params;
    fractal.fractal_tape.push_instruction(instruction); ///< Ejecuta la instrucción en la máquina
    return 1;
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::replace_taxon(int fractal_coords, TaxonClass taxon) { ///< Reemplaza el taxón por el objeto especificado
    return fractal.replace_state(taxon, fractal_coords); ///< Ejecuta la instrucción en la máquina
}
// Singularity engine: ANN(Taxonomy) <- Expert <- Species <- Category <- Taxonomy

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::export_taxonomy(std::string file_path) { ///< Exporta la taxonomía a un archivo JSON o XML
    //Abre o crea archivo JSON :)
    //TODO: If the file  exists, if the quiet flag is not set, shows an overwriting alert, if the Interractive mode is set, shows a prompt before overwriting
    int i, j, k; //counter
    
    
    std::ofstream myfile(file_path);
    if (myfile.is_open()) {
        

        myfile << "{\n\"id\":" + this->id +
                ",\n\"parent_id\":" + this->parent_id +
                ",\n\"active_taxon\":" + this->active_taxon +
                ",\n\"description\":\"" + this->description + "\",";
        myfile << "\"input_interfaces\" : [";
        for (i = 0; i<this->input_interfaces.size(); i++) {
            if (i != 0) myfile << ",";
            myfile << "[\n";
            for (j = 0; j<this->input_interfaces[i].size(); j++) {
                if (j != 0) myfile << ",";
                myfile << this->input_interfaces[i][j];
            }
            myfile << "]\n";
        }
        myfile << "],";
        myfile << "\"interfaces\" : [";
        for (i = 0; i<this->interfaces.size(); i++) {
            if (i != 0) myfile << ",";
            myfile << "[\n";
            for (j = 0; j<this->interfaces[i].size(); j++) {
                if (j != 0) myfile << ",";
                myfile << this->interfaces[i][j];
            }
            myfile << "]\n";
        }
        myfile << "],\n";
        myfile << "\"connections\" : [";
        for (i = 0; i<this->connections.size(); i++) {
            if (i != 0) myfile << ",";
            myfile << "{\n";
            myfile << "\"conn_type\" : " + this->connections[i].conn_type + ",\n";
            myfile << "\"conn_members\" : [\n";
            for (j = 0; j<this->connections[i].conn_members.size(); j++) {
                myfile << "{\n \"remote_id\" : " + this->connections[i].conn_members[j].remote_id;
                myfile << "\n \"length\" : " + this->connections[i].conn_members[j].length;
                myfile << "\n \"radius\" : " + this->connections[i].conn_members[j].radius;
                myfile << "\n \"sensitivity\" : " + this->connections[i].conn_members[j].sensitivity;
                myfile << "{\n \"local_interface\" : " + this->connections[i].conn_members[j].local_interface;
                myfile << "{\n \"remote_interface\" : " + this->connections[i].conn_members[j].remote_interface;
                myfile << "\n}\n";
            }
            myfile << "]";
            myfile << "}\n";
        }
        myfile << "],\n\"tags\" : [";
        for (std::set<std::string>::iterator it = this->tags.begin(); it != this->tags.end(); ++it) {
            if (it != this->tags.begin()) myfile << ",";
            myfile << "\"" + *it + "\"";
        }
        myfile << "],\n\"fractal\" : {";
        myfile << "\n\"fractal_tape\" : [\n";
        for (i = 0; i < fractal.fractal_tape.size(); i++) {
            if (i != 0) myfile << ",";
            myfile << "{\"id\" : " + fractal.fractal_tape[i].id;
            myfile << ",\n\"parameters\" : [";
            for (j = 0; j < fractal.fractal_tape[i].parameters.size(); j++) {
                if (j != 0) myfile << ",";
                myfile << "\n" + fractal.fractal_tape[i].parameters[j];
            }
            myfile << "]\n}";
        }
        myfile << "\n],";
        myfile << "\n\"nodes\" : [\n";
        for (i = 0; i < fractal.nodes.size(); i++) {
            myfile << "{\n\"id\":" + fractal.nodes[i].id +
                    ",\n\"parent_id\":" + fractal.nodes[i].parent_id +
                    ",\n\"active_taxon\":" + fractal.nodes[i].active_taxon +
                    ",\n\"description\":\"" + fractal.nodes[i].description + "\",";
            myfile << "\"input_interfaces\" : [";
            for (j = 0; j<fractal.nodes[i].input_interfaces.size(); j++) {
                if (j != 0) myfile << ",";
                myfile << "[\n";
                for (k = 0; k<fractal.nodes[i].input_interfaces[j].size(); k++) {
                    if (k != 0) myfile << ",";
                    myfile << fractal.nodes[i].input_interfaces[j][k];
                }
                myfile << "]\n";
            }
            myfile << "],";
            myfile << "\"interfaces\" : [";
            for (j = 0; j<fractal.nodes[i].interfaces.size(); j++) {
                if (j != 0) myfile << ",";
                myfile << "[\n";
                for (k = 0; k<fractal.nodes[i].interfaces[j].size(); k++) {
                    if (k != 0) myfile << ",";
                    myfile << fractal.nodes[i].interfaces[j][k];
                }
                myfile << "]\n";
            }
            myfile << "],\n";
            myfile << "\"connections\" : [";
            for (j = 0; j<fractal.nodes[i].connections.size(); j++) {
                if (j != 0) myfile << ",";
                myfile << "{\n";
                myfile << "\"conn_type\" : " + fractal.nodes[i].connections[j].conn_type + ",\n";
                myfile << "\"conn_members\" : [\n";
                for (k = 0; k<fractal.nodes[i].connections[j].conn_members.size(); k++) {
                    myfile << "{\n \"remote_id\" : " + fractal.nodes[i].connections[j].conn_members[k].remote_id;
                    myfile << "\n \"length\" : " + fractal.nodes[i].connections[j].conn_members[k].length;
                    myfile << "\n \"radius\" : " + fractal.nodes[i].connections[j].conn_members[k].radius;
                    myfile << "\n \"sensitivity\" : " + fractal.nodes[i].connections[j].conn_members[k].sensitivity;
                    myfile << "{\n \"local_interface\" : " + fractal.nodes[i].connections[j].conn_members[k].local_interface;
                    myfile << "{\n \"remote_interface\" : " + fractal.nodes[i].connections[j].conn_members[k].remote_interface;
                    myfile << "\n}\n";
                }
                myfile << "]";
                myfile << "}\n";
            }
            myfile << "],\n\"tags\" : [";
            for (std::set<std::string>::iterator it = fractal.nodes[i].tags.begin(); it != fractal.nodes[i].tags.end(); ++it) {
                if (it != fractal.nodes[i].tags.begin()) myfile << ",";
                myfile << "\"" + *it + "\"";
            }
            myfile << "]";
        }
        myfile << "\n],";
        myfile << "\n\"taxon_register\" : [\n";
        for (i = 0; i < fractal.taxon_register.size(); i++) {
            myfile << "{\n\"id\":" + fractal.taxon_register[i].id +
                    ",\n\"parent_id\":" + fractal.taxon_register[i].parent_id +
                    ",\n\"active_taxon\":" + fractal.taxon_register[i].active_taxon +
                    ",\n\"description\":\"" + fractal.taxon_register[i].description + "\",";
            myfile << "\"input_interfaces\" : [";
            for (j = 0; j<fractal.taxon_register[i].input_interfaces.size(); j++) {
                if (j != 0) myfile << ",";
                myfile << "[\n";
                for (k = 0; k<fractal.taxon_register[i].input_interfaces[j].size(); k++) {
                    if (k != 0) myfile << ",";
                    myfile << fractal.taxon_register[i].input_interfaces[j][k];
                }
                myfile << "]\n";
            }
            myfile << "],";
            myfile << "\"interfaces\" : [";
            for (j = 0; j<fractal.taxon_register[i].interfaces.size(); j++) {
                if (j != 0) myfile << ",";
                myfile << "[\n";
                for (k = 0; k<fractal.taxon_register[i].interfaces[j].size(); k++) {
                    if (k != 0) myfile << ",";
                    myfile << fractal.taxon_register[i].interfaces[j][k];
                }
                myfile << "]\n";
            }
            myfile << "],\n";
            myfile << "\"connections\" : [";
            for (j = 0; j<fractal.taxon_register[i].connections.size(); j++) {
                if (j != 0) myfile << ",";
                myfile << "{\n";
                myfile << "\"conn_type\" : " + fractal.taxon_register[i].connections[j].conn_type + ",\n";
                myfile << "\"conn_members\" : [\n";
                for (k = 0; k<fractal.taxon_register[i].connections[j].conn_members.size(); k++) {
                    myfile << "{\n \"remote_id\" : " + fractal.taxon_register[i].connections[j].conn_members[k].remote_id;
                    myfile << "\n \"length\" : " + fractal.taxon_register[i].connections[j].conn_members[k].length;
                    myfile << "\n \"radius\" : " + fractal.taxon_register[i].connections[j].conn_members[k].radius;
                    myfile << "\n \"sensitivity\" : " + fractal.taxon_register[i].connections[j].conn_members[k].sensitivity;
                    myfile << "{\n \"local_interface\" : " + fractal.taxon_register[i].connections[j].conn_members[k].local_interface;
                    myfile << "{\n \"remote_interface\" : " + fractal.taxon_register[i].connections[j].conn_members[k].remote_interface;
                    myfile << "\n}\n";
                }
                myfile << "]";
                myfile << "}\n";
            }
            myfile << "],\n\"tags\" : [";
            for (std::set<std::string>::iterator it = fractal.taxon_register[i].tags.begin(); it != fractal.taxon_register[i].tags.end(); ++it) {
                if (it != fractal.taxon_register[i].tags.begin()) myfile << ",";
                myfile << "\"" + *it + "\"";
            }
            myfile << "]";
        }
        myfile << "\n],";
        myfile << "\"connections\" : [";
        for (i = 0; i<fractal.conn_register.size(); i++) {
            if (i != 0) myfile << ",";
            myfile << "{\n";
            myfile << "\"conn_type\" : " + fractal.conn_register[i].conn_type + ",\n";
            myfile << "\"conn_members\" : [\n";
            for (j = 0; j<fractal.conn_register[i].conn_members.size(); j++) {
                myfile << "{\n \"remote_id\" : " + fractal.conn_register[i].conn_members[j].remote_id;
                myfile << "\n \"length\" : " + fractal.conn_register[i].conn_members[j].length;
                myfile << "\n \"radius\" : " + fractal.conn_register[i].conn_members[j].radius;
                myfile << "\n \"sensitivity\" : " + fractal.conn_register[i].conn_members[j].sensitivity;
                myfile << "{\n \"local_interface\" : " + fractal.conn_register[i].conn_members[j].local_interface;
                myfile << "{\n \"remote_interface\" : " + fractal.conn_register[i].conn_members[j].remote_interface;
                myfile << "\n}\n";
            }
            myfile << "]";
            myfile << "}\n";
        }
        myfile << "\n]";
        
        myfile << "}";
        myfile << "\n}";
        myfile.close();
        

    } else std::cout << "Unable to open file";
    //escribe fractal
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::import_taxonomy(std::string file_path) {
    //Abre archivo JSON
    //carga archivo en memoria
    //lee en buffer hasta próximo  símbolo
    //leer símbolo
    //procesar fin de símbolo
    //lee fractal
} // < Importa la taxonomía desde un archivo JSON o XML

template <class TaxonClass,class MessageClass>
Taxonomy<TaxonClass,MessageClass>::Taxonomy() {
}

template <class TaxonClass,class MessageClass>
Taxonomy<TaxonClass,MessageClass>::Taxonomy(const Taxonomy& orig) {
}

template <class TaxonClass,class MessageClass>
Taxonomy<TaxonClass,MessageClass>::~Taxonomy() {
}

 */

