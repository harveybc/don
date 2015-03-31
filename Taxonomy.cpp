
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
    if (this->taxons.get_size() > 0) {
        output = taxons;
        return 1;
    } else
        return 0;
}
template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::get_taxon(int fractal_coords, TaxonClass &output) { ///< Obtiene un taxón
   return taxons.get_state(fractal_coords, output);

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::add_taxons(int fractal_coords_base, TaxonClass taxon, int quantity) {///< Agrega un taxón completo a la taxonomía
    int i = 0;
    std::queue <int> params;
    params.push(fractal_coords_base);
    params.push(quantity);
    fractal_instruction instruction; ///< Operación: C (crear), parámetros: id de padre, número de objetos a crear
    instruction.id = 'C';
    instruction.parameters = params;
    taxons.fractal_tape.push_instruction(instruction); ///< Inserta instrucción en la cinta
    taxons.iterate();
    return 1;
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::remove_taxon(int fractal_coords) { ///< Borra un taxón
    std::queue <int> params;
    params.push(fractal_coords);
    fractal_instruction instruction; ///< Operación: D (delete), parámetros: id de objeto
    instruction.id = 'D';
    instruction.parameters = params;
    taxons.fractal_tape.push_instruction(instruction); ///< Ejecuta la instrucción en la máquina
    return 1;
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::replace_taxon(int fractal_coords, TaxonClass taxon) { ///< Reemplaza el taxón por el objeto especificado
    return taxons.replace_state(taxon, fractal_coords); ///< Ejecuta la instrucción en la máquina
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
        myfile << "\"output_interfaces\" : [";
        for (i = 0; i<this->output_interfaces.size(); i++) {
            if (i != 0) myfile << ",";
            myfile << "[\n";
            for (j = 0; j<this->output_interfaces[i].size(); j++) {
                if (j != 0) myfile << ",";
                myfile << this->output_interfaces[i][j];
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
        myfile << "],\n\"taxons\" : {";
        myfile << "\n\"fractal_tape\" : [\n";
        for (i = 0; i < taxons.fractal_tape.size(); i++) {
            if (i != 0) myfile << ",";
            myfile << "{\"id\" : " + taxons.fractal_tape[i].id;
            myfile << ",\n\"parameters\" : [";
            for (j = 0; j < taxons.fractal_tape[i].parameters.size(); j++) {
                if (j != 0) myfile << ",";
                myfile << "\n" + taxons.fractal_tape[i].parameters[j];
            }
            myfile << "]\n}";
        }
        myfile << "\n],";
        myfile << "\n\"fractal_machine_state\" : [\n";
        for (i = 0; i < taxons.fractal_machine_state.size(); i++) {
            myfile << "{\n\"id\":" + taxons.fractal_machine_state[i].id +
                    ",\n\"parent_id\":" + taxons.fractal_machine_state[i].parent_id +
                    ",\n\"active_taxon\":" + taxons.fractal_machine_state[i].active_taxon +
                    ",\n\"description\":\"" + taxons.fractal_machine_state[i].description + "\",";
            myfile << "\"input_interfaces\" : [";
            for (j = 0; j<taxons.fractal_machine_state[i].input_interfaces.size(); j++) {
                if (j != 0) myfile << ",";
                myfile << "[\n";
                for (k = 0; k<taxons.fractal_machine_state[i].input_interfaces[j].size(); k++) {
                    if (k != 0) myfile << ",";
                    myfile << taxons.fractal_machine_state[i].input_interfaces[j][k];
                }
                myfile << "]\n";
            }
            myfile << "],";
            myfile << "\"output_interfaces\" : [";
            for (j = 0; j<taxons.fractal_machine_state[i].output_interfaces.size(); j++) {
                if (j != 0) myfile << ",";
                myfile << "[\n";
                for (k = 0; k<taxons.fractal_machine_state[i].output_interfaces[j].size(); k++) {
                    if (k != 0) myfile << ",";
                    myfile << taxons.fractal_machine_state[i].output_interfaces[j][k];
                }
                myfile << "]\n";
            }
            myfile << "],\n";
            myfile << "\"connections\" : [";
            for (j = 0; j<taxons.fractal_machine_state[i].connections.size(); j++) {
                if (j != 0) myfile << ",";
                myfile << "{\n";
                myfile << "\"conn_type\" : " + taxons.fractal_machine_state[i].connections[j].conn_type + ",\n";
                myfile << "\"conn_members\" : [\n";
                for (k = 0; k<taxons.fractal_machine_state[i].connections[j].conn_members.size(); k++) {
                    myfile << "{\n \"remote_id\" : " + taxons.fractal_machine_state[i].connections[j].conn_members[k].remote_id;
                    myfile << "\n \"length\" : " + taxons.fractal_machine_state[i].connections[j].conn_members[k].length;
                    myfile << "\n \"radius\" : " + taxons.fractal_machine_state[i].connections[j].conn_members[k].radius;
                    myfile << "\n \"sensitivity\" : " + taxons.fractal_machine_state[i].connections[j].conn_members[k].sensitivity;
                    myfile << "{\n \"local_interface\" : " + taxons.fractal_machine_state[i].connections[j].conn_members[k].local_interface;
                    myfile << "{\n \"remote_interface\" : " + taxons.fractal_machine_state[i].connections[j].conn_members[k].remote_interface;
                    myfile << "\n}\n";
                }
                myfile << "]";
                myfile << "}\n";
            }
            myfile << "],\n\"tags\" : [";
            for (std::set<std::string>::iterator it = taxons.fractal_machine_state[i].tags.begin(); it != taxons.fractal_machine_state[i].tags.end(); ++it) {
                if (it != taxons.fractal_machine_state[i].tags.begin()) myfile << ",";
                myfile << "\"" + *it + "\"";
            }
            myfile << "]";
        }
        myfile << "\n],";
        myfile << "\n\"taxon_register\" : [\n";
        for (i = 0; i < taxons.taxon_register.size(); i++) {
            myfile << "{\n\"id\":" + taxons.taxon_register[i].id +
                    ",\n\"parent_id\":" + taxons.taxon_register[i].parent_id +
                    ",\n\"active_taxon\":" + taxons.taxon_register[i].active_taxon +
                    ",\n\"description\":\"" + taxons.taxon_register[i].description + "\",";
            myfile << "\"input_interfaces\" : [";
            for (j = 0; j<taxons.taxon_register[i].input_interfaces.size(); j++) {
                if (j != 0) myfile << ",";
                myfile << "[\n";
                for (k = 0; k<taxons.taxon_register[i].input_interfaces[j].size(); k++) {
                    if (k != 0) myfile << ",";
                    myfile << taxons.taxon_register[i].input_interfaces[j][k];
                }
                myfile << "]\n";
            }
            myfile << "],";
            myfile << "\"output_interfaces\" : [";
            for (j = 0; j<taxons.taxon_register[i].output_interfaces.size(); j++) {
                if (j != 0) myfile << ",";
                myfile << "[\n";
                for (k = 0; k<taxons.taxon_register[i].output_interfaces[j].size(); k++) {
                    if (k != 0) myfile << ",";
                    myfile << taxons.taxon_register[i].output_interfaces[j][k];
                }
                myfile << "]\n";
            }
            myfile << "],\n";
            myfile << "\"connections\" : [";
            for (j = 0; j<taxons.taxon_register[i].connections.size(); j++) {
                if (j != 0) myfile << ",";
                myfile << "{\n";
                myfile << "\"conn_type\" : " + taxons.taxon_register[i].connections[j].conn_type + ",\n";
                myfile << "\"conn_members\" : [\n";
                for (k = 0; k<taxons.taxon_register[i].connections[j].conn_members.size(); k++) {
                    myfile << "{\n \"remote_id\" : " + taxons.taxon_register[i].connections[j].conn_members[k].remote_id;
                    myfile << "\n \"length\" : " + taxons.taxon_register[i].connections[j].conn_members[k].length;
                    myfile << "\n \"radius\" : " + taxons.taxon_register[i].connections[j].conn_members[k].radius;
                    myfile << "\n \"sensitivity\" : " + taxons.taxon_register[i].connections[j].conn_members[k].sensitivity;
                    myfile << "{\n \"local_interface\" : " + taxons.taxon_register[i].connections[j].conn_members[k].local_interface;
                    myfile << "{\n \"remote_interface\" : " + taxons.taxon_register[i].connections[j].conn_members[k].remote_interface;
                    myfile << "\n}\n";
                }
                myfile << "]";
                myfile << "}\n";
            }
            myfile << "],\n\"tags\" : [";
            for (std::set<std::string>::iterator it = taxons.taxon_register[i].tags.begin(); it != taxons.taxon_register[i].tags.end(); ++it) {
                if (it != taxons.taxon_register[i].tags.begin()) myfile << ",";
                myfile << "\"" + *it + "\"";
            }
            myfile << "]";
        }
        myfile << "\n],";
        myfile << "\"connections\" : [";
        for (i = 0; i<taxons.conn_register.size(); i++) {
            if (i != 0) myfile << ",";
            myfile << "{\n";
            myfile << "\"conn_type\" : " + taxons.conn_register[i].conn_type + ",\n";
            myfile << "\"conn_members\" : [\n";
            for (j = 0; j<taxons.conn_register[i].conn_members.size(); j++) {
                myfile << "{\n \"remote_id\" : " + taxons.conn_register[i].conn_members[j].remote_id;
                myfile << "\n \"length\" : " + taxons.conn_register[i].conn_members[j].length;
                myfile << "\n \"radius\" : " + taxons.conn_register[i].conn_members[j].radius;
                myfile << "\n \"sensitivity\" : " + taxons.conn_register[i].conn_members[j].sensitivity;
                myfile << "{\n \"local_interface\" : " + taxons.conn_register[i].conn_members[j].local_interface;
                myfile << "{\n \"remote_interface\" : " + taxons.conn_register[i].conn_members[j].remote_interface;
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
    //escribe taxons
}

template <class TaxonClass,class MessageClass> ///< para IA, taxonClass=Expert
int Taxonomy<TaxonClass,MessageClass>::import_taxonomy(std::string file_path) {
    //Abre archivo JSON
    //carga archivo en memoria
    //lee en buffer hasta próximo  símbolo
    //leer símbolo
    //procesar fin de símbolo
    //lee taxons
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

