/* 
 * File:   FractalNode.h
 * Author: harveybc
 *
 * Created on 3 de junio de 2015, 04:39 PM
 * COMPLETE
 */

#ifndef FRACTALNODE_H
#define	FRACTALNODE_H
#include "Interface.h"

class FractalNode {
public:
    std::vector <Interface<double>> interfaces; ///< node's communications interfaces
    int get_id();
    int get_source();
    int get_num_interfaces();
    int get_evaluated();
    bool get_active();
    void set_evaluated(bool eval);
    void set_active(bool act);
    int get_recursive();
    void get_node(int &node, int &source, int &recurs, 
        bool &eval, bool &act);
    void set_node(int node, int source, int recurs, int num_if,
        bool eval, bool act);
    void set_recursive(int times);    
    void add_interface(int num_if, double init_val);
    // constructors
    FractalNode(int node, int source, int recurs, int num_if, bool eval, bool act);
    FractalNode();
    FractalNode(const FractalNode& orig);
    virtual ~FractalNode();
private:
        int node_id;    ///< Identification number of the node
        int source_id;  ///< Parent node's identification number
        int recursive;  ///< Number of times this node must be evaluated
        bool evaluated; ///< TRUE if node has been evaluated
        bool active;    ///< FALSE when the node is deleted
};

#endif	/* FRACTALNODE_H */

