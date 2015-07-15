/* 
 * File:   Neuron.h
 * Author: harveybc
 *
 * Created on 3 de junio de 2015, 04:39 PM
 * COMPLETE
 */

#ifndef Neuron_H
#define	Neuron_H
#include "Axon.h"

class Neuron {
public:
    // membrane attributes for model from (Beer, 1990) not for voltage but charge
    float Qm  = -7e-10;     ///< membrane charge (def: -70mv*10nF)
    float Cm  = 10e-9;      ///< membrane capacintance (def: 10nF)
    float Gm  = 100e-9;     ///< membrane conductance (def: 100nS)
    float Qth = -5.5e-10;   ///< membrane charge threshold (def:-55mV*10nF Coulombs))
    float Qss = -7e-10;     ///< membrane steady state (resting) charge (def: -70mv*10nF)
    // intrinsic currents for pacemaker neurons (Beer, 1990) 
    float Q_min = -5.4e-10; ///< membrane intrinsic current charge threshold (-54mV*10nF)
    float Ih = 2e-9;        ///< intrinsic depolarizing current
    float Il = -2e-9;       ///< intrinsic hyperpolarizing current
    float Th = 100;         ///< time Ih should remain active (def:100ms)
    float Tl = 0;           ///< time Il should remain active (Tl = Mtl*(Qm/C - Ih/Gm - Ih/Gm) + Btl )
    float Mtl;              ///< slope of line used to calculate Tl
    float Btl;              ///< initial time used to calculate Tl
    // action potential timming
    int action_potential_period=1;  ///< duration of action potential
    int refractory_period=2;        ///< refractory period in milliseconds
    // synaptogenesis and neurogenesis and prunning
    float prob_synaptogenesis=0;    ///< increases with neural activity, if negative, is probability of synaptic prunnig
    float prob_neurogenesis=0;      ///< increases with local complexity if negative, is probability of neural prunnig
    // neural network flags
     bool evaluated = false; ///< TRUE if neuron has been evaluated
    // axon
    Axon<int> axon; ///< neuron's communications axon with 32 bit spike trains
    // methods
    int get_id();
    int get_source();
    bool get_active();
    void set_evaluated(bool eval);
    void set_active(bool act);
    int get_recursive();
    void get_neuron(int &neuron, int &source, int &recurs, 
        bool &eval, bool &act);
    void set_neuron(int neuron, int source, int recurs, bool eval, bool act);
    void set_recursive(int times);    
    void set_threshold(int axon_id, float th);
    float get_threshold(int axon_id);
    void set_m_potential(int axon_id, float pot);
    void add_m_potential(int axon_id, float pot);
    float get_m_potential(int axon_id);
    void set_depolarization_factor(int axon_id, float dep);
    float get_depolarization_factor(int axon_id);
    void depolarize(int axon_id);
    // constructors
    Neuron(int neuron, int source, int recurs, int num_if, bool eval, bool act);
    Neuron();
    Neuron(const Neuron& orig);
    virtual ~Neuron();
private:
    int neuron_id;    ///< Identification number of the neuron
    int source_id;  ///< Parent neuron's identification number
    int recursive;  ///< Number of times this neuron must be evaluated
    bool active;    ///< FALSE when the neuron is deleted
};

#endif	/* Neuron_H */

