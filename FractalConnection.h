/* 
 * File:   FractalConnection.h
 * Author: harveybc
 *
 * Created on 3 de junio de 2015, 04:39 PM
 * COMPLETE
 */

#ifndef FRACTALCONNECTION_H
#define	FRACTALCONNECTION_H

class FractalConnection {
public:
    int get_id();
    int get_source();
    int get_target();
    int get_length();
    bool get_active();
    void get_conn(int &connid, int &source, int &target, double &len, 
        bool &act);
    void set_conn(int connid, int source, int target, double len, bool act);
    // constructors
    FractalConnection(int connid, int source, int target, double len, bool act);
    FractalConnection(const FractalConnection& orig);
    virtual ~FractalConnection();
private:
    int conn_id;  ///< identification number of the connection
    int source_id;      ///< remote source node identification
    int target_id;      ///< remote source node identification
    double length;      ///< connection length
    bool active;        ///< FALSE when the node is deleted
};

#endif	/* FRACTALCONNECTION_H */

