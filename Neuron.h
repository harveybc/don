/* 
 * File:   Neuron.h
 * Author: harveybc
 *
 * Created on 3 de junio de 2015, 04:39 PM
 * COMPLETE
 */

#ifndef Neuron_H
#define	Neuron_H
#include <cstdint>
#include "Synapse.h"

class Neuron {
public:
    // general neuron attributes
    int parent_id;      ///< Parent neuron's identification number
    int recursive;      ///< Number of times this neuron must be evaluated
    bool active;        ///< FALSE when the neuron is deleted (def:true)
    // neural network flags
    bool evaluated;     ///< TRUE if neuron has been evaluated (def:false)
    char neuron_type;  ///< 0=normal, 1=Tonic, 2=Bistable, 3=Pacemaker, 4=Random (def:0))
    // membrane attributes for model with intrinsic currents from (Beer, 1990) not for voltage but charge (integrating model over time)
    float Qm;    ///< membrane charge (def: -70mV*10nF   = -7e-10C)
    float Cm;    ///< membrane capacintance (def: 10nF = 10e-9)
    float Gm;    ///< membrane conductance (def: 100nS =  100e-9)
    float Qleak; ///< leaking charge factor (def: Gm/Cm  = 10)
    float Qth;   ///< membrane charge threshold (def:-55mV*10nF = -5.5e-10C)
    float Qss;   ///< membrane steady state (resting) charge (def: -70mv*10nF = -7e-10C)
    // intrinsic currents for pacemaker neurons (Beer, 1990) 
    float Q_min; ///< membrane intrinsic current charge threshold (-68mV*10nF = -6.8e-10C)
    float Ih;    ///< intrinsic depolarizing current (def: 2e-9 A)
    float Il;    ///< intrinsic hyperpolarizing current (def: -2e-9 A)
    float Th;    ///< time Ih should remain active in clock ticks(def:100)
    float Tl;    ///< time Il should remain active (Tl = Mtl*(Qm/C - Ih/Gm) + Btl ) 
    float Mtl;   ///< slope of line used to calculate Tl (def:-1e5)
    float Btl;   ///< initial time used to calculate Tl in clock ticks(def: 500))
    // action potential timing
    int action_potential_period;    ///< duration of action potential polarization and depolarization(def:2)
    int remaining_action_potential; ///< remaining clock ticks of action potential
    int refractory_period;          ///< refractory period in milliseconds (def:2)
    int remaining_refractory;       ///< rremaining refractory period in milliseconds
    // epigenetics: synaptogenesis, neurogenesis and prunning
    // permanent changes in the genome caused by neurotransmitters, synaptic or neuronal activity
    // uses a two phase evaluation and a neuroevolution training phase: 
    //      1. maduration:  do synaptic pruning and release nt for controlling prob prunning y prob synaptogenesis, and prob inheritable in  the next phase
    //      2. practice:  do synaptogénesis and release nt for controlling prob prunning y neuro/synaptogenesis, and prob inheritable in neuroevolution 
    //      3. training: use  prob pruning y neuro/synaptogenesis, and prob inheritable(little mutation factor, low mutation prob) during neuroevolution's mutation and crossover 
    float prob_synaptogenesis; ///< increases with neural activity and prob_inheritable, if negative, is probability of synaptic prunnig
    float prob_neurogenesis;   ///< increases with local complexity if negative, is probability of neural prunnig
    float prob_inheritable;    ///< increases with increases with fitness changes related
                               ///< to pruning or neurogenesis. A change of fitness 
                               ///< between neurogenesis events causes all presynaptic  
                               ///< neurons to modify their prob_inheritable)
    // extracellular activity bit masks (neurotransmitters, receptors and modulators)
    // for synapses: byte   0 = axosomatic/dendritic, 1=axoaxonic, 
    //                      2=axosynaptic, 3=axosecretory/extracellular 
    uint32_t neurotransmitter_mask; 
    uint32_t nt_receptor_mask; 
    // axon
    float axon_speed;    ///< axon's propagation speed in m/s (def: 100), proportional 
                         ///< to radius wich is proportional to soma diameter wich 
                         ///< controls the optimum number of dendrites (dendritic synapses)
                         ///< for synaptic pruning(maduration), synaptogenesis(practice)
                         ///< and neuroevolution(training).
    float axon_feedback_strength; 
    std::vector <uint32_t> axon;    ///< neuron's communications axon with 32 bit spike trains
    std::vector <uint32_t> axon_feedback;    ///<  used for bidirectional axon's  propagation
    bool bidirectional; //  def: true if axosomatic synapse length < 40um 
                        //  or axo-dendrític ( bidirectional if length < 300um)
                        //  axo-axonic - postsynapticOR (bidirectional if length < 300um)
    float bidir_max_length; // length of the bidirectional part of the axon
    // synapses
    std::vector<Synapse> synapses;  ///< neuron´s synapses
    // methonds
    void push_message(int msg);     ///< pushes a message in the axon´s front and removes the oldest from the back
    // constructors
    Neuron(
        // general attributes
        int parent_id_,  ///< Parent neuron's identification number
        int recursive_,  ///< Number of times this neuron must be evaluated
        bool active_,    ///< FALSE when the neuron is deleted
        // neural network flags
        bool evaluated_, ///< TRUE if neuron has been evaluated
        char neuron_type_,  ///< 0=normal, 1=Tonic, 2=Bistable, 3=Pacemaker, 4=Random
        // membrane attributes for model with intrinsic currents from (Beer, 1990) not for voltage but charge (integrating model over time)
        float Qm_,     ///< membrane charge (def: -70mv*10nF)
        float Cm_,      ///< membrane capacintance (def: 10nF)
        float Gm_,     ///< membrane conductance (def: 100nS)
        float Qth_,   ///< membrane charge threshold (def:-55mV*10nF Coulombs))
        float Qss_,    ///< membrane steady state (resting) charge (def: -70mv*10nF)
        // intrinsic currents for pacemaker neurons (Beer, 1990) 
        float Q_min_, ///< membrane intrinsic current charge threshold (-54mV*10nF)
        float Ih_,        ///< intrinsic depolarizing current
        float Il_,       ///< intrinsic hyperpolarizing current
        float Th_,         ///< time Ih should remain active (def:100ms)
        float Mtl_,              ///< slope of line used to calculate Tl
        float Btl_,              ///< initial time used to calculate Tl
        // action potential timming
        int action_potential_period_,  ///< duration of action potential polarization and depolarization
        int remaining_action_potential_,   ///< remaining time of action potential
        int refractory_period_,        ///< refractory period in milliseconds
        int remaining_refractory_,     ///< rremaining refractory period in milliseconds
        // synaptogenesis and neurogenesis and prunning
        float prob_synaptogenesis_,    ///< increases with neural activity, if negative, is probability of synaptic prunnig
        float prob_neurogenesis_,      ///< increases with local complexity if negative, is probability of neural prunnig
        // extracellular activity bit masks (neurotransmitters, receptors and modulators)
        // for synapses: byte   0 = axosomatic/dendritic, 1=axoaxonic, 
        //                      2=axosynaptic, 3=axosecretory/extracellular 
        uint32_t neurotransmitter_mask,
        uint32_t nt_receptor_mask
    );
    // constructos
    Neuron();
    Neuron(const Neuron& orig);
    virtual ~Neuron();
private:

};

#endif	/* Neuron_H */

