/* 
 * File:   TravelingWave.h
 * Author: harveybc
 *
 * Models a node connection of an artificial neural network (ANN) as a 
 * longitudinal physical media of variable length with a traveling wave as 
 * codification of messages going over the connection. 
 * 
 
 *  
 * Created on 8 de junio de 2015, 05:04 AM
 */

#ifndef TRAVELINGWAVE_H
#define	TRAVELINGWAVE_H


class TravelingWave {
public:
    /*
    0: /// Wait(milliseconds)
    1: /// CreateNode(int source_id, int recursive, int interfaces, bool evaluated, bool active, double distance_from_source)
    2: /// NodeSetActive(int node_id, bool act) 
    3: /// NodeSetEvaluated(int node_id, bool evaluated)
    4: /// NodeAddInterface(int node_id, int num)
    5: /// NodeSetRecursive(int node_id, int recursive)
    6: /// CreateConnection(node_id_source, node_id_target, src_if, length,active)
    7: /// ConnectionSetLength(conn_id, length)
    8: /// ConnectionSetActive(conn_id)
     * 
     * 
     */
    // constructors
    TravelingWave();
    TravelingWave(const TravelingWave& orig);
    virtual ~TravelingWave();
private:
    
};

#endif	/* TRAVELINGWAVE_H */

