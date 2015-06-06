/* 
 * File:   FractalNode.h
 * Author: harveybc
 *
 * Created on 3 de junio de 2015, 04:39 PM
 * COMPLETE
 */

#ifndef FRACTALNODE_H
#define	FRACTALNODE_H

class FractalNode {
public:
    int get_id();
    int get_source();
    int get_evaluated();
    bool get_active();
    void set_evaluated(int eval);
    void set_active(bool act);
    void get_node(int &node, int &source, int &eval, bool &act);
    void set_node(int node, int source, int eval, bool act);
    // constructors
    FractalNode(int node, int source, int eval, bool act);
    FractalNode();
    FractalNode(const FractalNode& orig);
    virtual ~FractalNode();
private:
        int node_id;         ///< Identification number of the node
        int source_id;  ///< Parent node identification number
        int evaluated;  ///< Number of times this node has been evaluated
        bool active;    ///< FALSE when the node is deleted
};

#endif	/* FRACTALNODE_H */

