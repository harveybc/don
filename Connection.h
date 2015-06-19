/* 
 * File:   Connection.h
 * Author: harveybc
 *
 * Created on 3 de junio de 2015, 04:39 PM
 * COMPLETE
 */

#ifndef Connections_H
#define	Connections_H

class Connection {
public:
    void calculate_segment();
    int get_id();
    int get_source();
    int get_target();
    double get_length();
    int get_source_interface();
    void set_source_interface(int s_if);
    bool get_active();
    void get_conn(int &connid, int &source, int &target, int &s_if, 
        double &len, bool &act);
    void set_conn(int connid, int source, int target, int s_if, 
        double w, double len, double spd, bool act);
    void set_length(double len);
    void set_active(bool act);
    int get_weight();
    int get_speed();
    void set_weight(int w);
    void set_speed(int s);
    int get_segment();    
    // constructors
    Connection(int connid, int source, int target, int s_if, 
        double len, double w, double s, bool act);
    Connection(const Connection& orig);
    virtual ~Connection();
private:
    int conn_id;  ///< identification number of the connection
    int source_id;      ///< remote source node identification
    int target_id;      ///< local node identification
    int source_interface; ///< remote source node interface identification
    double weight;      ///< connection radius, regulates amplitude
    double length;      ///< connection length, regulates phase
    double speed;      ///< connection radius, regulates propagation speed
    bool active;        ///< FALSE when the node is deleted
    int segment;
    
};

#endif	/* Connections_H */

